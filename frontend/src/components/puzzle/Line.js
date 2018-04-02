import React, { Component } from 'react'
import Case from './Case'

class Line extends Component {
  commponentWillMount = () => {}

  render() {
    return (
      <div className="Line">
        {this.props.line.map((element, index) => {
          return <Case value={element} key={index} />
        })}
      </div>
    )
  }
}

export default Line
