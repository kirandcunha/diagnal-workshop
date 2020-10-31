import React from "react";
import Card from "../card";
import {LAZY_LOAD_THRESHOLD} from "../../utils/constants";
import "./index.css";

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
    this.scrolled = this.scrolled.bind(this);
  }
  componentDidMount() {
    this.gridRef.current.addEventListener("scroll", this.scrolled);
  }

  componentWillUnmount() {
    this.gridRef.current.removeEventListener("scroll", this.scrolled);
  }

  scrolled(event) {
    const node = event.srcElement;
    if (
      node.scrollTop >
      node.scrollHeight - node.clientHeight * LAZY_LOAD_THRESHOLD
    ) {
      this.props.thresholdReached && this.props.thresholdReached();
    }
  }

  render() {
    return (
      <div className="grid" ref={this.gridRef}>
        {this.props.posters &&
          this.props.posters.map((item, i) => {
            return <Card key={i} poster={item} />;
          })}
      </div>
    );
  }
}
export default Grid;
