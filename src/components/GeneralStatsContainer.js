import React, { Component } from 'react';
import './App.css';

class GeneralStatsContainer extends Component {
  render = () => {
    const { stats, title } = this.props;

    return (
      <div className="general-stats-container">
        <h3>{ title }</h3>
        <div className="stats">
          <div className="stats-row">
            <div>
              <p className="stat-result">{ stats.totalMatches }</p>
              <p className="stat-title">Total Matches </p>
            </div>
            <div>
              <p className="stat-result">{ stats.totalCompleted }</p>
              <p className="stat-title">Total Matches Completed </p>
            </div>
            <div>
              <p className="stat-result">{ stats.totalWon }</p>
              <p className="stat-title">Total Matches Won </p>
            </div>
            <div>
              <p className="stat-result">{ stats.totalLost }</p>
              <p className="stat-title">Total Matches Lost </p>
            </div>
          </div>

          <div className="card-row">
            <div>
              <p className="card-result">{ Math.round((stats.totalCompleted / stats.totalMatches) * 100) }</p>
              <p className="card-title">% Completed</p>
            </div>
            <div>
              <p className="card-result">{ Math.round((stats.totalWon / stats.totalMatches) * 100) }</p>
              <p className="card-title">% Won</p>
            </div>
          </div>

          <div className="stats-row">
            <div>
              <p className="stat-result">{ stats.totalUnitsBuilt }</p>
              <p className="stat-title">Total Units Built </p>
            </div>
            <div>
              <p className="stat-result">{ stats.totalUnitsDestroyed }</p>
              <p className="stat-title">Total Units Destroyed </p>
            </div>
            <div>
              <p className="stat-result">{ stats.totalUnitsLost }</p>
              <p className="stat-title">Total Units Lost </p>
            </div>
          </div>

          <div className="card-row">
            <div>
              <p className="card-result">{ (stats.totalUnitsDestroyed / stats.totalUnitsBuilt).toFixed(2) }</p>
              <p className="card-title">Unit Kill Ratio</p>
            </div>
            <div>
              <p className="card-result">{ Math.round((1 - (stats.totalUnitsLost / stats.totalUnitsBuilt)) * 100) }</p>
              <p className="card-title">% Unit Survivability</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GeneralStatsContainer;
