import React from "react";
import Spotify from "spotify-web-api-js";

class Song extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentDevice: this.props.device.id
    };
    this.spotifyClient = new Spotify();
  }

  async startPlayback(songId) {
    console.log(songId);
    await this.spotifyClient.play({
      device_id: this.state.currentDevice,
      uris: [`spotify:track:${songId}`]
    });
  }

  render (){
    return (
      <div
        className="card"
        key={this.props.uri}
        onClick={e => this.startPlayback(this.props.uri)}
      >
        <div className="image">
          <img src={this.props.img} />
        </div>
        <div className="content">
          <p className="header">{this.props.name}</p>
          <div className="meta">
            <span className="date">
              {this.props.artists.map(artist => artist.name).join(", ")}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Song
