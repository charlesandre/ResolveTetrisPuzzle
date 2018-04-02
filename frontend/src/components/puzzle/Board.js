import React, { Component } from 'react'
import Line from './Line'
import './Puzzle.css'

class Board extends Component {
  constructor(props) {
    super(props)
  }

  commponentWillMount = () => {}

  render() {
    return (
      <div className="Board">
        {this.props.board.constructor == Array
          ? this.props.board.map((element, index) => {
              return <Line {...this.props} line={element} key={index} />
            })
          : ''}
        {this.props.type === 'presentation' ? (
          <input
            onChange={e => this.props.ModifState(this.props.index, e)}
            type="number"
          />
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default Board
