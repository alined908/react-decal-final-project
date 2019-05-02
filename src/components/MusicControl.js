import React from "react";
import Spotify from "spotify-web-api-js";

class MusicControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentDevice: this.props.device.id,
      playing: false,
      play: "play icon",
      pause: "pause icon"
    };
    this.spotifyClient = new Spotify();
  }

  async playSong() {
    if (!this.state.playing) {
      await this.spotifyClient.play({
        device_id: this.state.currentDevice
      });
      this.setState({play: "pause icon", playing: true});
    } else {
      await this.spotifyClient.pause({
        device_id: this.state.currentDevice
      });
      this.setState({play: "play icon", playing: false});
    }
    
  }

  async setVolume(percent) {
    await this.spotifyClient.setVolume(percent);
  }

  render (){
    return (
      <div id="control"> 
         <i class={this.state.play} onClick={e => this.playSong()}></i>
        
        <div id="volume">
          <i class="volume off icon"></i>
          <input id="Volume" className="slider" value={this.props.val} type="range" step="1" min="0" max="100" onInput={this.props.getValue} onMouseUp={()=>this.setVolume(this.props.val)}/> 
          <i class="volume up icon"></i>
        </div>
        <div>Volume: {this.props.val}</div>
      </div>
    )
  }
}
export default MusicControl
