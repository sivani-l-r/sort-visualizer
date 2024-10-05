import React, { Component } from 'react'
import './SortingVisualizer.css';

const ARRAY_LEN = 200;

export default class SortingVisualizer extends Component {

  constructor(props)
  {
    super(props);
    this.state = 
    {
        array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray()
  {
    const array = [];
    for(let i=0;i<=ARRAY_LEN;i++)
    {
        array.push(generateRandomInt(5,700));
    }
    this.setState({array});
  }

  
  render() {

    const {array} = this.state;
    return (
        <>
            
            <div className='array-container'>
            {array.map((value,idx) => (
                <div 
                key={idx} 
                className='array-bar'
                style={{height: `${value}px`,}}>
                </div>
            ))}
            </div>
            <button onClick={() => this.resetArray()}>Generate New Array</button>
      </>
      
    );
  }

}


function generateRandomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
