import React from "react"
import { render } from "react-dom"

import Home from "./containers/Home"

class App1 extends React.Component {
  render() {
    return (
      <Home />
    )
  }
}

render(<App1/>, document.getElementById('App1'))