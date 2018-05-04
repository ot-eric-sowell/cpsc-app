import React, { Component } from 'react';
import './App.css';
import ViolationTable from './ViolationTable';

class App extends Component {

  state = {
    queryValue: '',
    violations: []
  }

  handleChange = (evt) => {
    this.setState({ queryValue: evt.target.value });
  }

  handleClick = () => {
    fetch('http://localhost:4001/api')
      .then((resp) => resp.json())
      .then((data) => {
        console.log('data', data);
        this.setState({
          violations: data.violations
        });
      });
  }

  render() {
    return (
      <div className="app">

        <input value={this.state.queryValue} onChange={this.handleChange} />
        <button onClick={this.handleClick}>Search</button>

        <ViolationTable violations={this.state.violations} />

      </div>
    );
  }
}

export default App;
