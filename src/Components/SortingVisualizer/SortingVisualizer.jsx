import React, { Component } from 'react'
import './SortingVisualizer.css';
import { getMergeSortAnimation, getBubbleSortAnimation, getQuickSortAnimation } from '../sortingAlgorithms';

const ARRAY_LEN = 300;
const ANIMATION_SPEED_MS = 1;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

const COMPARISON_COLOR = 'red';
const COMPARED_COLOR = 'green';
const FINAL_COLOR = 'blue';

export default class SortingVisualizer extends Component {

  constructor(props)
  {
    super(props);
    this.state = 
    {
        array: [],
        isSorting: false,
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
        array.push(generateRandomInt(5,600));
    }
    this.setState({array});
  }
  mergeSort() {
    this.setState({ isSorting: true });

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

    setTimeout(() => {
      this.setState({ isSorting: false });
    }, animations.length * ANIMATION_SPEED_MS);
}

bubbleSort() {
    this.setState({ isSorting: true });

    const animations = getBubbleSortAnimation(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdxOrHeight, action] = animations[i];
      if (action === "compare" || action === "revert") {
        const color = action === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
        if (arrayBars[barOneIdx] && arrayBars[barTwoIdxOrHeight]) {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdxOrHeight].style;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        }
      } else if (action === "swap") {
        setTimeout(() => {
          if (arrayBars[barOneIdx]) {
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${barTwoIdxOrHeight}px`;
          }
        }, i * ANIMATION_SPEED_MS);
      }
    }


    setTimeout(() => {
      this.setState({ isSorting: false });
    }, animations.length * ANIMATION_SPEED_MS);
}

quickSort() {
    this.setState({ isSorting: true });

    const animations = getQuickSortAnimation(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
        const [barOneIdx, barTwoIdxOrHeight, action] = animations[i];

        if (action === "compare" || action === "revert") {
            const color = action === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
            if (arrayBars[barOneIdx] && arrayBars[barTwoIdxOrHeight]) {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdxOrHeight].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
        } else if (action === "swap") {
            setTimeout(() => {
                if (arrayBars[barOneIdx] && arrayBars[barTwoIdxOrHeight]) {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdxOrHeight].style;


                    const tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;
                }
            }, i * ANIMATION_SPEED_MS);
        }
    }


    setTimeout(() => {
        for (let j = 0; j < arrayBars.length; j++) {
            arrayBars[j].style.backgroundColor = PRIMARY_COLOR; 
            arrayBars[j].style.height = `${this.state.array[j]}px`; 
        }
        this.setState({ isSorting: false });
    }, animations.length * ANIMATION_SPEED_MS);
}

  
  render() {

    const { array, isSorting } = this.state;
    return (
        <>
          <div className='sort-buttons-section'>
            <button className='sort-button' onClick={() => this.mergeSort()} disabled={isSorting}>Merge Sort</button>
            <button className='sort-button' onClick={() => this.bubbleSort()} disabled={isSorting}>Bubble Sort</button>
            <button className='sort-button' onClick={() => this.quickSort()} disabled={isSorting}>Quick Sort</button>
          </div>
            
            
            <div className='array-container'>
            {array.map((value,idx) => (
                <div
                className="array-bar"
                key={idx}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${value}px`,
                }}>

                </div>
            ))}
            </div>
            <button className ='generate-button' onClick={() => this.resetArray()} disabled={isSorting}>Generate New Array</button>
            <br></br>
            <text>developed by <a href='https://sivani-l-r.github.io/portfolio/'>sivani</a> ☼ </text>
      </>
      
    );
  }

}


function generateRandomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function testSortingAlogrithms()
{
  const sortedArray = getBubbleSortAnimation(this.state.array);
    const jsArray = this.state.array.slice().sort(
      (a,b) => a-b
    );
    for(let i=0;i<this.state.array.length;i++)
    {
      if(sortedArray[i] !== jsArray[i])
      {
        console.log('false');
        console.log(jsArray);
        console.log(sortedArray);
        return;
      }
    }
    console.log('true');
}