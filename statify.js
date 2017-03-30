const bodyParser = require('body-parser')
const axios = require('axios')

function getPlaylists() {
  return new Promise(function(resolve, reject) {
    var playlists = {ranked:{}, social:{}};

    axios.get('https://www.haloapi.com/metadata/hw2/playlists',
    {headers: {'Ocp-Apim-Subscription-Key': '65a5c5f7b98445a4be88f7837a70d06d'}})
    .then((response) => {
      const data = response.data;

      data.ContentItems.forEach((playlist, index) => {
        if ((playlist.View.Title).toLowerCase().search("ranked") !== -1) {
          playlists.ranked[playlist.View.Identity] = playlist.View.Title
        } else {
          playlists.social[playlist.View.Identity] = playlist.View.Title
        }
      })
      resolve(playlists);
    })
    .catch(error => reject(error));
  })

}

function getPlayerInfo(gamertag) {
  return new Promise(function(resolve, reject) {
    axios.get(`https://www.haloapi.com/stats/hw2/players/${gamertag}/stats`,
      {headers: {'Ocp-Apim-Subscription-Key': '65a5c5f7b98445a4be88f7837a70d06d'}})
    .then((response) => {
      const data = {data: response.data};

      if (((data.data.MatchmakingSummary.SocialPlaylistStats).length === 0) && ((data.data.MatchmakingSummary.RankedPlaylistStats).length === 0)) {
        reject("Gamertag Not Found")
      } else {
        resolve(data);
      }
    })
    .catch(error => reject(error))
  })
}

function getDetailedStats(results) {
  return new Promise(function(resolve, reject) {
    var stats = {rankedBreakdown:[], socialBreakdown:[]};
    var playlists = results[0];
    var data = results[1].data;

    // RANKED STATS
    data.MatchmakingSummary.RankedPlaylistStats.forEach((playlist, index) => {
      if (stats.ranked) {
        stats.ranked.totalMatches += playlist.TotalMatchesStarted;
        stats.ranked.totalCompleted += playlist.TotalMatchesCompleted;
        stats.ranked.totalWon += playlist.TotalMatchesWon;
        stats.ranked.totalLost += playlist.TotalMatchesLost;
        stats.ranked.totalUnitsBuilt += playlist.TotalUnitsBuilt;
        stats.ranked.totalUnitsLost += playlist.TotalUnitsLost;
        stats.ranked.totalUnitsDestroyed += playlist.TotalUnitsDestroyed;
      } else {
        stats.ranked = {totalMatches: playlist.TotalMatchesStarted};
        stats.ranked.totalCompleted = playlist.TotalMatchesCompleted;
        stats.ranked.totalWon = playlist.TotalMatchesWon;
        stats.ranked.totalLost = playlist.TotalMatchesLost;
        stats.ranked.totalUnitsBuilt = playlist.TotalUnitsBuilt;
        stats.ranked.totalUnitsLost = playlist.TotalUnitsLost;
        stats.ranked.totalUnitsDestroyed = playlist.TotalUnitsDestroyed;
      }
    })

    // RANKED STATS BREAKDOWN
    data.MatchmakingSummary.RankedPlaylistStats.forEach((playlist, index) => {
      var currentPlaylist = playlistIdConverter(playlist.PlaylistId, playlists, 'ranked');
      var leaders = playlistLeaderConverter(playlist.LeaderStats);

      stats.rankedBreakdown.push({
        playlist: currentPlaylist,
        totalMatches: playlist.TotalMatchesStarted,
        totalCompleted: playlist.TotalMatchesCompleted,
        totalWon: playlist.TotalMatchesWon,
        totalLost: playlist.TotalMatchesLost,
        totalUnitsBuilt: playlist.TotalUnitsBuilt,
        totalUnitsLost: playlist.TotalUnitsLost,
        totalUnitsDestroyed: playlist.TotalUnitsDestroyed,
        leaderStats: leaders
      });
    })

    // UNRANKED STATS
    data.MatchmakingSummary.SocialPlaylistStats.forEach((playlist, index) => {
      if (stats.social) {
        stats.social.totalMatches += playlist.TotalMatchesStarted;
        stats.social.totalCompleted += playlist.TotalMatchesCompleted;
        stats.social.totalWon += playlist.TotalMatchesWon;
        stats.social.totalLost += playlist.TotalMatchesLost;
        stats.social.totalUnitsBuilt += playlist.TotalUnitsBuilt;
        stats.social.totalUnitsLost += playlist.TotalUnitsLost;
        stats.social.totalUnitsDestroyed += playlist.TotalUnitsDestroyed;
      } else {
        stats.social = {totalMatches: playlist.TotalMatchesStarted};
        stats.social.totalCompleted = playlist.TotalMatchesCompleted;
        stats.social.totalWon = playlist.TotalMatchesWon;
        stats.social.totalLost = playlist.TotalMatchesLost;
        stats.social.totalUnitsBuilt = playlist.TotalUnitsBuilt;
        stats.social.totalUnitsLost = playlist.TotalUnitsLost;
        stats.social.totalUnitsDestroyed = playlist.TotalUnitsDestroyed;
      }
    })

    // UNRANKED STATS BREAKDOWN
    data.MatchmakingSummary.SocialPlaylistStats.forEach((playlist, index) => {
      var currentPlaylist = playlistIdConverter(playlist.PlaylistId, playlists, 'social');
      var leaders = playlistLeaderConverter(playlist.LeaderStats);

      stats.socialBreakdown.push({
        playlist: currentPlaylist,
        totalMatches: playlist.TotalMatchesStarted,
        totalCompleted: playlist.TotalMatchesCompleted,
        totalWon: playlist.TotalMatchesWon,
        totalLost: playlist.TotalMatchesLost,
        totalUnitsBuilt: playlist.TotalUnitsBuilt,
        totalUnitsLost: playlist.TotalUnitsLost,
        totalUnitsDestroyed: playlist.TotalUnitsDestroyed,
        leaderStats: leaders
      });
    })

    resolve(stats);
  });
}

function playlistIdConverter(id, playlists, type) {
  id = id.split('-').join('');
  playlist = (playlists[type][id]).replace(' (CU4+)', '');
  return playlist;
}

function playlistLeaderConverter(leaderList) {
  var leaders = [];

  for (var leader in leaderList) {
    var currentLeader = leaderList[leader]
    currentLeader.Leader = leader;
    leaders.push(currentLeader);
  }

  return leaders;
}

module.exports = {
  getPlayerInfo: getPlayerInfo,
  getDetailedStats: getDetailedStats,
  getPlaylists: getPlaylists
}
