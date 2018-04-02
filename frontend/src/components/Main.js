import React, { Component } from 'react'
import data from './mockdata.js'
import axios from 'axios'
import Board from './puzzle/Board'
import { buildElementsArray } from './functions/genericFunctions.js'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Ici va arriver la reponse !',
      allelements: {
        element1: [[3, 3], [3, 0]],
        element2: [[7], [7], [7]],
        element3: [[1], [1], [1], [1]],
        element4: [[5, 5], [5, 5]],
        element5: [[4, 4]],
        element6: [[0, 6], [0, 6], [6, 6]]
      },
      currentElements: {},
      sizeBoard: 5
    }
    this.getData = this.getData.bind(this)
  }

  componentWillMount = () => {}

  getSelectElements = (index, e) => {
    this.setState({
      ...this.state,
      currentElements: {
        ...this.state.currentElements,
        [index]: e.target.value
      }
    })
    console.log(this.state)
  }

  getData = () => {
    let elements = buildElementsArray(this.state)
    console.log(elements)
    let result = ''
    axios
      .post('http://localhost:8000/test/', {
        size: this.state.sizeBoard,
        elements: elements
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
        <label> Size of the board : </label>{' '}
        <input
          type="number"
          onChange={e => this.setState({ sizeBoard: e.target.value })}
        />
        {Object.keys(this.state.allelements).map((element, index) => {
          return (
            <Board
              {...this.props}
              key={index}
              index={index}
              board={this.state.allelements[element]}
              type="presentation"
              ModifState={this.getSelectElements}
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
