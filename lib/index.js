'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsCreateFragment = require('react-addons-create-fragment');

var _reactAddonsCreateFragment2 = _interopRequireDefault(_reactAddonsCreateFragment);

var _PageItem = require('./PageItem');

var _PageItem2 = _interopRequireDefault(_PageItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination(props) {
    _classCallCheck(this, Pagination);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Pagination).call(this, props));

    _this.state = {
      selected: props.initialSelected || 0
    };
    return _this;
  }

  _createClass(Pagination, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var wrapCls = 'pagination-wrap',
          prevCls = props.prevClassName,
          nextCls = props.nextClassName,
          inputDom = void 0,
          totalDom = void 0;

      if (props.wrapClassName) {
        wrapCls += ' ' + props.wrapClassName;
      }
      if (this.state.selected === 0) {
        prevCls += ' ' + props.disabledClassName;
      }
      if (this.state.selected === props.pageNum - 1) {
        nextCls += ' ' + props.disabledClassName;
      }

      if (!props.diableInputPaginate) {
        inputDom = _react2.default.createElement(
          'li',
          { className: 'page-input-wrap' },
          _react2.default.createElement('input', { ref: 'pageInput', className: 'page-input', value: this.state.selected + 1, onChange: this._onChange }),
          _react2.default.createElement(
            'span',
            { className: 'input-label' },
            props.inputLabel || ''
          ),
          _react2.default.createElement(
            'button',
            { className: 'page-input-btn', onTouchTap: this._onInputOk },
            props.inputOkBtnLabel
          )
        );
      }

      if (props.totalTpl) {
        totalDom = props.totalTpl(props.pageNum);
      }

      return _react2.default.createElement(
        'ul',
        { className: wrapCls },
        _react2.default.createElement(
          'li',
          { onTouchTap: this._handlePrev, className: prevCls },
          _react2.default.createElement(
            'span',
            { className: 'page-link-btn', href: '' },
            props.prevLabel
          )
        ),
        (0, _reactAddonsCreateFragment2.default)(this._getChildren()),
        _react2.default.createElement(
          'li',
          { onTouchTap: this._handleNext, className: nextCls },
          _react2.default.createElement(
            'span',
            { className: 'page-link-btn', href: '' },
            this.props.nextLabel
          )
        ),
        totalDom,
        inputDom
      );
    }
  }, {
    key: '_getChildren',
    value: function _getChildren() {
      var props = this.props;
      var items = {};

      if (props.pageNum <= props.middleDisplayRange) {
        for (var _i = 0; _i < props.pageNum; _i++) {
          items['key' + _i] = _react2.default.createElement(_PageItem2.default, {
            selected: this.state.selected === _i,
            pageClassName: props.pageClassName,
            selectedClassName: props.selectedClassName,
            onSelected: this._selectPage.bind(this, _i),
            page: _i + 1 });
        }
      } else {
        var leftSide = props.middleDisplayRange / 2,
            rightSide = props.middleDisplayRange - leftSide,
            pageItem = void 0,
            curPage = void 0,
            breakItem = void 0;

        if (this.state.selected > props.pageNum - props.middleDisplayRange / 2) {
          rightSide = props.pageNum - this.state.selected;
          leftSide = props.middleDisplayRange - rightSide;
        } else if (this.state.selected < props.middleDisplayRange / 2) {
          leftSide = this.state.selected;
          rightSide = props.middleDisplayRange - leftSide;
        }

        for (var i = 0; i < props.pageNum; i++) {
          curPage = i + 1;
          pageItem = _react2.default.createElement(_PageItem2.default, {
            selected: this.state.selected === i,
            pageClassName: props.pageClassName,
            selectedClassName: props.selectedClassName,
            onSelected: this._selectPage.bind(this, i),
            page: curPage });

          if (curPage <= props.sideDislpayRange || curPage > props.pageNum - props.sideDislpayRange) {
            items['key' + i] = pageItem;
            continue;
          }
          if (i >= this.state.selected - leftSide && i <= this.state.selected + rightSide) {
            items['key' + i] = pageItem;
            continue;
          }

          //break
          var keys = Object.keys(items),
              lastBreakItem = items[keys[keys.length - 1]];
          if (lastBreakItem !== breakItem) {
            breakItem = _react2.default.createElement(
              'li',
              { className: 'break' },
              props.breakLabel
            );
            items['key' + i] = breakItem;
          }
        }
      }
      return items;
    }
  }, {
    key: '_handlePrev',
    value: function _handlePrev(e) {
      e.preventDefault();
      if (this.state.selected > 0) {
        this._selectPage(this.state.selected - 1);
      }
    }
  }, {
    key: '_handleNext',
    value: function _handleNext(e) {
      e.preventDefault();
      if (this.state.selected < this.props.pageNum - 1) {
        this._selectPage(this.state.selected + 1);
      }
    }
  }, {
    key: '_selectPage',
    value: function _selectPage(selected, e) {
      e && e.preventDefault();
      var props = this.props;
      this.setState({
        selected: selected
      });
      props.onPageSelected && props.onPageSelected(selected);
    }
  }, {
    key: '_onChange',
    value: function _onChange(e) {}
  }, {
    key: '_onInputOk',
    value: function _onInputOk(e) {
      e.preventDefault();
      var input = _reactDom2.default.findDOMNode(this.refs.pageInput),
          value = input.value - 1;
      if (value != this.state.selected) {
        this._selectPage(value);
      }
    }
  }]);

  return Pagination;
}(_react.Component);

exports.default = Pagination;


Pagination.propTypes = {
  pageNum: _react.PropTypes.number.isRequired, //total number pages
  middleDisplayRange: _react.PropTypes.number.isRequired, // the number of displayed ranged in the middle
  sideDislpayRange: _react.PropTypes.number.isRequired,
  prevLabel: _react.PropTypes.string,
  nextLabel: _react.PropTypes.string,
  breakLabel: _react.PropTypes.string,
  onPageSelected: _react.PropTypes.func,
  initialSelected: _react.PropTypes.number,
  pageClassName: _react.PropTypes.string,
  selectedClassName: _react.PropTypes.string,
  prevClassName: _react.PropTypes.string,
  nextClassName: _react.PropTypes.string,
  disabledClassName: _react.PropTypes.string,
  wrapClassName: _react.PropTypes.string,
  diableInputPaginate: _react.PropTypes.bool,
  inputOkBtnLabel: _react.PropTypes.string,
  totalTpl: _react.PropTypes.func
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