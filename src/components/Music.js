import React from "react"; // Import React to create the component
import "../css/Music.css"; // Import the CSS file for styling the Music component

// The Music component renders the music menu of the application.
// It displays a list of music-related items and highlights the currently active item.
class Music extends React.Component {
  render() {
    // Destructure the props passed to the component
    const { musicItems, active } = this.props;

    return (
      <div className="music">
        {/* Header for the music menu */}
        <h3>Music</h3>
        {/* List of music items */}
        <ul>
          {/* Map over the musicItems array to create a list item for each music menu item */}
          {musicItems.map((element, index) => {
            // Highlight the currently active music item by adding a specific class
            return active === index ? (
              <li key={index} className="active">
                &nbsp;{element} {/* Display the music item name */}
              </li>
            ) : (
              <li key={index}>&nbsp;{element}</li> // Display other music items without highlighting
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Music; // Export the Music component for use in other parts of the application
