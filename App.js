// import React from "react";
// import AudioApp from "./src/components/AudioApp";
// import { Provider } from "react-redux";
// import configureStore from "./store/configureStore";

// const store = configureStore();
// const App = () => {
//   return (
//     <Provider store={store}>
//       <AudioApp />
//     </Provider>
//   );
// };

// export default App;

import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

const audioBookPlaylist = [
  {
    title: "12 Variations for Cello and Piano",
    author: "Ludwig van Beethoven",
    source: "Played by: Reiner Hochmuth",
    uri: "./assets/audio/Beethoven.mp3",
    imageSource: "./assets/image/Beethoven.jpg",
  },
  {
    title: "Nocturne",
    author: "Pyotr Tchaikovsky",
    source: "Played by: Reiner Hochmuth",
    uri: "./assets/audio/Tchaikovsky.mp3",
    imageSource: "./assets/image/Tchaikovsky.jpg",
  },
  {
    title: "Prayer",
    author: "Ernest Bloch",
    source: "Played by: Reiner Hochmuth",
    uri: "./assets/audio/Bloch.mp3",
    imageSource: "./assets/image/Bloch.jpg",
  },
];

export default class App extends React.Component {
  state = {
    isPlaying: false,
    playbackInstance: null,
    currentIndex: 0,
    volume: 1.0,
    isBuffering: false,
  };
  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state;
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();

    this.setState({
      isPlaying: !isPlaying,
    });
  };

  handlePreviousTrack = async () => {
    let { playbackInstance, currentIndex } = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      currentIndex < audioBookPlaylist.length - 1
        ? (currentIndex -= 1)
        : (currentIndex = 0);
      this.setState({
        currentIndex,
      });
      this.loadAudio();
    }
  };

  handleNextTrack = async () => {
    let { playbackInstance, currentIndex } = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      currentIndex < audioBookPlaylist.length - 1
        ? (currentIndex += 1)
        : (currentIndex = 0);
      this.setState({
        currentIndex,
      });
      this.loadAudio();
    }
  };

  async componentDidMount() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true,
      });

      this.loadAudio();
    } catch (e) {
      console.log(e);
    }
  }

  async loadAudio() {
    const { currentIndex, isPlaying, volume } = this.state;

    const playbackInstance = new Audio.Sound();
    const source = {
      uri: audioBookPlaylist[currentIndex].uri,
    };

    console.log(audioBookPlaylist[currentIndex].uri)

    const status = {
      shouldPlay: isPlaying,
      volume,
    };
    try {
      playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(
        require("./assets/audio/Bloch.mp3"),
        status,
        false
      );
      this.setState({ playbackInstance });
    } catch (e) {
      console.log(e);
    }
  }

  onPlaybackStatusUpdate = (status) => {
    this.setState({
      isBuffering: status.isBuffering,
    });
  };

  renderFileInfo() {
    const { playbackInstance, currentIndex } = this.state;
    return playbackInstance ? (
      <View style={styles.trackInfo}>
        <Text style={[styles.trackInfoText, styles.largeText]}>
          {audioBookPlaylist[currentIndex].title}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {audioBookPlaylist[currentIndex].author}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {audioBookPlaylist[currentIndex].source}
        </Text>
      </View>
    ) : null;
  }

  render() {
    const { playbackInstance, currentIndex } = this.state;
    const image = "./assets/image/Beethoven.jpg";
    // const sdf = audioBookPlaylist[0].imageSource.toString();
    // console.log(sdf, image, sdf === image);

    return (
      <View style={styles.container}>
        <Image style={styles.albumCover} source={require(image)} />
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handlePreviousTrack}
          >
            <Ionicons name="ios-skip-backward" size={48} color="#444" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handlePlayPause}
          >
            {this.state.isPlaying ? (
              <Ionicons name="ios-pause" size={48} color="#444" />
            ) : (
              <Ionicons name="ios-play-circle" size={48} color="#444" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handleNextTrack}
          >
            <Ionicons name="ios-skip-forward" size={48} color="#444" />
          </TouchableOpacity>
        </View>
        {this.renderFileInfo()}
      </View>
    );
  }
}

// update the Stylesheet object
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  albumCover: {
    width: 250,
    height: 250,
  },
  trackInfo: {
    padding: 40,
    backgroundColor: "#fff",
  },
  trackInfoText: {
    textAlign: "center",
    flexWrap: "wrap",
    color: "#550088",
  },
  largeText: {
    fontSize: 22,
  },
  smallText: {
    fontSize: 16,
  },
  control: {
    margin: 20,
  },
  controls: {
    flexDirection: "row",
  },
});
