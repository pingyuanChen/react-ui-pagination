import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from 'react-ui-pagination';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
  <Pagination
    pageNum={20}
    middleDisplayRange={5}
    sideDislpayRange={2} />,
  document.getElementById('react-ui-pagination')
);