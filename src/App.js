import React, { Component } from 'react';
import './App.css';
import ViolationTable from './ViolationTable';

class App extends Component {

  state = {
    queryValue: '',
    violations: [],
    countPerPage: 5
  }

  handleChange = (evt) => {
    this.setState({ queryValue: evt.target.value });
  }

  handleClick = () => {

    let query = [];
    query.push('take=' + this.state.countPerPage);
    if (this.state.queryValue !== '') {
      query.push('product=' + this.state.queryValue);
    }


    fetch('http://localhost:4001/api?' + query.join('&'))
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

        <h1>CPSC Data</h1>

        <input className="query" value={this.state.queryValue} onChange={this.handleChange} placeholder="product name query" />
        <button onClick={this.handleClick}>Search</button>

        <ViolationTable violations={this.state.violations} />


      </div>
    );
  }
}

export default App;
