var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import './SortingVisualiser.css';
import { getMergeSortAnimations } from '../SortingAlgorithms/SortingAlgorithms.js';
import { getBubbleSort } from '../SortingAlgorithms/SortingAlgorithms.js';

//ensure no more than 1 sort occur at the same time 
// Change this value for the speed of the animations.
var ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
var NUMBER_OF_ARRAY_BARS = 500;

// This is the main color of the array bars.
var PRIMARY_COLOR = 'pink';

// This is the color of array bars that are being compared throughout the animations.
var SECONDARY_COLOR = 'white';

var SortingVisualiser = function (_React$Component) {
  _inherits(SortingVisualiser, _React$Component);

  function SortingVisualiser(props) {
    _classCallCheck(this, SortingVisualiser);

    var _this = _possibleConstructorReturn(this, (SortingVisualiser.__proto__ || Object.getPrototypeOf(SortingVisualiser)).call(this, props));

    _this.state = {
      array: [] //main array
    };
    return _this;
  }

  _createClass(SortingVisualiser, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      //when app loads
      this.resetArray(); //calls reset array method
    }
    //When generate new array

  }, {
    key: 'resetArray',
    value: function resetArray() {
      var array = [];
      for (var i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
        //pushes random value into the array

        array.push(randomIntFromInterval(5, 1000));
      }
      //sets state to array
      this.setState({ array: array });
    }
  }, {
    key: 'mergeSort',
    value: function mergeSort() {
      var animations = getMergeSortAnimations(this.state.array);

      var _loop = function _loop(i) {
        var arrayBars = document.getElementsByClassName('array-bar');
        var isColorChange = i % 3 !== 2;
        if (isColorChange) {
          var _animations$i = _slicedToArray(animations[i], 2),
              barOneIdx = _animations$i[0],
              barTwoIdx = _animations$i[1];

          var barOneStyle = arrayBars[barOneIdx].style;
          var barTwoStyle = arrayBars[barTwoIdx].style;
          var color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(function () {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(function () {
            var _animations$i2 = _slicedToArray(animations[i], 2),
                barOneIdx = _animations$i2[0],
                newHeight = _animations$i2[1];

            var barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = newHeight * 0.8 + 'px';
          }, i * ANIMATION_SPEED_MS);
        }
      };

      for (var i = 0; i < animations.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: 'bubbleSort',
    value: function bubbleSort() {
      var _getBubbleSort = getBubbleSort(this.state.array),
          _getBubbleSort2 = _slicedToArray(_getBubbleSort, 2),
          animations = _getBubbleSort2[0],
          randomValue = _getBubbleSort2[1];

      for (var i = 0; i < animations.length; i++) {
        var isColorChange = i % 4 === 0 || i % 4 === 1;
        var _arrayBars = document.getElementsByClassName('array-bar');
        if (isColorChange === true) {
          (function () {
            var color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

            var _animations$i3 = _slicedToArray(animations[i], 2),
                BarOneIDx = _animations$i3[0],
                BarTwoIDx = _animations$i3[1];

            var BarOneStyle = _arrayBars[BarOneIDx].style;
            var BarTwoStyle = _arrayBars[BarTwoIDx].style;
            setTimeout(function () {
              BarOneStyle.backgroundColor = color;
              BarTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          })();
        } else {
          var _ret3 = function () {
            var _animations$i4 = _slicedToArray(animations[i], 2),
                barIdx = _animations$i4[0],
                newHeight = _animations$i4[1];

            if (barIdx === -1) {
              return 'continue';
            }
            var barStyle = _arrayBars[barIdx].style;
            setTimeout(function () {
              barStyle.height = newHeight * 0.8 + 'px';
            }, i * ANIMATION_SPEED_MS);
          }();

          if (_ret3 === 'continue') continue;
        }
      }
    }
  }, {
    key: 'quickSort',
    value: function quickSort() {}
  }, {
    key: 'heapSort',
    value: function heapSort() {}
  }, {
    key: 'generateNewArray',
    value: function generateNewArray() {
      this.resetArray();
      var arrayBars = document.getElementsByClassName('array-bar');
      for (var i = 0; i < this.state.array.length; i++) {
        arrayBars[i].style.backgroundColor = 'white';
      }
    }
  }, {
    key: 'preformSort',
    value: function preformSort(sortNumber) {
      var stopWatch = document.getElementById('Stopwatch-wrap');
      // seconds = 10;
      // var startTime = new Date().getTime();
      switch (sortNumber) {
        case 1:
          this.mergeSort();
          // var endTime = new Date().getTime();
          // var timeDiffernce = endTime - startTime;
          // timeDiffernce /= 1000;
          // var seconds = Math.round(timeDiffernce); 
          // alert('Sort time: ' + seconds);
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

      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var array = this.state.array;

      return React.createElement(
        'div',
        { className: 'main-wrap' },
        React.createElement(
          'div',
          { className: 'array-container' },

          //mapping the array to bars to be rendered on the screen
          array.map(function (value, idx) {
            return React.createElement('div', {
              className: 'array-bar',
              key: idx,
              style: { height: value * 0.8 + 'px' } });
          })
        ),
        React.createElement(
          'div',
          { className: 'button-wrap' },
          React.createElement(
            'button',
            { onClick: function onClick() {
                return _this2.generateNewArray();
              } },
            'Generate new array'
          ),
          React.createElement(
            'button',
            { onClick: function onClick() {
                return _this2.preformSort(1);
              } },
            'Merge Sort'
          ),
          React.createElement(
            'button',
            { onClick: function onClick() {
                return _this2.preformSort(2);
              } },
            'Quick Sort'
          ),
          React.createElement(
            'button',
            { onClick: function onClick() {
                return _this2.preformSort(3);
              } },
            'Heap Sort'
          ),
          React.createElement(
            'button',
            { onClick: function onClick() {
                return _this2.preformSort(4);
              } },
            'Bubble Sort'
          )
        )
      );
    }
  }]);

  return SortingVisualiser;
}(React.Component);

export default SortingVisualiser;


function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
