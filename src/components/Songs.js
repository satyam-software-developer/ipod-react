import React from "react"; // Import React to create the component

// The Songs component renders a list of song items.
// It highlights the currently active song based on the `active` prop.

class Songs extends React.Component {
  render() {
    const { songItems, active } = this.props; // Destructure songItems and active index from props

    return (
      <div className="music">
        <h3>Songs</h3> {/* Display the title of the songs menu */}
        <ul>
          {/* Map through songItems to create a list of songs */}
          {songItems.map((element, index) => {
            // Conditionally apply the "active" class based on the value of `active`
            return active === index ? (
              <li key={index} className="active">
                &nbsp;{element}
              </li> // Highlight the active song
            ) : (
              <li id="song1" key={index}>
                &nbsp;{element}
              </li>
            ); // Render other songs normally
          })}
        </ul>
      </div>
    );
  }
}

export default Songs; // Export the Songs component for use in other parts of the application
