import React from "react";

class Slider extends React.Component {

  constructor(props){
    super(props)
  }

  render (){
    return (
      <tr>
        <td><b>{this.props.sliderName}</b></td>
        <td>{this.props.sliderDescription}</td>
        <td className="td-slider">
          <div>
            <input onInput={this.props.getValue} value={this.props.val} id={this.props.sliderName} step={this.props.step} className="slider" type="range" min={this.props.min} max={this.props.max}></input>
          </div>
          <div>{this.props.val}</div>
        </td>
      </tr>
    )
  }
}

export default Slider
