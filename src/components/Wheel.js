import React from "react"; // Import React to use its component system
import "../css/Wheel.css"; // Import CSS for styling the wheel component
import ZingTouch from "zingtouch"; // Import ZingTouch for handling touch gestures
import { BsFillPlayFill } from "react-icons/bs"; // Import play icon from react-icons
import { BiPause } from "react-icons/bi"; // Import pause icon from react-icons
import { AiOutlineForward, AiOutlineBackward } from "react-icons/ai"; // Import forward and backward icons from react-icons

// Renders the control wheel component with various controls and gesture handling
class Wheel extends React.Component {
  constructor() {
    super();
    this.angle = 0; // Initialize angle for rotation control
  }

  // Render method to display the wheel and its controls
  render() {
    const { changeMenuForward, active, currentMenu, theme, wheelColor } =
      this.props; // Destructure props for use in the render method

    return (
      <div className="wheel-container" id="wheel-container">
        <div
          style={{ backgroundColor: wheelColor }}
          className="wheel"
          id="wheel"
        >
          <div className="controll" id="menu">
            <div style={{ color: theme }}>MENU</div> {/* Menu control */}
          </div>
          <div className="controll" id="forward">
            <AiOutlineForward style={{ color: theme }} />{" "}
            {/* Forward control icon */}
          </div>
          <div className="controll" id="play-pause">
            <div>
              <BsFillPlayFill style={{ color: theme }} />{" "}
              {/* Play control icon */}
              <BiPause style={{ color: theme }} /> {/* Pause control icon */}
            </div>
          </div>
          <div className="controll" id="reverse">
            <AiOutlineBackward style={{ color: theme }} />{" "}
            {/* Reverse control icon */}
          </div>
        </div>

        <div
          style={{ backgroundColor: theme }}
          className="blank"
          id="blank"
          onClick={() => {
            changeMenuForward(active, currentMenu);
          }} // Handle click to change menu
        ></div>
      </div>
    );
  }

  // Function to control wheel rotation and update active menu item
  wheelControll = (e) => {
    const { updateActiveMenu, currentMenu } = this.props; // Destructure props for use in the function

    if (e.detail.distanceFromOrigin === 0) {
      this.angle = e.detail.angle; // Set initial angle when wheel starts rotating
    }
    if (Math.abs(this.angle - e.detail.angle) > 300) {
      this.angle = Math.abs(e.detail.angle);
      if (e.detail.distanceFromLast === 0) {
        return;
      } else if (e.detail.distanceFromLast < 0) {
        updateActiveMenu(1, currentMenu); // Rotate wheel forward
      } else {
        updateActiveMenu(0, currentMenu); // Rotate wheel backward
      }
    } else if (Math.abs(this.angle - e.detail.angle) > 15) {
      this.angle = Math.abs(e.detail.angle);
      if (e.detail.distanceFromLast === 0) {
        return;
      } else if (e.detail.distanceFromLast > 0) {
        updateActiveMenu(1, currentMenu); // Rotate wheel forward
      } else {
        updateActiveMenu(0, currentMenu); // Rotate wheel backward
      }
    }
  };

  // Set up ZingTouch for gesture handling when the component mounts
  componentDidMount() {
    const {
      changeMenuBackward,
      togglePlayPause,
      seekSongForward,
      seekSongReverse,
    } = this.props; // Destructure props for use in the component

    const wheelControll = this.wheelControll; // Reference to the wheel control function
    const wheel = document.getElementById("wheel"); // Get the wheel element
    const activeRegion = ZingTouch.Region(wheel); // Create a new ZingTouch region for the wheel
    const menuIcon = document.getElementById("menu"); // Get the menu icon element
    const playPause = document.getElementById("play-pause"); // Get the play/pause icon element
    const reverse = document.getElementById("reverse"); // Get the reverse icon element
    const forward = document.getElementById("forward"); // Get the forward icon element

    // Define a long tap gesture for seeking songs
    const longTapGesture = new ZingTouch.Tap({
      maxDelay: 10000,
      numInputs: 1,
      tolerance: 1,
    });

    // Bind various gestures and actions to the ZingTouch region
    activeRegion.bind(menuIcon, "tap", function (e) {
      changeMenuBackward(); // Handle menu icon tap
    });
    activeRegion.bind(wheel, "rotate", function (e) {
      wheelControll(e); // Handle wheel rotation
    });
    activeRegion.bind(playPause, "tap", function (e) {
      togglePlayPause(); // Handle play/pause icon tap
    });
    activeRegion.bind(reverse, longTapGesture, function (e) {
      seekSongReverse(e); // Handle long tap on reverse icon
    });
    activeRegion.bind(forward, longTapGesture, function (e) {
      seekSongForward(e); // Handle long tap on forward icon
    });
  }
}

export default Wheel; // Export the Wheel component for use in other parts of the application
