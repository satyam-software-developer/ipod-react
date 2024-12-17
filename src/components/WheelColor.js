import React from "react"; // Import React to create the React component
import "../css/Themes.css"; // Import CSS for styling the WheelColor component

// Renders wheel color change menu
class WheelColor extends React.Component {
  render() {
    const { active } = this.props; // Destructure `active` from props to determine the active item

    return (
      <div className="music">
        {" "}
        {/* Container for the wheel color selection menu */}
        <h2>Wheel Color Select</h2>{" "}
        {/* Heading for the wheel color selection menu */}
        <ul>
          {" "}
          {/* List of wheel color options */}
          {["Black", "White", "Brown"].map((element, index) => {
            return active === index ? (
              <li key={index} className="active theme-li">
                {element}
              </li> // Highlight active color option
            ) : (
              <li className="theme-li" key={index}>
                {element}
              </li> // Regular color option
            );
          })}
        </ul>
      </div>
    );
  }
}

export default WheelColor; // Export the WheelColor component for use in other parts of the application
