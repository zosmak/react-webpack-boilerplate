import React from "react";
import Input from "../presentational/Input";

class MainContainer extends React.Component {
  state = {
    text: ""
  };

  handleChange = event =>
    this.setState({ [event.target.id]: event.target.value });

  render() {
    const { text } = this.state;
    return (
      <div>
        <img alt="logo" src={require("../../../public/favicon.ico")} />
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
