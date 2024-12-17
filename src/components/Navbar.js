import React from "react"; // Import React to create the component
import "../css/Navbar.css"; // Import the CSS file for styling the Navbar component
import BatImg from "../static/battery.png"; // Import the battery image for the navbar

// The Navbar component renders the top bar of the iPod interface.
// It displays the iPod logo, current time, battery icon, and notifications if any.
class Navbar extends React.Component {
  constructor() {
    super();
    // Initialize the component state with the current time
    this.state = {
      time: this.getCurrentTime(),
    };
    this.stateId = ""; // To store the interval ID for updating time
  }

  // This method is called when the component is first mounted.
  // It checks for notifications and starts an interval to update the time every 60 seconds.
  componentDidMount() {
    const { noty } = this.props; // Destructure notification status from props
    if (noty === true) {
      return; // If there's a notification, don't start the interval
    }
    // Set an interval to update the time every 60 seconds
    this.stateId = setInterval(() => {
      this.setState({ time: this.getCurrentTime() });
    }, 60000);
  }

  // This method is called when the component updates.
  // It checks if there's a new notification and sets it to disappear after 1 second.
  componentDidUpdate() {
    const { setNoty, noty } = this.props; // Destructure props for notification management
    if (noty === true) {
      setTimeout(function () {
        setNoty(); // Clear the notification after 1 second
      }, 1000);
    }
  }

  // This method is called before the component is unmounted.
  // It clears the time update interval to prevent memory leaks.
  componentWillUnmount() {
    const { noty } = this.props;
    if (noty !== true) clearInterval(this.stateId);
  }

  // Utility function to get the current time as a string.
  getCurrentTime() {
    const today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    // Add a leading zero to the minutes if less than 10 for formatting
    if (today.getMinutes() < 10) {
      time = today.getHours() + ":0" + today.getMinutes();
    }
    return time;
  }

  // Render the navbar, showing the iPod logo, time, or notifications based on state and props.
  render() {
    const { time } = this.state; // Destructure time from state
    const { noty, notifyText } = this.props; // Destructure props for display and notification management
    return (
      <div className="bar">
        {<h5 className="heading">iPod</h5>} {/* Display the iPod logo */}
        {noty === true && <h5 className="notification">{notifyText}</h5>}{" "}
        {/* Display notification if it exists */}
        {noty === false && <h3 className="time">{time}</h3>}{" "}
        {/* Display current time if no notification */}
        <div className="right-container-nav">
          {/* Display battery icon on the right side of the navbar */}
          {/* Uncomment the code below to display play/pause icon based on playing status */}
          {/* {playing ? <h5 className="play-pause-nav"><i className="fas fa-play"></i></h5> : <h5 className="play-pause-nav"><i className="fas fa-pause"></i> </h5>} */}
          <img className="battery" src={BatImg} alt="Battery" />{" "}
          {/* Battery icon */}
        </div>
      </div>
    );
  }
}

export default Navbar; // Export the Navbar component for use in other parts of the application
