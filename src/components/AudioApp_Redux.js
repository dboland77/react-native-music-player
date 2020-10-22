import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import audioBookPlaylist from "../data/Playlist";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions/actions";

class AudioApp extends React.Component {
  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.props;
    // isPlaying
    //   ? await playbackInstance.pauseAsync()
    //   : await playbackInstance.playAsync();

    // this.setState({
    //   isPlaying: !isPlaying,
    // });
    console.log("Hello");
    console.log(this.props);
    console.log(this.props.isPlaying);
    this.props.setIsPlaying();
    console.log(isPlaying);
  };

  // handlePreviousTrack = async () => {
  //   let { playbackInstance, currentIndex } = this.props;
  //   if (playbackInstance) {
  //     await playbackInstance.unloadAsync();
  //     currentIndex < audioBookPlaylist.length - 1
  //       ? (currentIndex -= 1)
  //       : (currentIndex = 0);
  //     this.setState({
  //       currentIndex,
  //     });
  //     this.loadAudio();
  //   }
  // };

  // handleNextTrack = async () => {
  //   let { playbackInstance, currentIndex } = this.props;
  //   if (playbackInstance) {
  //     await playbackInstance.unloadAsync();
  //     currentIndex < audioBookPlaylist.length - 1
  //       ? (currentIndex += 1)
  //       : (currentIndex = 0);
  //     this.setState({
  //       currentIndex,
  //     });
  //     this.loadAudio();
  //   }
  // };

  async componentDidMount() {
    console.log("CDM", this.props);
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
    const { currentIndex, isPlaying, volume } = this.props;

    const playbackInstance = new Audio.Sound();

    const status = {
      shouldPlay: isPlaying,
      volume,
    };

    try {
      //playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(
        require("../../assets/audio/Bloch.mp3"),
        status,
        false
      );

      this.props.setPlaybackInstance();
      console.log(this.props.playbackInstance)
    } catch (e) {
      console.log(e);
    }
  }

  renderFileInfo() {
    const { playbackInstance, currentIndex } = this.props;
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
    const image = "../../assets/image/Beethoven.jpg";

    // const sdf = audioBookPlaylist[0].imageSource.toString();
    // console.log(sdf, image, sdf === image);
    // require wont work dynamically it has to be static so use a switch

    return (
      <View style={styles.container}>
        <Image style={styles.albumCover} source={require(image)} />
        <View style={styles.controls}>
          {/* <TouchableOpacity
            style={styles.control}
            // onPress={this.handlePreviousTrack}
          >
            <Ionicons name="ios-skip-backward" size={48} color="#444" />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.control}
            onPress={this.handlePlayPause}
          >
            {this.props.isPlaying ? (
              <Ionicons name="ios-pause" size={48} color="#444" />
            ) : (
              <Ionicons name="ios-play-circle" size={48} color="#444" />
            )}
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.control}
            // onPress={this.handleNextTrack}
          >
            <Ionicons name="ios-skip-forward" size={48} color="#444" />
          </TouchableOpacity> */}
        </View>
        {this.renderFileInfo()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isPlaying: state.isPlaying,
    playbackInstance: state.playbackInstance,
    currentIndex: state.currentIndex,
    volume: state.volume,
    isBuffering: state.isBuffering,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setIsPlaying: () => dispatch({ type: actionTypes.SET_IS_PLAYING }),
    setPlaybackInstance: () =>
      dispatch({ type: actionTypes.SET_PLAYBACK_INSTANCE }),
  };
};
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

export default connect(mapStateToProps, mapDispatchToProps)(AudioApp);
