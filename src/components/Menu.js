import React from "react"; // Import React to create the component
import "../css/Menu.css"; // Import the CSS file for styling the Menu component
import game from "../static/game.jpg"; // Import the image used for the "Game" menu item
import music from "../static/music.jpg"; // Import the image used for the "Music" menu item
import settings from "../static/settings.png"; // Import the image used for the "Settings" menu item

// The Menu component renders the main menu of the application.
// It displays a list of menu items and a corresponding image based on the active menu item.
class Menu extends React.Component {
  render() {
    // Destructure the props passed to the component
    const { active, menuItems, songImgUrl } = this.props;

    return (
      <div className="menu-container">
        {/* The menu section where the list of menu items is rendered */}
        <div className="menu">
          <ul>
            {/* Map over the menuItems array to create a list item for each menu item */}
            {menuItems.map((element, index) => {
              // Highlight the currently active menu item by adding a specific class
              return active === index ? (
                <li key={index} className="active">
                  &nbsp;{element} {/* Display the menu item name */}
                </li>
              ) : (
                <li key={index}>&nbsp;{element}</li> // Display other menu items without highlighting
              );
            })}
          </ul>
        </div>

        {/* The leaf section displays a corresponding image based on the active menu item */}
        <div className="leaf">
          {/* Display the image corresponding to the currently active menu item */}
          {active === 0 && (
            <img className="leaf-img" src={songImgUrl} alt=""></img>
          )}
          {active === 1 && <img className="leaf-img" src={music} alt=""></img>}
          {active === 2 && <img className="leaf-img" src={game} alt=""></img>}
          {active === 3 && (
            <img className="leaf-img" src={settings} alt=""></img>
          )}
        </div>
      </div>
    );
  }
}

export default Menu; // Export the Menu component for use in other parts of the application
