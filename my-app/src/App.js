import React from 'react'
import './App.css';
import axios from 'axios'

import Followers from "./components/Followers";

const user = "bigknell"

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: [],
      followers: [],
      currentUser: user,
    };
  }

  componentDidMount() {
    console.log("App: Component Did Mount");
    // axios call to get friends user is following

    const userInfoRequest = axios.get(`https://api.github.com/users/${this.state.currentUser}`);
    const followersRequest = axios.get(`https://api.github.com/users/${this.state.currentUser}/followers`);

    axios
      .all([userInfoRequest, followersRequest])
      .then(
        axios.spread((...responses) => {
          const userInfoResponse = responses[0];
          const followersResponse = responses[1];

          // use/access the results
          this.setState({
            userInfo: userInfoResponse.data,
            followers: followersResponse.data,
          });
        })
      )
      .catch(errors => {
        // react on errors.
        console.error(errors);
      })
  };


  componentDidUpdate(prevProps, prevState) {
    console.log("App: Component Did Update");

    console.log("old props: ", prevProps);
    console.log("new props: ", this.props);

    console.log("old state: ", prevState);
    console.log("new state: ", this.state);

    if (prevState.currentUser !== this.state.followers.length) {
      console.log("a change was made");

    }
  }

  handleClick = e => {
    this.setState({
      currentUser: e.target.value,
    });
  }


  render() {
    console.log("App: Component renders");
    return (
      <div className="fullContainer" >
        <input placeholder="Type Your Github UserName" value={this.state.currentUser} ></input> <button>Click for Github Info</button>
        <h1 className="mainTitle">{this.state.userInfo.name}'s Github Stats and Followers</h1>
        <div className='userDiv'>
          {<img className="userImage" src={this.state.userInfo.avatar_url} alt={user}></img>}
          <div>
            <p style={{ display: (this.state.userInfo.name) ? "block" : "none" }}>Name: {this.state.userInfo.name}</p>
            <p style={{ display: (this.state.userInfo.location) ? "block" : "none" }}>Home: {this.state.userInfo.location}</p>
            <p style={{ display: (this.state.userInfo.bio) ? "block" : "none" }}>Bio: {this.state.userInfo.bio}</p>
            <p>Followers: {this.state.userInfo.followers}</p>
            <p>Following: {this.state.userInfo.following}</p>
          </div>
        </div>

        <div className="followersDiv">
          <h2>Followers of {user}</h2>
          {this.state.followers.length === 0 ? (
            <h3>This User is Not Being Followed by anyone...</h3>
          ) : (
            <Followers followers={this.state.followers} />
          )}
        </div>

      </div>
    );
  }
}

export default App;

