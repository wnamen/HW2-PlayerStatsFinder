import React, { Component } from 'react';
import './App.css';

class GlobalStatsContainer extends Component {
  render = () => {
    const { stats } = this.props;

    return (
      <div className="global-stats-container">
        <h3>Global Performance</h3>
        <div className="stats">
          <div className="stats-row">
            <div>
              <p className="stat-result">{ stats.ranked.totalMatches + stats.social.totalMatches }</p>
              <p className="stat-title">Total Matches</p>
            </div>
            <div>
              <p className="stat-result">{ stats.ranked.totalCompleted + stats.social.totalCompleted }</p>
              <p className="stat-title">Total Matches Completed</p>
            </div>
            <div>
              <p className="stat-result">{ stats.ranked.totalWon + stats.social.totalWon }</p>
              <p className="stat-title">Total Matches Won</p>
            </div>
            <div>
              <p className="stat-result">{ stats.ranked.totalLost + stats.social.totalLost }</p>
              <p className="stat-title">Total Matches Lost</p>
            </div>
          </div>

          <div className="card-row">
            <div>
              <p className="card-result">{ Math.round(((stats.ranked.totalCompleted + stats.social.totalCompleted) / (stats.ranked.totalMatches + stats.social.totalMatches)) * 100) }</p>
              <p className="card-title">% Completed</p>
            </div>
            <div>
              <p className="card-result">{ Math.round(((stats.ranked.totalWon + stats.social.totalWon) / (stats.ranked.totalMatches + stats.social.totalMatches)) * 100) }</p>
              <p className="card-title">% Won</p>
            </div>
          </div>

          <div className="stats-row">
            <div>
              <p className="stat-result">{ stats.ranked.totalUnitsBuilt + stats.social.totalUnitsBuilt }</p>
              <p className="stat-title">Total Units Built</p>
            </div>
            <div>
              <p className="stat-result">{ stats.ranked.totalUnitsDestroyed + stats.social.totalUnitsDestroyed }</p>
              <p className="stat-title">Total Units Destroyed</p>
            </div>
            <div>
              <p className="stat-result">{ stats.ranked.totalUnitsLost + stats.social.totalUnitsLost }</p>
              <p className="stat-title">Total Units Lost</p>
            </div>
          </div>

          <div className="card-row">
            <div>
              <p className="card-result">{ ((stats.ranked.totalUnitsDestroyed + stats.social.totalUnitsDestroyed) / (stats.ranked.totalUnitsBuilt + stats.social.totalUnitsBuilt)).toFixed(2) }</p>
              <p className="card-title">Unit Kill Ratio</p>
            </div>
            <div>
              <p className="card-result">{ Math.round((1 - ((stats.ranked.totalUnitsLost + stats.social.totalUnitsLost) / (stats.ranked.totalUnitsBuilt + stats.social.totalUnitsBuilt))) * 100) }</p>
              <p className="card-title">% Unit Survivability</p>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default GlobalStatsContainer;
