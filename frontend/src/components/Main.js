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
        element1: [[1, 1, 0], [0, 1, 1]],
        element2: [[2, 2, 2], [0, 2, 0]],
        element3: [[3], [3], [3], [3]],
        element4: [[4, 4], [4, 4]],
        element5: [[5, 0], [5, 5], [0, 5]],
        element6: [[0, 6], [0, 6], [6, 6]],
        element7: [[7, 0], [7, 7], [7, 0]],
        element8: [[8, 0, 0], [8, 8, 8]],
        element9: [[9, 9], [0, 9], [0, 9]]
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
    console.log('element send :')
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
        } else console.log('Not possible')
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
