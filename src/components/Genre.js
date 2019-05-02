import React from "react";
import Spotify from "spotify-web-api-js";

class Genre extends React.Component {
  constructor(props){
    super(props);
  }

  render (){
    return (
      <div className="ui label">{this.props.name}</div>
    )
  }
}

export default Genre
