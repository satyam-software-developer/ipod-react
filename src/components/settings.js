import React from "react"; // Import React to create the component
import "../css/Settings.css"; // Import the CSS file for styling the Settings component

// The Settings component renders a menu with different settings options.
// It highlights the currently active option based on the `active` prop.

class Settings extends React.Component {
  render() {
    const { active } = this.props; // Destructure the active index from props

    return (
      <div className="settings">
        <h2>Settings</h2> {/* Display the title of the settings menu */}
        <ul>
          {/* Conditionally apply the "active" class based on the value of `active` */}
          {active === 0 ? <li className="active">Themes</li> : <li>Themes</li>}
          {active === 1 ? (
            <li className="active">Wheel Color</li>
          ) : (
            <li>Wheel Color</li>
          )}
          {active === 2 ? (
            <li className="active">Wallpaper</li>
          ) : (
            <li>Wallpaper</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Settings; // Export the Settings component for use in other parts of the application
