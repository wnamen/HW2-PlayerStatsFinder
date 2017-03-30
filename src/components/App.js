import React, { Component } from 'react';
import axios from 'axios';
import Spinner from 'react-spinkit';
import './App.css';

import PlayerSearchForm from './PlayerSearchForm';
import GlobalStatsContainer from './GlobalStatsContainer';
import GeneralStatsContainer from './GeneralStatsContainer';
import LeaderStatsContainer from './LeaderStatsContainer';
import ErrorMessage from './ErrorMessage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: undefined,
      gamertag: null,
      currentView: 'global',
      errorMessage: false,
      loading: false
    }
    this.renderCurrentView = this.renderCurrentView.bind(this);
  }

  _onSearch = (gamertag) => {
    this.setState({loading: true, stats: undefined, errorMessage: false})
    axios.get('http://localhost:9000/find-player', {params: {gamertag: gamertag}})
      .then(response => this.setState({gamertag: gamertag, stats: response.data, loading: false}))
      .catch(error => this.setState({errorMessage: true, loading: false}))
  }

  handleViewChange = (e) => {
    this.setState({currentView: e.target.dataset.view});
  }

  renderCurrentView = () => {
    const { stats } = this.state;

    let rankedPerformanceBreakdown = [];
    let rankedLeaderBreakdown = [];
    let socialPerformanceBreakdown = [];
    let socialLeaderBreakdown = [];

    if (stats !== undefined) {
      rankedPerformanceBreakdown = stats.rankedBreakdown.map((playlist, index) => {
        rankedLeaderBreakdown = playlist.leaderStats.map((leader, idx) => {
          return (<LeaderStatsContainer key={`leader ${idx}`} stats={leader} title={leader.Leader} />)
        })

        return (
          <div key={`ranked ${index}`}>
            <GeneralStatsContainer stats={playlist} title={playlist.playlist} />
            { rankedLeaderBreakdown }
          </div>
        )
      })

      socialPerformanceBreakdown = stats.socialBreakdown.map((playlist, index) => {
        socialLeaderBreakdown = playlist.leaderStats.map((leader, idx) => {
          return (<LeaderStatsContainer key={`leader ${idx}`} stats={leader} title={leader.Leader} />)
        })

        return (
          <div key={`social ${index}`}>
            <GeneralStatsContainer stats={playlist} title={playlist.playlist} />
            { socialLeaderBreakdown }
          </div>
        )
      })

    }

    if (this.state.currentView === 'global') {
      return (
        <GlobalStatsContainer stats={stats}/>
      )
    } else if (this.state.currentView === 'ranked') {
      return (
        <div>
          <GeneralStatsContainer stats={stats.ranked} title="Ranked Performance"/>
          { rankedPerformanceBreakdown }
        </div>
      )
    } else if (this.state.currentView === 'social') {
      return (
        <div>
          <GeneralStatsContainer stats={stats.social} title="Social Performance"/>
          { socialPerformanceBreakdown }
        </div>
      )
    }
  }

  render = () => {
    const { stats, gamertag, errorMessage, loading } = this.state;
    console.log(loading);

    return (
      <div className="App">

        <PlayerSearchForm handleSearch={this._onSearch}/>

        { loading && <div className="spinner-container"><Spinner spinnerName='three-bounce' /></div>}
        { errorMessage && <ErrorMessage />}

        { stats !== undefined &&
          <div className="player-stats-container">
            <h2 className="player-gamertag">{ gamertag }</h2>
            <div className="view-selectors">
              <a data-view="global" onClick={this.handleViewChange}>Global</a>
              <a data-view="ranked" onClick={this.handleViewChange}>Ranked</a>
              <a data-view="social" onClick={this.handleViewChange}>Social</a>
            </div>
            <hr />
            { this.renderCurrentView() }
          </div>
        }

        <footer>
          <center>
            <p>Halo Wars 2 © Microsoft Corporation. Halo Wars 2 Player Stat Finder was created under Microsoft's <a target="_blank" href="http://www.xbox.com/en-US/developers/rules">"Game Content Usage Rules"</a> using assets from Halo Wars 2, and it is not endorsed by or affiliated with Microsoft.</p>
          </center>
        </footer>
      </div>
    );
  }
}

export default App;
