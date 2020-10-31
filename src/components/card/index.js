import React from "react";
import LinesEllipsis from "react-lines-ellipsis";
import {SERVER_URL} from "../../utils/constants";
import defaultImage from "../../assets/placeholder_for_missing_posters.png";
import "./index.css";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.onError = this.onError.bind(this);
  }
  onError(event) {
    event.target.src = defaultImage;
  }
  render() {
    return (
      <div className="card">
        <img
          onError={this.onError}
          src={SERVER_URL + this.props.poster["poster-image"]}
          className="poster"
          alt="poster"
        />
        <LinesEllipsis
        className="name"
          text={this.props.poster["name"]}
          maxLine="2"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
      </div>
    );
  }
}
export default Card;
