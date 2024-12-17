import React from "react";

// Import CSS file for styling the app
import "../css/App.css";
// Import the iPod body component
import Case from "./Case.js";
// Import songs (commented out another import that might be related to additional functionality)
// import KnowMore from './KnowMore.js';
// Import song files
import song1 from "../static/songs/Post Malone - White Iverson.mp3";
import song2 from "../static/songs/John Denver - Country Roads.mp3";
import song3 from "../static/songs/Sigrid - High Five.mp3";
import song4 from "../static/songs/Khalid - Young Dumb Broke.mp3";
import song5 from "../static/songs/Rick Astley - Never Gonna Give You Up.mp3";

// Import song cover images
import song1Img from "../static/Post Malone - White Iverson.png";
import song2Img from "../static/John Denver - Country Roads.jpg";
import song3Img from "../static/Sigrid - High Five.png";
import song4Img from "../static/Khalid - Young Dumb Broke.jpg";
import song5Img from "../static/Never Gonna Give You Up.png";

// Import wallpapers for the iPod
import Wallpaper1 from "../static/wallpaper1.jpg";
import Wallpaper2 from "../static/wallpaper2.jpg";
import Wallpaper3 from "../static/wallpaper3.jpg";

// Create the main App component
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 0, // Active list item in the current menu
      menuItems: ["Now Playing", "Music", "Games", "Settings"], // Main menu items
      musicItems: ["All Songs", "Artist", "Albums"], // Items in the Music submenu
      songItemsUrl: [song1, song2, song3, song4, song5], // Array of song file URLs
      songImgItemsUrl: [song1Img, song2Img, song3Img, song4Img, song5Img], // Array of song cover image URLs
      wallpaperItems: [Wallpaper1, Wallpaper2, Wallpaper3], // Array of wallpaper images
      songItems: [
        "Post Malone - White Iverson",
        "John Denver - Country Roads",
        "Sigrid Raabe - High Five",
        "Khalid - Young Dumb Broke",
        "Rick Astley - Never Gonna Give You Up",
      ], // Array of song titles
      songIndex: 0, // Index of the currently playing song
      lengthMenuKey: { "-1": 3, 1: 2, 4: 4, 8: 4, 3: 2, 9: 3, 10: 2 }, // Mapping of menu ID to the number of items in that menu
      menuMapping: { "-1": [0, 1, 2, 3], 1: [4, 5, 6], 3: [8, 9, 10] }, // Mapping of parent menu ID to submenu IDs
      currentMenu: -2, // ID of the current menu (initially the lock screen)
      navigationStack: [], // Stack to keep track of menu navigation (for back and forward actions)
      songUrl: song1, // URL of the currently playing song
      playing: false, // Boolean to track if a song is currently playing
      theme: "rgb(210, 210, 210)", // Current theme color for the iPod body
      audio: new Audio(song1), // Audio object for the current song
      songImgUrl: song1Img, // URL of the cover image for the currently playing song
      wheelColor: "white", // Color of the track wheel
      wallpaper: 0, // Index of the current wallpaper
      noty: false, // Boolean to show or hide notifications
      notifyText: "Wallpaper Changed", // Text to display in the notification
    };
  }

  // FUNCTION FOR: Seeking the current song forward when the forward button is long-pressed
  seekSongForward = (e) => {
    // If the current menu is the lock screen or the song is not playing, do nothing
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === false) {
      return;
    }
    // If the button press was short, skip to the next song
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === this.state.songItemsUrl.length - 1) {
        songIndex = 0; // Loop back to the first song if at the end of the list
      } else {
        songIndex++;
      }
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState(
        {
          songIndex: songIndex,
          songImgUrl: songImgUrl,
          songUrl: songUrl,
          audio: new Audio(songUrl),
        },
        () => {
          this.state.audio.play();
        }
      );
      // If the button press was longer, fast forward within the current song
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime += interval;
        return prevState;
      });
    }
  };

  // FUNCTION FOR: Seeking the current song backward when the backward button is long-pressed
  seekSongReverse = (e) => {
    // If the current menu is the lock screen or the song is not playing, do nothing
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === false) {
      return;
    }
    // If the button press was short, skip to the previous song
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === 0) {
        songIndex = this.state.songItemsUrl.length - 1; // Loop back to the last song if at the beginning of the list
      } else {
        songIndex--;
      }
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState(
        {
          songIndex: songIndex,
          songImgUrl: songImgUrl,
          songUrl: songUrl,
          audio: new Audio(songUrl),
        },
        () => {
          this.state.audio.play();
        }
      );
      // If the button press was longer, rewind within the current song
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime -= interval;
        return prevState;
      });
    }
  };

  // FUNCTION FOR: Toggle between play and pause states
  togglePlayPause = () => {
    // If the current menu is the lock screen, do nothing
    if (this.state.currentMenu === -2) {
      return;
    }
    // If the song is playing, pause it; otherwise, play it
    if (this.state.playing === true) {
      this.setState({ playing: false });
      this.state.audio.pause();
    } else {
      this.setState({ playing: true });
      this.state.audio.play();
    }
  };

  // FUNCTION FOR: Update the active menu item while rotating on the track-wheel
  updateActiveMenu = (direction, menu) => {
    // If the menu ID is not valid, do nothing
    if (
      menu !== -1 &&
      menu !== 1 &&
      menu !== 4 &&
      menu !== 8 &&
      menu !== 3 &&
      menu !== 9 &&
      menu !== 10
    ) {
      return;
    }
    let min = 0;
    let max = 0;

    // Determine the number of items in the current menu
    max = this.state.lengthMenuKey[menu];

    // Update the active menu item based on the rotation direction
    if (direction === 1) {
      if (this.state.active >= max) {
        this.setState({ active: min });
      } else {
        this.setState({ active: this.state.active + 1 });
      }
    } else {
      if (this.state.active <= min) {
        this.setState({ active: max });
      } else {
        this.setState({ active: this.state.active - 1 });
      }
    }
  };

  // FUNCTION FOR: Change the theme of the iPod body
  setTheme = (id) => {
    let theme = "";
    // Set the theme color based on the provided ID
    if (id === 0) {
      theme = "#f0f0f0";
    } else if (id === 1) {
      theme = "#555d50"; //black
    } else if (id === 2) {
      theme = "#ffcc00";
    } else if (id === 3) {
      theme = "#D1CDDA";
    } else if (id === 4) {
      theme = "#c4aead";
    }
    this.setState({ theme: theme, noty: true, notifyText: "Theme Changed" }); // Show notification for theme change
    return;
  };

  // FUNCTION FOR: Change the color of the track wheel
  setWheelColor = (id) => {
    let wheelColor = "";
    // Set the wheel color based on the provided ID
    if (id === 0) {
      wheelColor = "#212121";
    } else if (id === 1) {
      wheelColor = "white";
    } else if (id === 2) {
      wheelColor = "#3E2723";
    } else if (id === 3) {
      wheelColor = "#3D5AFE";
    }
    this.setState({
      wheelColor: wheelColor,
      noty: true,
      notifyText: "Wheel Color Changed",
    }); // Show notification for wheel color change
    return;
  };

  // FUNCTION FOR: Set the wallpaper of the iPod body
  setWallpaper = (id) => {
    this.setState({
      wallpaper: id,
      noty: true,
      notifyText: "Wallpaper Changed",
    }); // Show notification for wallpaper change
    return;
  };

  // FUNCTION FOR: Change the currently playing song from the Music menu
  chagePlayingSongFromMusicMenu = (id, navigationStack) => {
    const songUrl = this.state.songItemsUrl[id];
    const songImgUrl = this.state.songImgItemsUrl[id];
    this.state.audio.pause(); // Pause the current song
    this.setState(
      {
        currentMenu: 7,
        songUrl: songUrl,
        navigationStack: navigationStack,
        active: 0,
        playing: true,
        songIndex: id,
        audio: new Audio(songUrl),
        songImgUrl: songImgUrl,
      },
      () => {
        this.state.audio.play(); // Play the selected song
      }
    );
    return;
  };

  // FUNCTION FOR: Navigate back to the previous menu on pressing the center button
  changeMenuBackward = () => {
    const navigationStack = this.state.navigationStack.slice();
    // If the current menu is the lock screen, do nothing
    if (this.state.currentMenu === -2) {
      return;
    } else {
      // Pop the last menu from the navigation stack and set it as the current menu
      const prevId = navigationStack.pop();
      this.setState({
        currentMenu: prevId,
        navigationStack: navigationStack,
        active: 0,
      });
      return;
    }
  };

  // FUNCTION FOR: Navigate forward to a selected menu on pressing the center button
  changeMenuForward = (id, fromMenu) => {
    const navigationStack = this.state.navigationStack.slice();

    // If the menu ID is not valid, do nothing
    if (
      fromMenu !== -2 &&
      fromMenu !== -1 &&
      fromMenu !== 1 &&
      fromMenu !== 4 &&
      fromMenu !== 3 &&
      fromMenu !== 8 &&
      fromMenu !== 9 &&
      fromMenu !== 0 &&
      fromMenu !== 7 &&
      fromMenu !== 10
    ) {
      return;
    }

    // Handle lock screen to home screen navigation
    if (fromMenu === -2) {
      navigationStack.push(this.state.currentMenu);
      this.setState({
        currentMenu: -1,
        navigationStack: navigationStack,
        active: 0,
      });
      return;
    }

    // Handle home screen to a submenu navigation
    if (fromMenu === -1) {
      navigationStack.push(this.state.currentMenu);
      this.setState({
        currentMenu: id,
        navigationStack: navigationStack,
        active: 0,
      });
      return;
    }

    // Handle play/pause toggle
    if (fromMenu === 7 || fromMenu === 0) {
      this.togglePlayPause();
      return;
    }

    // Handle theme change
    if (fromMenu === 8) {
      this.setTheme(id);
      return;
    }

    // Handle wheel color change
    if (fromMenu === 9) {
      this.setWheelColor(id);
      return;
    }

    // Handle wallpaper change
    if (fromMenu === 10) {
      this.setWallpaper(id);
      return;
    }

    // Handle navigation within the Music menu
    navigationStack.push(this.state.currentMenu);

    if (fromMenu === 4) {
      this.chagePlayingSongFromMusicMenu(id, navigationStack, fromMenu);
      return;
    }

    // Update the current menu based on the selected option
    const currentMenuID = this.state.menuMapping[fromMenu][id];
    this.setState({
      currentMenu: currentMenuID,
      navigationStack: navigationStack,
      active: 0,
    });
  };

  // FUNCTION FOR: Set the notification state to false after showing a notification
  setNoty = () => {
    this.setState({ noty: false });
    return;
  };

  // FUNCTION FOR: Rendering the App component
  render() {
    // Destructuring state variables for use in rendering
    const {
      audio,
      active,
      currentMenu,
      menuItems,
      musicItems,
      songItems,
      playing,
      songIndex,
      theme,
      songUrl,
      songImgUrl,
      wheelColor,
      wallpaper,
      wallpaperItems,
      noty,
      notifyText,
    } = this.state;
    return (
      <div className="App">
        {/* Rendering the iPod body component with various props */}
        <Case
          songIndex={songIndex}
          active={active}
          menuItems={menuItems}
          musicItems={musicItems}
          currentMenu={currentMenu}
          changeMenuForward={this.changeMenuForward}
          changeMenuBackward={this.changeMenuBackward}
          updateActiveMenu={this.updateActiveMenu}
          togglePlayPause={this.togglePlayPause}
          songItems={songItems}
          playing={playing}
          theme={theme}
          audio={audio}
          songUrl={songUrl}
          songImgUrl={songImgUrl}
          seekSongForward={this.seekSongForward}
          seekSongReverse={this.seekSongReverse}
          wheelColor={wheelColor}
          wallpaper={wallpaper}
          wallpaperItems={wallpaperItems}
          noty={noty}
          setNoty={this.setNoty}
          notifyText={notifyText}
        />
      </div>
    );
  }
}

export default App;
