import React, { Component } from 'react';
import './App.css';
import logo from '../../public/hw2-logo.png';

class PlayerSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gamertag: ''
    }
  }

  _handleGamertag = (e) => {
    this.setState({gamertag: e.target.value})
  }

  handleSearch = () => {
    this.props.handleSearch(this.state.gamertag)
  }

  render() {
    return (
      <div className="player-search-container">
        <div className="title-container">
          <img alt="logo" src={logo}></img>
          <h1>Player Stats Finder</h1>
          <p>The Unofficial Home to Find Detailed Halo Wars 2 Player Stats</p>
        </div>

        <div className="search-form">
          <div><input type="text" placeholder="Search by Gamertag" onChange={this._handleGamertag}></input></div>
          <div><button onClick={this.handleSearch}>Search</button></div>
        </div>
      </div>
    );
  }
}

export default PlayerSearchForm;
