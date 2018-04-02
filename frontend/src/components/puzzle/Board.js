import React, { Component } from 'react'
import Line from './Line'
import './Puzzle.css'

class Board extends Component {
  constructor(props) {
    super(props)
  }

  commponentWillMount = () => {}

  render() {
    console.log(this.props.board.constructor)

    return (
      <div className="Board">
        {this.props.board.constructor == Array
          ? this.props.board.map((element, index) => {
              return <Line {...this.props} line={element} key={index} />
            })
          : ''}
      </div>
    )
  }
}

export default Board
