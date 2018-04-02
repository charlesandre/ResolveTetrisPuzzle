import React, { Component } from 'react'

class Main extends Component {
  commponentWillMount = () => {
    console.log('hello')
  }

  render() {
    return (
      <div>
        <p>{this.props.value}</p>
      </div>
    )
  }
}

export default Main
