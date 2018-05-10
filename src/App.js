import React, { Component } from 'react';
import './App.css';
import ViolationTable from './ViolationTable';
import Pager from './Pager';

class App extends Component {

  state = {
    queryValue: '',
    violations: [],
    countPerPage: 10,
    countPerPageDisplay: 5,
    total: 0,
    currentIndex: 0
  }

  handleChange = (evt) => {
    this.setState({ queryValue: evt.target.value });
  }

  makeApiCall = () => {

    let query = [];
    query.push('take=' + this.state.countPerPage);
    query.push('skip=' + this.state.currentIndex);
    if (this.state.queryValue !== '') {
      query.push('product=' + this.state.queryValue);
    }

    fetch('https://cpsc-api.herokuapp.com/api?' + query.join('&'))
      .then((resp) => resp.json())
      .then((data) => {
        this.searchCompleted(data);
      });
  }

  searchCompleted = (apiResponseData) => {
    console.log('data', apiResponseData);

    this.setState({
      violations: apiResponseData.violations,
      total: apiResponseData.total
    });

  }

  handleNext = () => {
    this.setState({
      currentIndex: this.state.currentIndex + this.state.countPerPage
    }, () => {
      this.makeApiCall();
    });
  }

  handlePrevious = () => {
    this.setState({
      currentIndex: this.state.currentIndex - this.state.countPerPage
    }, () => {
      this.makeApiCall();
    });
  }

  render() {

    let pager;
    if (this.state.total > 0) {
      const currentPage = this.state.currentIndex / this.state.countPerPage + 1;
      const totalPages = Math.ceil(this.state.total / this.state.countPerPage);

      pager = <Pager total={totalPages}
                currentPage={currentPage}
                next={this.handleNext}
                previous={this.handlePrevious} />;
    }

    return (
      <div className="app">

        <h1>CPSC Data</h1>

        <input className="query" value={this.state.queryValue} onChange={this.handleChange} placeholder="product name query" />
        <button onClick={this.makeApiCall}>Search</button>

        <ViolationTable violations={this.state.violations} />

        {pager}
      </div>
    );
  }
}

export default App;
