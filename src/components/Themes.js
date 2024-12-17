import React from "react"; // Import React to use its component system
import "../css/Themes.css"; // Import CSS for styling the Themes component

// The Themes component renders a list of available themes for selection.
// It highlights the currently selected theme based on the `active` prop.

class Themes extends React.Component {
  render() {
    const { active } = this.props; // Destructure the `active` index from props

    return (
      <div className="music">
        {" "}
        {/* Container for the themes menu */}
        <h2>Theme Select</h2> {/* Title of the themes menu */}
        <ul>
          {/* Map through an array of theme names to create a list */}
          {["Snow White", "Black", "USC Gold", "Space Gray", "Pearl"].map(
            (element, index) => {
              // Conditionally apply the "active" class based on the value of `active`
              return active === index ? (
                <li key={index} className="active theme-li">
                  {element}
                </li> // Highlight the selected theme
              ) : (
                <li className="theme-li" key={index}>
                  {element}{" "}
                </li>
              ); // Render other themes normally
            }
          )}
        </ul>
      </div>
    );
  }
}

export default Themes; // Export the Themes component for use in other parts of the application
