import React from 'react';
import './SortingVisualiser.css';
import {getMergeSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import {getBubbleSort} from '../SortingAlgorithms/SortingAlgorithms.js';
import { getQuickSort } from '../SortingAlgorithms/SortingAlgorithms.js';
import { getHeapSort } from '../SortingAlgorithms/SortingAlgorithms.js';
import { getInsertionSort} from '../SortingAlgorithms/SortingAlgorithms.js';
import { getSelectionSort } from '../SortingAlgorithms/SortingAlgorithms.js';

//ensure no more than 1 sort occur at the same time 
// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 5;
const BAR_HEIGHT_MODIFIER = 0.5;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'white';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualiser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            NUMBER_OF_ARRAY_BARS: 100,
            array:[], //main array
        };
    }
    componentDidMount(){ //when app loads
        this.resetArray(); //calls reset array method
    }
    //When generate new array
    resetArray(){
        const array = [];
        for (let i = 0; i < this.state.NUMBER_OF_ARRAY_BARS; i++)
        {
            //pushes random value into the array

            array.push(randomIntFromInterval(5, 1000));
        }
        //sets state to array
        this.setState({array});
    
      }

    insertionSort(){
      let animations = getInsertionSort(this.state.array);
      for(let i = 0; i < animations.length; i ++){
        const isColorChange = (i % 4 ===0) || (i % 4 === 1);
        const arrayBars = document.getElementsByClassName('array-bar');
        if(isColorChange === true){
          const color = (i % 4 === 0) ? SECONDARY_COLOR: PRIMARY_COLOR;
          const [BarOneIDx, BarTwoIDx] = animations[i];
          const BarOneStyle = arrayBars[BarOneIDx].style;
          const BarTwoStyle = arrayBars[BarTwoIDx].style;
          setTimeout(() =>{
            BarOneStyle.backgroundColor = color; 
            BarTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        }else{
          const[barIdx, newHeight] = animations[i];
          if(barIdx === -1 )
          {
            continue;
          }
          const barStyle = arrayBars[barIdx].style;
          setTimeout(() => {
            barStyle.height = `${newHeight * BAR_HEIGHT_MODIFIER }px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
      }

      selectionSort(){
        let animations = getSelectionSort(this.state.array);
        for(let i = 0; i < animations.length; i ++){
          const isColorChange = (i % 4 ===0) || (i % 4 === 1);
          const arrayBars = document.getElementsByClassName('array-bar');
          if(isColorChange === true){
            const color = (i % 4 === 0) ? SECONDARY_COLOR: PRIMARY_COLOR;
            const [BarOneIDx, BarTwoIDx] = animations[i];
            const BarOneStyle = arrayBars[BarOneIDx].style;
            const BarTwoStyle = arrayBars[BarTwoIDx].style;
            setTimeout(() =>{
              BarOneStyle.backgroundColor = color; 
              BarTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          }else{
            const[barIdx, newHeight] = animations[i];
            if(barIdx === -1 )
            {
              continue;
            }
            const barStyle = arrayBars[barIdx].style;
            setTimeout(() => {
              barStyle.height = `${newHeight * BAR_HEIGHT_MODIFIER }px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }
    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
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
              barOneStyle.height = `${newHeight * BAR_HEIGHT_MODIFIER }px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }
    bubbleSort(){
        let [animations, randomValue] = getBubbleSort(this.state.array);
        for(let i = 0; i < animations.length; i ++){
          const isColorChange = (i % 4 ===0) || (i % 4 === 1);
          const arrayBars = document.getElementsByClassName('array-bar');
          if(isColorChange === true){
            const color = (i % 4 === 0) ? SECONDARY_COLOR: PRIMARY_COLOR;
            const [BarOneIDx, BarTwoIDx] = animations[i];
            const BarOneStyle = arrayBars[BarOneIDx].style;
            const BarTwoStyle = arrayBars[BarTwoIDx].style;
            setTimeout(() =>{
              BarOneStyle.backgroundColor = color; 
              BarTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          }else{
            const[barIdx, newHeight] = animations[i];
            if(barIdx === -1 )
            {
              continue;
            }
            const barStyle = arrayBars[barIdx].style;
            setTimeout(() => {
              barStyle.height = `${newHeight * BAR_HEIGHT_MODIFIER }px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }
    quickSort() {
  const animations = getQuickSort(this.state.array);
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName("array-bar");
    // arrayBars[pivotIndex].style.backgroundColor = FINAL_COLOR;
    if (animations[i] !== -2) {
      const [barOne, barTwo] = animations[i];
      const barOneStyle = arrayBars[barOne].style;
      const barTwoStyle = arrayBars[barTwo].style;
      const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * ANIMATION_SPEED_MS);
      //below setTimeOut is to persist the initial color of the bars while moving(to change color of comparing values and resetting them back) (last bar will remain PRIMARY_COLOR )
      setTimeout(() => {
        barOneStyle.backgroundColor = PRIMARY_COLOR;
        barTwoStyle.backgroundColor = PRIMARY_COLOR;
      }, i * ANIMATION_SPEED_MS);
    } else {
      const [barOne, barTwo, barOneHeight, barTwoHeight] = animations[i + 1];
      if (barTwoHeight !== 0) {

        const barOneStyle = arrayBars[barOne].style;
        const barTwoStyle = arrayBars[barTwo].style;
        setTimeout(() => {
          barOneStyle.height = `${barTwoHeight * BAR_HEIGHT_MODIFIER }px`;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.height = `${barOneHeight * BAR_HEIGHT_MODIFIER }px`;

          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      } 
    }
  }
      }
    heapSort(){
      const animations = getHeapSort(this.state.array);
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const colorChange = i % 4 <= 1;
        if (colorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight * BAR_HEIGHT_MODIFIER }px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }

      }

    generateNewArray()
    {
      this.resetArray();
      const arrayBars = document.getElementsByClassName('array-bar');
      for(let i = 0; i < this.state.array.length; i ++)
      {
        arrayBars[i].style.backgroundColor = 'white';
      }
    }

    preformSort(sortNumber)
    {
      const stopWatch = document.getElementById('Stopwatch-wrap')
      // seconds = 10;
      // var startTime = new Date().getTime();
      switch(sortNumber){
        case 1:
          this.mergeSort();
          break;
        case 2:
          this.quickSort();
          break;
        case 3: 
          this.heapSort();
          break;
        case 4: 
          this.bubbleSort();
          break;
        case 5: 
          this.insertionSort();
          break;
        case 6: 
        this.selectionSort();
        break;

      }


    }




    //HERE WE CHANGE SCREEN ELEMENTS
    render(){
      const {array} = this.state;
      return(
          <div className = "main-wrap">
        <div className = "content-container">
        <div className="array-container">
        {
            //mapping the array to bars to be rendered on the screen
              array.map((value, idx) => (
                  <div 
                    className="array-bar" 
                    key={idx}
                    style={{height: `${value * BAR_HEIGHT_MODIFIER }px`}}>
                        
                    </div>
                ))
            }
            </div>

            <div className = "button-wrap">
              
            <div class="button-spacing"><button class = "inner"onClick = {() => this.generateNewArray()}>Generate new array</button></div>
            <div class="button-spacing"><button class = "inner"onClick = {() => this.preformSort(1)}>Merge Sort</button></div>
            <div class="button-spacing"><button class = "inner" onClick = {() => this.quickSort()}>Quick Sort</button></div>
            <div class="button-spacing"><button class = "inner" onClick = {() => this.preformSort(3)}>Heap Sort</button></div>
            <div class="button-spacing"><button class = "inner" onClick = {() => this.preformSort(4)}>Bubble Sort</button></div>
            <div class="button-spacing"><button class = "inner" onClick = {() => this.preformSort(5)}>Insertion Sort</button></div>
            <div class="button-spacing"><button class = "inner" onClick = {() => this.preformSort(6)}>Selection Sort</button></div>
            </div>

            </div>
            </div>
        )
    }

}


    function randomIntFromInterval(min, max){
        return Math.floor((Math.random() * (max - min) + min));
    }

  