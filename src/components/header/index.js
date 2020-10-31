import React from "react";
import {KEYCODES} from "../../utils/constants";
import "./index.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.showSearch = this.showSearch.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onBackClick = this.onBackClick.bind(this);

    this.inputRef = React.createRef();

    this.state = {
      showSearch: false,
      searchValue: ""
    };
  }

  componentDidMount() {
    window.addEventListener("keydown", this.keyDown);
    window.addEventListener("mousedown", this.mouseDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyDown);
    window.removeEventListener("mousedown", this.mouseDown);
  }
  onBackClick() {
    this.props.onBackClick && this.props.onBackClick()
  }

  keyDown(event) {
    switch (event.keyCode) {
      // case KEYCODES.BACK:
      case KEYCODES.ESCAPE:
        this.hideSearch();
        break;
      default:
    }
  }
  mouseDown(event) {
    if (this.state.showSearch && event.target !== this.inputRef.current) {
      this.hideSearch();
    }
  }

  handleChange(event) {
    this.setState({searchValue: event.target.value});
    this.props.onSearch && this.props.onSearch(event.target.value)
  }

  showSearch() {
    this.setState({
      showSearch: true
    }, () => {
      this.inputRef.current.focus()
    });
  }

  hideSearch() {
    this.setState({
      showSearch: false
    });
  }

  render() {
    return (
      <div className="header">
        {!this.state.showSearch ? (
          <div>
            <div className="back-button" onClick={this.onBackClick}/>
            <div className="title">
              {this.props.title ? this.props.title : "Romantic Comedy"}
            </div>
            <div className="search-icon" onClick={this.showSearch} />
          </div>
        ) : (
          <input
            ref={this.inputRef}
            type="text"
            name="search"
            placeholder="Search.."
            className="search-input"
            autoComplete="off"
            value={this.state.searchValue}
            onChange={this.handleChange}
          />
        )}
      </div>
    );
  }
}
export default Header;
