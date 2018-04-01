import React, { Component } from 'react';


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
    console.log("Hey lets talk to django")
    fetch('http://localhost:8000/test/', {
      'Access-Control-Allow-Origin': "*"
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
    })
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
