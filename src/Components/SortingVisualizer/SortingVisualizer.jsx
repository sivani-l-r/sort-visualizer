import React, { Component } from 'react'
import './SortingVisualizer.css';
import { getMergeSortAnimation } from '../sortingAlgorithms';

const ARRAY_LEN = 200;
const ANIMATION_SPEED_MS = 1;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

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
    for(let i=0;i<ARRAY_LEN;i++)
    {
        array.push(generateRandomInt(5,700));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimation(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  
  render() {

    const {array} = this.state;
    return (
        <>
            <button onClick={() => this.mergeSort()}>Merge Sort</button>
            <div className='array-container'>
            {array.map((value,idx) => (
                <div
                className="array-bar"
                key={idx}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${value}px`,
                }}></div>
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
