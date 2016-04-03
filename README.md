# react-ui-pagination
A ReactJS pagination component

## Install
To install the latest release:
```shell
npm install react-ui-pagination
```
After npm install, you'll find all the source code in the src/ folder and their compiled results in the /lib folder. This module does not include any styles to avoid producing repeated styles, but you can take /examples folder as a reference.

## Usage
```
import Pagination from 'react-ui-pagination';
...
...
<Pagination 
  pageNum={pageNum}
  middleDisplayRange={5}
  sideDislpayRange={2}
  prevLabel="< 上一页"
  nextLabel="下一页 >"
  inputOkBtnLabel="确定"
  inputLabel="页"
  onPageSelected={this._onPageSelected.bind(this)}
  totalTpl={this._totalTpl} />
```

## Examples
```shell
cd examples
npm install
npm start
```
(*^__^*) visite http://localhost:9009/

![Demo](https://github.com/pingyuanChen/react-ui-components/blob/master/demo.png)

## FAQ

