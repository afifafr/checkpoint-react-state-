import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        fullName: 'Cristiano Ronaldo',
        bio: `À propos ; couramment appelé Cristiano Ronaldo ou Ronaldo et surnommé CR7, né le 5 février 1985 à Funchal, est un footballeur international portugais qui joue au poste d'attaquant à Al-Nassr.`,
        imgSrc: "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt119a9af4b2264be4/651fc9ef97fc6d60e60f28cb/GOAL_-_Blank_WEB_-_Facebook_-_2023-10-06T093954.950.png?auto=webp&format=pjpg&width=3840&quality=60",
        profession: 'Footballeur international',
      },
      show: false,
      mountedTime: new Date(),
      elapsedTime: '00:00:00',
    };
  }

  toggleShow = () => {
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  };

  componentDidMount() {
    // Start the interval to update the elapsed time every second
    this.intervalId = setInterval(() => {
      const elapsedTime = this.getElapsedTime();
      this.setState({ elapsedTime });
    }, 1000);
  }

  componentWillUnmount() {
    // Clear the interval when the component is unmounted to avoid memory leaks
    clearInterval(this.intervalId);
  }

  getElapsedTime() {
    const { mountedTime } = this.state;
    const currentTime = new Date();
    const timeDiff = Math.floor((currentTime - mountedTime) / 1000);
    const hours = Math.floor(timeDiff / 3600);
    const minutes = Math.floor((timeDiff % 3600) / 60);
    const seconds = timeDiff % 60;
    return `${this.formatTimeUnit(hours)}:${this.formatTimeUnit(minutes)}:${this.formatTimeUnit(seconds)}`;
  }

  formatTimeUnit(unit) {
    // Helper function to format time units to have leading zeros
    return unit < 10 ? `0${unit}` : unit;
  }

  render() {
    const { fullName, bio, imgSrc, profession } = this.state.person;
    const { show, elapsedTime } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 mt-5">
            {show && (
              // Render the card only if show state is true
              <div className="card mt-3">
                <img className="card-img-top" src={imgSrc} alt={fullName} />
                <div className="card-body">
                  <h5 className="card-title">{fullName}</h5>
                  <p className="card-text">{bio}</p>
                  <p className="card-text">Profession: {profession}</p>
                </div>
              </div>
            )}
            <button className={`btn ${show ? 'btn-danger' : 'btn-primary'} mt-3`} onClick={this.toggleShow}>
              {show ? 'Hide Details' : 'Show Details'}
            </button>
            <div className="mt-3 chronometer">
              <span className="clock">{elapsedTime}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;