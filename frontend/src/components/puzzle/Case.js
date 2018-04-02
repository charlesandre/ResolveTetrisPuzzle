import React, { Component } from 'react'

class Main extends Component {
  commponentWillMount = () => {
    console.log('hello')
  }

  render() {
    const idColor = 'Color' + this.props.value
    return <div className="Case" id={idColor} />
  }
}

export default Main
