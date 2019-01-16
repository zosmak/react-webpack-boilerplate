import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input.jsx";

class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    const { text } = this.state;
    return (
      <div>
        <div style={{ marginBottom: "10px" }}>Code example</div>
        <form id="article-form">
          <Input
            text="Input "
            label="text"
            type="text"
            id="text"
            value={text}
            handleChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}
export default MainContainer;

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<MainContainer />, wrapper) : false;
