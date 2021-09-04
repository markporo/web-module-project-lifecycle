import React from "react";
import '../App.css';

class Follower extends React.Component {
    componentDidMount() {
        console.log("follower: Component Did Mount");
    }

    componentDidUpdate() {
        console.log("follower: Component Did Update");
    }

    render() {
        console.log("follower: Component Renders");
        return (
            <div key={this.props.follower.id} className="follower">
                <div className="imageDiv">
                    <img className="followerImg" src={this.props.follower.avatar_url} alt={this.props.follower.login}></img>
                </div>
                <div className="textOfFollower">
                    <h3 className="followerChild">{this.props.follower.login}</h3>
                </div>
            </div>
        );
    }
}

export default Follower;
