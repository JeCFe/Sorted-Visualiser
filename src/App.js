import React, { Component } from 'react'
import SortingVisualiser from './SortingVisualiser/SortingVisualiser.jsx'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SortingVisualiser></SortingVisualiser>
       </div>
    );
  }
}

export default App;
