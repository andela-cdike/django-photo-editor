import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

import Wrapper from './containers/Wrapper'
import store from './store';


class App1 extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Wrapper />
      </Provider>
    )
  }
}

render(<App1/>, document.getElementById('App1'))