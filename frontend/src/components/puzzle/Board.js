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
        <div className="Board2">
          {this.props.board.constructor == Array
            ? this.props.board.map((element, index) => {
                return <Line {...this.props} line={element} key={index} />
              })
            : ''}
        </div>
        {this.props.type === 'presentation' ? (
          <div>
            <label>Nb of iterations : </label>
            <input
              onChange={e => this.props.ModifState(this.props.index, e)}
              type="number"
            />
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default Board
