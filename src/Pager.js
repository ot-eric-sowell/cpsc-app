import React from 'react';

export default class Pager extends React.Component {

  render() {
    let nextButton;
    if (this.props.currentPage < this.props.total) {
      nextButton = <button onClick={this.props.next}>next</button>
    }

    let previousButton;
    if (this.props.currentPage > 1) {
      previousButton = <button onClick={this.props.previous}>previous</button>
    }

    return (
      <div className="pager">
        <p>Page {this.props.currentPage} of {this.props.total}</p>
        {previousButton}
        {nextButton}
      </div>
    )
  }
}
