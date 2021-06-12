import React from 'react';
import AppContainer from "./App";
import ReactDOM from 'react-dom';
import {act} from "react-dom/test-utils";


test('render without crashing', () => {
  const div = document.createElement('div')
  act(() => {
    ReactDOM.render(<AppContainer />, div);
  });
  ReactDOM.unmountComponentAtNode(div)
});
