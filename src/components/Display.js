import React from "react";
// Import various components used within the Display component
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import Music from "../components/Music";
import Songs from "../components/Songs";
import Settings from "./settings";
import Playing from "../components/Playing";
import "../css/Display.css"; // Import CSS for styling the display
import Themes from "./Themes";
import WheelColor from "./WheelColor";
import LockScreen from "./LockScreen";
import Wallpaper from "./Wallpaper";

// The Display component renders different components based on the current menu.
// It also displays the navigation bar at the top.
// Key for displaying menu components:
// -2: Lock screen
// -1: Main menu
// 0: Now playing screen
// 1: Music menu
// 2, 5, 6: Dummy menus (e.g., Games, Artists, Albums)
// 3: Settings menu
// 4: Songs menu
// 7: Music playing screen (similar to Now playing)
// 8: Themes menu
// 9: Wheel color menu
// 10: Wallpaper menu

class Display extends React.Component {
  render() {
    // Destructure the props received from the parent component (Case)
    const {
      active, // Index of the active item in the current menu
      currentMenu, // ID of the currently displayed menu
      menuItems, // List of main menu items
      musicItems, // List of Music menu items
      songItems, // List of song titles
      playing, // Boolean to track if a song is currently playing
      songIndex, // Index of the currently playing song
      audio, // Audio object for the current song
      songUrl, // URL of the currently playing song
      songImgUrl, // URL of the cover image for the currently playing song
      wallpaper, // Index of the current wallpaper
      wallpaperItems, // Array of available wallpaper images
      noty, // Boolean to show or hide notifications
      setNoty, // Function to reset the notification state
      notifyText, // Text to display in the notification
    } = this.props;

    return (
      // Set the background image of the display based on the selected wallpaper
      <div
        style={{ backgroundImage: `url(${wallpaperItems[wallpaper]})` }}
        className="display"
      >
        {/* Render the Navbar component with relevant props for notifications */}
        <Navbar
          noty={noty}
          setNoty={setNoty}
          playing={playing}
          notifyText={notifyText}
        />
        {/* Render the appropriate component based on the currentMenu value */}
        {currentMenu === -2 && <LockScreen />}{" "}
        {/* Render LockScreen if currentMenu is -2 */}
        {currentMenu === -1 && (
          <Menu songImgUrl={songImgUrl} menuItems={menuItems} active={active} />
        )}{" "}
        {/* Render Main Menu */}
        {currentMenu === 1 && (
          <Music musicItems={musicItems} active={active} />
        )}{" "}
        {/* Render Music Menu */}
        {currentMenu === 2 && (
          <div className="blank-div">
            <h1 className="empty-text">Games</h1>
          </div>
        )}{" "}
        {/* Render placeholder for Games */}
        {currentMenu === 3 && <Settings active={active} />}{" "}
        {/* Render Settings Menu */}
        {currentMenu === 4 && (
          <Songs songItems={songItems} active={active} />
        )}{" "}
        {/* Render Songs Menu */}
        {currentMenu === 5 && (
          <div className="blank-div">
            <h1 className="empty-text">Artists</h1>
          </div>
        )}{" "}
        {/* Render placeholder for Artists */}
        {currentMenu === 6 && (
          <div className="blank-div">
            <h1 className="empty-text">Albums</h1>
          </div>
        )}{" "}
        {/* Render placeholder for Albums */}
        {(currentMenu === 0 || currentMenu === 7) && (
          <Playing
            songImgUrl={songImgUrl}
            audio={audio}
            songUrl={songUrl}
            playing={playing}
            songIndex={songIndex}
            songItems={songItems}
          />
        )}{" "}
        {/* Render Now Playing or Music Playing screen */}
        {currentMenu === 8 && <Themes active={active} />}{" "}
        {/* Render Themes Menu */}
        {currentMenu === 9 && <WheelColor active={active} />}{" "}
        {/* Render Wheel Color Menu */}
        {currentMenu === 10 && <Wallpaper active={active} />}{" "}
        {/* Render Wallpaper Menu */}
      </div>
    );
  }
}

export default Display;
