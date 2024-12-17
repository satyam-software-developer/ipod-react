import React from "react";
import "../css/KnowMore.css"; // Import CSS for styling the KnowMore component

// The KnowMore component renders a menu that provides information about the controls and usage instructions.
// It has a button to toggle the visibility of this information.

class KnowMore extends React.Component {
  constructor() {
    super();
    // Initialize component state with a boolean indicating whether the information div is open or closed
    this.state = {
      divOpen: false, // Initially, the information div is closed
    };
  }

  // Method to toggle the visibility of the information div
  openDiv = () => {
    // If divOpen is true, set it to false, otherwise set it to true
    if (this.state.divOpen === true)
      this.setState({ divOpen: false }); // Close the information div
    else this.setState({ divOpen: true }); // Open the information div
  };

  render() {
    // Destructure the divOpen state variable
    const { divOpen } = this.state;

    // Set CSS properties based on whether the div is open or closed
    let cssProp;
    if (divOpen === false) {
      cssProp = { top: "-542px" }; // When closed, move the div off-screen (upwards)
    } else {
      cssProp = { top: "0px" }; // When open, bring the div on-screen
    }

    return (
      // Apply the dynamic CSS to the container div
      <div style={cssProp} className="information-container">
        <div className="info-div">
          {/* Header and instructions about the controls */}
          <h3>Controls</h3>
          <p>
            1. To unlock the screen, press the center button. To lock the
            screen, press the menu button in the main menu.
          </p>
          <p>
            2. To play or pause music in any menu, press the play/pause button
            at the bottom.
          </p>
          <p>
            3. Short pressing on forward/reverse will take you to the
            next/previous track (ONLY WHILE PLAYING).
          </p>
          <p>
            4. Long pressing on forward/reverse will seek the song
            forward/reverse (ONLY WHILE PLAYING).
          </p>
          <p>5. To navigate between menu items, rotate on the track wheel.</p>
          <p>
            6. To go to the next menu or enter a menu, press the center button.
            To go to the previous menu, press the menu button.
          </p>
          <p>7. Songs do play; please check out the settings menu.</p>
          <p>Credits: Apple, Flaticon</p>{" "}
          {/* Credits for icons and design inspiration */}
        </div>
        {/* Button to toggle the visibility of the information div */}
        <button id="info-btn" onClick={this.openDiv}>
          Know More
        </button>
      </div>
    );
  }
}

export default KnowMore;
