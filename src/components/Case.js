import React from "react";
// Import CSS file for styling the iPod case
import "../css/Case.css";
// Import the Wheel component that handles user interaction
import Wheel from "./Wheel.js";
// Import the Display component that shows the content on the screen
import Display from "./Display.js";

// This component represents the outer case of the iPod, including the display and the wheel.
// It doesn't perform any special logic itself but renders the Display and Wheel components.
class Case extends React.Component {
  render() {
    // Destructure the props received from the parent component (App)
    const {
      active, // Index of the active item in the current menu
      updateActiveMenu, // Function to update the active menu item when rotating the wheel
      currentMenu, // ID of the currently displayed menu
      changeMenuBackward, // Function to navigate back to the previous menu
      changeMenuForward, // Function to navigate forward to the selected menu
      menuItems, // List of main menu items
      musicItems, // List of Music menu items
      togglePlayPause, // Function to toggle between play and pause states
      songItems, // List of song titles
      playing, // Boolean to track if a song is currently playing
      songIndex, // Index of the currently playing song
      theme, // Current theme color for the iPod body
      audio, // Audio object for the current song
      songUrl, // URL of the currently playing song
      songImgUrl, // URL of the cover image for the currently playing song
      seekSongForward, // Function to seek forward within the current song
      seekSongReverse, // Function to seek backward within the current song
      wheelColor, // Color of the track wheel
      wallpaper, // Index of the current wallpaper
      wallpaperItems, // Array of available wallpaper images
      noty, // Boolean to show or hide notifications
      setNoty, // Function to reset the notification state
      notifyText, // Text to display in the notification
    } = this.props;

    return (
      <div className="case-container">
        {/* Outer case of the iPod with a dynamic background color based on the selected theme */}
        <div style={{ backgroundColor: theme }} className="case">
          {/* Render the Display component with the relevant props */}
          <Display
            songIndex={songIndex}
            playing={playing}
            active={active}
            musicItems={musicItems}
            menuItems={menuItems}
            currentMenu={currentMenu}
            songItems={songItems}
            audio={audio}
            songUrl={songUrl}
            songImgUrl={songImgUrl}
            wallpaper={wallpaper}
            wallpaperItems={wallpaperItems}
            noty={noty}
            setNoty={setNoty}
            notifyText={notifyText}
          />
          {/* Render the Wheel component with the relevant props */}
          <Wheel
            theme={theme}
            active={active}
            menuItems={menuItems}
            currentMenu={currentMenu}
            changeMenuForward={changeMenuForward}
            changeMenuBackward={changeMenuBackward}
            updateActiveMenu={updateActiveMenu}
            togglePlayPause={togglePlayPause}
            seekSongForward={seekSongForward}
            seekSongReverse={seekSongReverse}
            wheelColor={wheelColor}
          />
        </div>
      </div>
    );
  }
}

export default Case;
