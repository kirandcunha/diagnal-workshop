import React from "react";
import {connect} from "react-redux";
import * as actionTypes from "../../store/action/";
import Header from "../../components/header";
import Grid from "../../components/grid";
import "./index.css";

class Home extends React.Component {
  MODULE_NAME = "Home";
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      searchText: ""
    };
    this.onSearch = this.onSearch.bind(this);
    this.thresholdReached = this.thresholdReached.bind(this);
  }

  componentDidMount() {
    if (this.props.data === null) {
      this.props.fetchData(this.state.page);
    }
  }

  onSearch(text) {
    console.log("onSearch ", text)
    this.setState({
      searchText: text
    });
  }

  onBackClick() {
    console.log("onBackClick")
    this.setState({
      searchText: ""
    });
  }

  thresholdReached() {
    console.log(
      "thresholdReached ",
      this.props.dataLoading,
      this.props.itemsReceived,
      this.props.totalItems
    );
    if (
      this.props.itemsReceived < this.props.totalItems &&
      !this.props.dataLoading
    ) {
      console.log("Need to fire");
      this.props.fetchData(this.state.page + 1);
      this.setState({
        page: this.state.page + 1
      });
    }
  }

  render() {
    const filteredData = this.props.data
      ? this.props.data.filter(item =>
          item.name.toLowerCase().includes(this.state.searchText.toLowerCase().trim())
        )
      : [];
    return (
      <div className="home">
        <Header onSearch={this.onSearch} />
        <Grid posters={filteredData} thresholdReached={this.thresholdReached} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.pageData,
    searchText: state.searchText,
    itemsReceived: state.itemsReceived,
    totalItems: state.totalItems,
    dataLoading: state.dataLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: page => {
      dispatch(actionTypes.fetchData(page));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
