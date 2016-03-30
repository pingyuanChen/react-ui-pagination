import React from 'react';

export default class PageItem extends React.Component {
  render() {
    const props = this.props;
    let pageCls = props.pageClassName;

    if (props.selected) {
      pageCls += ' ' + props.selectedClassName;
    }

    return (
      <li className={pageCls} onTouchTap={props.onSelected} >
        <a className="page-link-btn" href="">
          {props.page}
        </a>
      </li>
    );
  }
};
