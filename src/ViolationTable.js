import React from 'react';
import './ViolationTable.css';

export default class ViolationTable extends React.Component {

  render() {

    if (!this.props.violations || this.props.violations.length === 0) {
      return null;
    }

    return (
      <table className="violation-table">
        <thead>
          <tr>
            <th>product</th>
            <th>violation</th>
            <th>firm</th>
          </tr>
        </thead>
        <tbody>
          {this.props.violations.map((x, i) => {
            return (
              <tr key={i}>
                <td>{x.product}</td>
                <td>{x.violation}</td>
                <td>{x.firm}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    );
  }

}
