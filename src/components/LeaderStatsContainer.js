import React, { Component } from 'react';
import './App.css';

class LeaderStatsContainer extends Component {
  render = () => {
    const { stats, title } = this.props;

    return (
      <div className="leader-stats-container">
        <h3>{ title }</h3>
        <div className="stats">
          <div className="stats-row">
            <div>
              <p className="stat-result">{ stats.TotalMatchesStarted }</p>
              <p className="stat-title">Total Matches </p>
            </div>
            <div>
              <p className="stat-result">{ stats.TotalMatchesCompleted }</p>
              <p className="stat-title">Total Matches Completed </p>
            </div>
            <div>
              <p className="stat-result">{ stats.TotalMatchesWon }</p>
              <p className="stat-title">Total Matches Won </p>
            </div>
            <div>
              <p className="stat-result">{ stats.TotalMatchesLost }</p>
              <p className="stat-title">Total Matches Lost </p>
            </div>
          </div>
          <div className="card-row">
            <div>
              <p className="card-result">{ Math.round((stats.TotalMatchesCompleted / stats.TotalMatchesStarted) * 100) }</p>
              <p className="card-title">% Completed</p>
            </div>
            <div>
              <p className="card-result">{ Math.round((stats.TotalMatchesWon / stats.TotalMatchesStarted) * 100) }</p>
              <p className="card-title">% Won</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LeaderStatsContainer;
