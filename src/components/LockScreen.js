import React from "react"; // Import React to create the component

// The LockScreen component is responsible for rendering the lock screen UI.
// It informs the user that the device is locked and provides a prompt to unlock it.
class LockScreen extends React.Component {
  render() {
    return (
      <div>
        {/* This div contains the lock icon, indicating that the screen is locked */}
        <div className="lock-display">
          {/* Font Awesome lock icon to visually represent the locked state */}
          <i className="fa fa-lock" aria-hidden="true"></i>
        </div>

        {/* This div contains the text prompt that instructs the user on how to unlock the screen */}
        <div className="bottom-div-lock">
          <h3>Press Centre Button to unlock!</h3>
        </div>
      </div>
    );
  }
}

export default LockScreen; // Export the LockScreen component for use in other parts of the application
