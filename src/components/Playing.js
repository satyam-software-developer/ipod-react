import React from "react"; // Import React to create the component
import "../css/Playing.css"; // Import the CSS file for styling the Playing component

// The Playing component renders the "Now Playing" screen of the iPod interface.
// It displays the current song details, playback status, and a progress bar.

class Playing extends React.Component {
  constructor(props) {
    super(props);
    // Initialize the component state with the current time of the audio playback
    this.state = {
      currentTime: 0, // Tracks the current playback time of the audio
    };
    this.intervalId = ""; // To store the interval ID for updating the current time
  }

  // Logic for updating the current music playback time
  componentDidMount() {
    const { audio } = this.props; // Destructure audio object from props
    this.setState({ currentTime: audio.currentTime }); // Set initial current time from the audio element
    // Set an interval to update the current time every 100 milliseconds
    this.intervalId = setInterval(() => {
      this.setState({ currentTime: this.props.audio.currentTime });
    }, 100);
  }

  // Clear the interval when the component is unmounted to prevent memory leaks
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  // Render the "Now Playing" screen
  render() {
    const { songItems, playing, songIndex, audio, songImgUrl } = this.props; // Destructure props
    // Format the current time and duration for display
    var currentTimeRender =
      Math.floor(this.state.currentTime / 60) +
      ":" +
      Math.floor(this.state.currentTime % 60);
    var durationRender =
      Math.floor(audio.duration / 60) + ":" + Math.floor(audio.duration % 60);
    // Calculate the width of the progress bar as a percentage of the song's duration
    const percentageComplete = {
      width: (this.state.currentTime / audio.duration) * 100 + "%",
    };

    // Handle cases where the duration is not available (NaN)
    if (durationRender === "NaN:NaN") {
      durationRender = "0:00";
    }

    // Ensure that the seconds part of the current time has a leading zero if it's less than 10
    if (Math.floor(this.state.currentTime % 60 < 10)) {
      currentTimeRender =
        Math.floor(this.state.currentTime / 60) +
        ":0" +
        Math.floor(this.state.currentTime % 60);
    }

    return (
      <div className="now-playing-container">
        <div className="song-details">
          {/* Display the song's image */}
          <img src={songImgUrl} alt="songImg"></img>
          <div>
            {/* Display the song's title */}
            <h6>{songItems[songIndex]}</h6>
            {/* Display whether the song is playing or paused */}
            {playing && <h4 className="play-pause-nav">Playing</h4>}
            {!playing && <h4 className="play-pause-nav">Paused</h4>}
          </div>
        </div>
        <div className="status">
          {/* Display the current playback time */}
          {currentTimeRender}
          <div id="progress">
            {/* Display the progress bar */}
            <div style={percentageComplete} id="progress-bar"></div>
          </div>
          {/* Display the song's total duration */}
          {durationRender}
        </div>
      </div>
    );
  }
}

export default Playing; // Export the Playing component for use in other parts of the application
