import React from 'react';
import { connect } from 'react-redux';

import { objectifyCookie } from '../actions/cookieActions';

import Home from './Home';


@connect(store => ({
  cookie: store.cookie.cookie,
}))


export default class Wrapper extends React.Component {
  componentWillMount() {
    this.props.dispatch(objectifyCookie());
  }

  render() {
    return (
      <Home />
    );
  }
}

Wrapper.propTypes = {
  dispatch: React.PropTypes.func,
};
