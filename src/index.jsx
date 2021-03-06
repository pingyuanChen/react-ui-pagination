import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import createFragment from 'react-addons-create-fragment';

import PageItem from './PageItem';

export default class Pagination extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: props.initialSelected || 0,
      inputValue: props.initialSelected || 1
    };
  }

  render(){
    const props = this.props;
    let wrapCls = 'pagination-wrap',
      prevCls = props.prevClassName,
      nextCls = props.nextClassName,
      inputDom, totalDom;

    if(props.wrapClassName){
      wrapCls += ' '+props.wrapClassName;
    }
    if(this.state.selected === 0){
      prevCls += ' '+props.disabledClassName;
    }
    if(this.state.selected === props.pageNum -1){
      nextCls += ' '+props.disabledClassName;
    }

    if(!props.diableInputPaginate){
      inputDom = (
        <li className="page-input-wrap">
          <input 
            className="page-input" 
            value={this.state.inputValue} 
            onChange={this._onChange.bind(this)} 
            onBlur={this._onBlur.bind(this)}/>
          <span className="input-label">{props.inputLabel || ''}</span>
          <button className="page-input-btn" onTouchTap={this._onInputOk.bind(this)}>{props.inputOkBtnLabel}</button>
        </li>
      );
    }

    if(props.totalTpl){
      totalDom = props.totalTpl(props.pageNum);
    }


    return (
      <ul className={wrapCls} >
        <li onTouchTap={this._handlePrev.bind(this)} className={prevCls}>
          <span className="page-link-btn" href="">{props.prevLabel}</span>
        </li>

        {createFragment(this._getChildren())}

        <li onTouchTap={this._handleNext.bind(this)} className={nextCls}>
          <span className="page-link-btn" href="" >{this.props.nextLabel}</span>
        </li>

        {totalDom}

        {inputDom}
      </ul>
    );
  }

  _getChildren(){
    const props = this.props;
    let items = {};

    if(props.pageNum <= props.middleDisplayRange){
      for(let i=0; i< props.pageNum; i++){
        items['key'+i] = <PageItem
                          selected={this.state.selected === i}
                          pageClassName={props.pageClassName}
                          selectedClassName={props.selectedClassName}
                          onSelected={this._selectPage.bind(this, i)}
                          page={i+1} />;
      }
    }else{
      let leftSide = props.middleDisplayRange / 2,
        rightSide = props.middleDisplayRange - leftSide,
        pageItem, curPage, breakItem;

      if(this.state.selected > props.pageNum - props.middleDisplayRange / 2){
        rightSide = props.pageNum - this.state.selected;
        leftSide = props.middleDisplayRange - rightSide;
      } else if(this.state.selected < props.middleDisplayRange / 2){
        leftSide = this.state.selected;
        rightSide = props.middleDisplayRange - leftSide;
      }

      for(var i=0; i<props.pageNum; i++){
        curPage = i + 1;
        pageItem = <PageItem
                    selected={this.state.selected === i}
                    pageClassName={props.pageClassName}
                    selectedClassName={props.selectedClassName}
                    onSelected={this._selectPage.bind(this, i)}
                    page={curPage} />;

        if(curPage <= props.sideDislpayRange || 
          curPage > props.pageNum - props.sideDislpayRange){
          items['key'+i] = pageItem;
          continue;
        }
        if(i >= this.state.selected - leftSide && i<= this.state.selected + rightSide){
          items['key'+i] = pageItem;
          continue;
        }

        //break
        let keys = Object.keys(items),
          lastBreakItem = items[keys[keys.length-1]];
        if(lastBreakItem !== breakItem){
          breakItem = (
            <li className="break">
              {props.breakLabel}
            </li>
          );
          items['key'+i] = breakItem;
        }
      }
    }
    return items;
  }

  _handlePrev(e){
    e.preventDefault();
    if(this.state.selected > 0){
      this._selectPage(this.state.selected - 1);
    }
  }

  _handleNext(e){
    e.preventDefault();
    if(this.state.selected < this.props.pageNum -1 ){
      this._selectPage(this.state.selected + 1);
    }
  }

  _selectPage(selected, e){
    e && e.preventDefault();
    const props = this.props;
    this.setState({
      selected: selected,
      inputValue: selected + 1
    });
    props.onPageSelected && props.onPageSelected(selected+1);
  }

  _onChange(e){
    let value = e.target.value;
    this.setState({
      inputValue: value
    });
  }

  _onBlur(e){
    let value = e.target.value || 0;
    value = parseInt(value);
    if(value < 1){
      value = 1;
    }else if(value > this.props.pageNum){
      value = this.props.pageNum;
    }
    this.setState({
      inputValue: value
    });
  }

  _onInputOk(e){
    e.preventDefault();
    const value = parseInt(this.state.inputValue) - 1;
    if(value != this.state.selected){
      this._selectPage(value);
    }

  }
}

Pagination.propTypes = {
  pageNum: PropTypes.number.isRequired, //total number pages
  middleDisplayRange: PropTypes.number.isRequired, // the number of displayed ranged in the middle
  sideDislpayRange: PropTypes.number.isRequired,
  prevLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  breakLabel: PropTypes.string,
  onPageSelected: PropTypes.func,
  initialSelected: PropTypes.number,
  pageClassName: PropTypes.string,
  selectedClassName: PropTypes.string,
  prevClassName: PropTypes.string,
  nextClassName: PropTypes.string,
  disabledClassName: PropTypes.string,
  wrapClassName: PropTypes.string,
  diableInputPaginate: PropTypes.bool,
  inputOkBtnLabel: PropTypes.string,
  totalTpl: PropTypes.func
};

Pagination.defaultProps = {
  prevLabel: 'Previous',
  nextLabel: 'Next',
  breakLabel: '...',
  inputLabel: 'Page',
  initialSelected: 0,
  pageClassName: 'page',
  selectedClassName: 'selected',
  prevClassName: 'prev',
  nextClassName: 'next',
  disabledClassName: 'disabled',
  diableInputPaginate: false,
  inputOkBtnLabel: 'GO'
};

