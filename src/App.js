import React, { Component } from "react";
import ReactDOM from "react-dom";
import Spotify from "spotify-web-api-js";
import TrackAttributes from "./Attributes"

//Components
import Slider from "./components/Slider"
import Genre from "./components/Genre"
import Song from "./components/Song"
import Artist from "./components/Artist"
import { arrayExpression } from "@babel/types";

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "55c84944763743b8b51dedcea1dd0c89";
const redirectUri = "slideintospotify.netlify.com";

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
        Acousticness: 0.5,
        Danceability: 0.5,
        Energy: 0.5,
        Instrumentalness: 0.5,
        Liveness: 0.5,
        Speechiness: 0.5,
        Popularity: 50,
        Valence: 0.5
      },
      inUse: {
        Acousticness: true,
        Danceability: true,
        Energy: true,
        Instrumentalness: true,
        Liveness: true,
        Speechiness: true,
        Popularity: true,
        Valence: true
      },
      message: ""
    };
    this.getRecommend = this.getRecommend.bind(this);
    this.getGenres = this.getGenres.bind(this);
    this.handleGetValue = this.handleGetValue.bind(this);
    this.handleGetInUse = this.handleInUse.bind(this);
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
      if (devices.length > 0) {
        this.setState({
          authenticated: true,
          devices,
          currentDevice: devices[0].id
        });
      } else {
        alert("Make sure your spotify id and redirect URI is correctly set in the Spotify Developer page.");
        this.setState({
          authenticated: false
        });
      }
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

  handleInUse(attribute) {
    var copy = this.state.inUse;
    copy[attribute] = !copy[attribute];
    this.setState({
      inUse: copy
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
      if (this.state.inUse[key]) {
        query["target_"+key.toLowerCase()] = parseFloat(attributes[key]);
      }
    }
    //console.log(query);

    let attempts = 0;
    while (attempts < 5) {
      const {tracks: [wtf]} = await this.spotifyClient.getRecommendations(query);
      if (wtf === undefined){
        alert("Not a valid genre. Maybe use the genre generator");
        return;
      }

      let repeat = false;
      for (let i = 0; i < this.state.songs.length; i++) {
        if (this.state.songs[i].name === wtf.name) {
          repeat = true;
        }
      }
      if (!repeat) {
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

        break;
      } else {
        attempts++;
      }
      
      console.log(attempts);
    }
    if (attempts >= 5) {
      this.setState({message: "Can't find a unique song."}) 
    } else {
      this.setState({message: ""}) 
    }
    
  }


  render() {
    if (!this.state.authenticated) {
      return (
        <div id="login">
          <h1>Slide Into Spotify</h1>
          <a href={`https://accounts.spotify.com/authorize/?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=user-read-playback-state user-modify-playback-state user-top-read user-read-private`}>
          <h2>Login with your Spotify Account</h2>
          </a>
        </div>
        
      );
    }

    else {
      return (
        <div id="container">
          <div className="title">
            <h1>Slide Into Spotify</h1>
          </div>
          

          <div className="top-form">

            <div className="search-device">
              <select
                className="ui dropdown"
                onChange={e => this.setState({ currentDevice: e.target.value })}
              >
                {this.state.devices.map(device => (
                  <option class="option" value={device.id}>{device.name}</option>
                ))}
              </select>
            </div>
            <div className="ui form action-bar">
              
              <input id="search-bar"
                placeholder="Enter genre(s) here: Ex. pop or hip-hop, country"
                type="text"
                onChange={e => this.setState({ search: e.target.value })}
              />
              <input id="search-button"type="submit" onClick={this.getRecommend} value="Search" />
              <p id="input-message">{this.state.message}</p>
              
            </div>
            <input id="generate-genre-button" type="submit" onClick={this.getGenres} value="Generate Sample Genres" />
          </div>

          <div className="genre">
            <div className="genres ui container eight column grid">
              {this.state.genres.map((genre) => (
                <Genre name={genre}/>
              ))}
            </div>
          </div>

          <div id="main-content">
            <div className="attribute-table">
              <table>
                <colgroup>
                  <col width="15%"></col>
                  <col width="55%"></col>
                  <col width="20%"></col>
                  <col width="10%"></col>
                </colgroup>
                <tr id="col-names">
                  <th>Attribute</th>
                  <th>Description</th>
                  <th>Slider</th>
                  <th>Search with Attribute</th>
                </tr>
                {TrackAttributes.attributes.map((attr) => (
                  <Slider getValue={this.handleGetValue} sliderName={attr.name} val={this.state.sliderValues[attr.name]}
                    sliderDescription={attr.description} step={attr.step} min={attr.min} max={attr.max}
                    inUse={this.state.inUse[attr.name]} changeInUse={() => this.handleInUse(attr.name)} />
                ))}
                {/* sliderDescription={attr.description} */}
              </table>
            </div>

            
            <div class="ui link cards">
              {this.state.songs.map(song => (
                <Song device={this.state.devices[0]} uri={song.uri} name={song.name} artists={song.artists} img={song.img}/>
              ))}
            </div>
          </div>

        </div>
      );
    }
  }
}

export default App;
