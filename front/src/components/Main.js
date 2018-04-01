import React, { Component } from 'react';
import data from './mockdata.js'
import axios from 'axios'

class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      message:'Je suis un message'
    };
  }

  commponentWillMount = () => {
      console.log("hello")
  }

  getData = () =>{

    console.log(data.data.board)

    axios.post('http://localhost:8000/test/', {
      board:data.data.board,
      elements:data.data.elements
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    this.getData()
    return (
      <div>
        <p>Establishing contact with our Django Api</p>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default Main;
