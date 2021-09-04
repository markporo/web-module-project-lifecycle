import React from "react";
import Follower from "./Follower";

class Followers extends React.Component {
  componentDidMount() {
    console.log("Followers: Component Did Mount");
  }

  componentDidUpdate() {
    console.log("Followers: Component Did Update");
  }

  render() {
    console.log("Followers: Component Renders");
    return (
      <>
        {this.props.followers.map((eachFollower) => (
          <Follower key={eachFollower.id} follower={eachFollower} />
        ))}
      </>
    );
  }
}

export default Followers;
