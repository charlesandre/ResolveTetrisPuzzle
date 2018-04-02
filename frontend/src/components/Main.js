import React, { Component } from 'react'
import data from './mockdata.js'
import axios from 'axios'
import Board from './puzzle/Board'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Ici va arriver la reponse !',
      allelements: {
        element1: [[3, 3], [3, 0]],
        element3: [[2, 2, 2]],
        element4: [[7], [7], [7]],
        element5: [[1], [1], [1], [1]],
        element6: [[5, 5], [5, 5]]
      },
      currentElements: {},
      sizeBoard: 5
    }
    this.getData = this.getData.bind(this)
  }

  componentWillMount = () => {}

  buildElementArray = (index, e) => {
    this.setState({
      ...this.state,
      currentElements: { ...this.state.currentElements, index: e.target.value }
    })
    console.log(this.state)
  }

  getData = () => {
    let result = ''
    axios
      .post('http://localhost:8000/test/', {
        board: data.data.board,
        elements: data.data.elements
      })
      .then(response => {
        if (response.data.success === true) {
          this.setState({ message: response.data.message })
        } else console.log('Not possible ')
      })
      .catch(error => {
        console.log('Error : ' + error)
      })
  }

  render() {
    return (
      <div>
        <p> Create a puzzle : </p>
        {Object.keys(this.state.allelements).map((element, index) => {
          return (
            <Board
              {...this.props}
              key={index}
              index={index}
              board={this.state.allelements[element]}
              type="presentation"
              ModifState={this.buildElementArray}
            />
          )
        })}
        <button onClick={this.getData}> Verify my puzzle </button>
        <Board {...this.props} board={this.state.message} type="result" />
      </div>
    )
  }
}

export default Main
