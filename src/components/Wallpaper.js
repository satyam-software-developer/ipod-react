import React from "react"; // Import React to use its component system

// The Wallpaper component renders a list of available wallpapers for selection.
// It highlights the currently selected wallpaper based on the `active` prop.

class Wallpaper extends React.Component {
  render() {
    const { active } = this.props; // Destructure the `active` index from props

    return (
      <div className="music">
        {" "}
        {/* Container for the wallpaper menu */}
        <h2>Wallpaper Select</h2> {/* Title of the wallpaper selection menu */}
        <ul>
          {/* Map through an array of wallpaper names to create a list */}
          {["Wallpaper 1", "Wallpaper 2", "Wallpaper 3"].map(
            (element, index) => {
              // Conditionally apply the "active" class based on the value of `active`
              return active === index ? (
                <li key={index} className="active theme-li">
                  {element}
                </li> // Highlight the selected wallpaper
              ) : (
                <li className="theme-li" key={index}>
                  {element}
                </li>
              ); // Render other wallpapers normally
            }
          )}
        </ul>
      </div>
    );
  }
}

export default Wallpaper; // Export the Wallpaper component for use in other parts of the application
