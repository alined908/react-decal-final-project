import React, { Component } from "react";
import ReactDOM from "react-dom";
import Spotify from "spotify-web-api-js";
import TrackAttributes from "./Attributes"

//Components
import Slider from "./components/Slider"
import Genre from "./components/Genre"
import Song from "./components/Song"
import Artist from "./components/Artist"

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "8cd26c63ef1a43529fa5ff13fc7dcb09";
const redirectUri = "http://localhost:3000/callback";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      devices: [],
      search: "",
      currentDevice: "",
      songs: [],
      genres: [],
      sliderValues: {
        Acousticness: 0,
        Danceability: 0,
        Energy: 0,
        Instrumentalness: 0,
        Liveness: 0,
        Speechiness: 0,
        Popularity: 0,
        Valence: 0
      }
    };
    this.getRecommend = this.getRecommend.bind(this);
    this.getGenres = this.getGenres.bind(this);
    this.handleGetValue = this.handleGetValue.bind(this);
  }

   shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
  }

  async componentDidMount() {
    if (window.location.hash) {
      // Remove the "#"
      const queryString = window.location.hash.substring(1);
      // Parse the access_token out
      const accessToken = new URLSearchParams(queryString).get("access_token");
      this.spotifyClient = new Spotify();
      this.spotifyClient.setAccessToken(accessToken);

      const {devices} = await this.spotifyClient.getMyDevices();
      // const devices = Object.keys(devicesResp).map(key => devicesResp[key]);
      this.setState({
        authenticated: true,
        devices,
        currentDevice: devices[0].id
      });
    }
  }

  handleGetValue = e => {
    var name = e.target.id;
    var copy = this.state.sliderValues;
    copy[name] = e.target.value;
    this.setState({
      sliderValues: copy
    });
  }

  async getGenres(){
    const {genres} = await this.spotifyClient.getAvailableGenreSeeds();
    var shortened = this.shuffle(genres).slice(0, 16);
    this.setState({genres: shortened});
  }

  async getRecommend(ev){
    ev.preventDefault();
    if (this.state.search.length == 0){
      alert("Input something into search bar");
      return;
    }
    var query = {"seed_genres": this.state.search}
    var attributes = this.state.sliderValues;
    for (var key in attributes) {
      query["target_"+key.toLowerCase()] = parseFloat(attributes[key]);
    }
    //console.log(query);

    const {tracks: [wtf]} = await this.spotifyClient.getRecommendations(query);
    if (wtf === undefined){
      alert("Not a valid genre. Maybe use the genre generator");
      return;
    }
    const hello = {
      album: wtf.album,
      uri: wtf.uri.split(":")[2],
      name: wtf.name,
      img: wtf.album.images[1].url,
      artists: wtf.artists
    }
    var copy = [...this.state.songs];
    copy.push(hello)
    this.setState({
      songs: copy
    });
  }

  render() {
    if (!this.state.authenticated) {
      return (
        <a href={`https://accounts.spotify.com/authorize/?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=user-read-playback-state user-modify-playback-state user-top-read user-read-private`}>
          Login with Spotify
        </a>
      );
    }

    else {
      return (
        <div className="ui container">
          <div className="title">
            Slide Into Spotify
          </div>

          <div className="top-form">
            <div className="ui form action-bar">
              <input id="generate-genre-button" type="submit" onClick={this.getGenres} value="Generate Sample Genres" />
              <input
                placeholder="Enter genre(s) here: Ex. pop or hip-hop, country"
                type="text"
                onChange={e => this.setState({ search: e.target.value })}
              />
              <input type="submit" onClick={this.getRecommend} value="Search" />
              <div className="search-device">
                <select
                  className="ui dropdown"
                  onChange={e => this.setState({ currentDevice: e.target.value })}
                >
                  {this.state.devices.map(device => (
                    <option value={device.id}>{device.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="genre">
            <div className="genres ui container eight column grid">
              {this.state.genres.map((genre) => (
                <Genre name={genre}/>
              ))}
            </div>
          </div>

          <div className="attribute-table">
            <table>
              <colgroup>
                <col width="15%"></col>
                <col width="60%"></col>
                <col width="25%"></col>
              </colgroup>
              <tr>
                <th>Attribute</th>
                <th>Description</th>
                <th>Slider</th>
              </tr>
              {TrackAttributes.attributes.map((attr) => (
                <Slider getValue={this.handleGetValue} sliderName={attr.name} val={this.state.sliderValues[attr.name]} sliderDescription={attr.description} step={attr.step} min={attr.min} max={attr.max}/>
              ))}
            </table>
            <br></br>
          </div>

          <div className="ui container six column grid songs-display">
            {this.state.songs.map(song => (
              <Song device={this.state.devices[0]} uri={song.uri} name={song.name} artists={song.artists} img={song.img}/>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default App;
