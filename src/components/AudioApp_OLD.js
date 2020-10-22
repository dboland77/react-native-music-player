import React from "react";
import { Audio } from "expo-av";
import { Button, StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Home";
import DetailsScreen from "./DetailsScreen";
import { connect } from "react-redux";

// const Stack = createStackNavigator();

Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  staysActiveInBackground: true,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: true,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
  playThroughEarpieceAndroid: false,
});

const AudioApp =  (props) => {
  // const handlePlayPause = async () => {
  //   props.isPlaying
  //     ? await props.playbackInstance.pauseAsync()
  //     : await props.playbackInstance.playAsync();
  //   props.setPlaying();
  // };

  // handlePreviousTrack = async () => {
  //   if (playbackInstance) {
  //     await playbackInstance.unloadAsync();
  //     currentIndex < audioBookPlaylist.length - 1
  //       ? (currentIndex -= 1)
  //       : (currentIndex = 0);
  //     this.setState({
  //       currentIndex,
  //     });
  //     loadAudio();
  //   }
  // };

  // handleNextTrack = async () => {
  //   let { playbackInstance, currentIndex } = this.state;
  //   if (playbackInstance) {
  //     await playbackInstance.unloadAsync();
  //     currentIndex < audioBookPlaylist.length - 1
  //       ? (currentIndex += 1)
  //       : (currentIndex = 0);
  //     this.setState({
  //       currentIndex,
  //     });
  //     loadAudio();
  //   }
  // };
    try {
      const playbackInstance = new Audio.Sound();

      const status = {
        shouldPlay: props.isPlaying,
        volume: props.volume,
      };

      playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
       playbackInstance.loadAsync(
        require("../../assets/audio/Beethoven.mp3"),
        status,
        false
      );
      props.onSuccessfulLoad();
    } catch (e) {
      console.log(e);
    }

  // const onPlaybackStatusUpdate = (status) => {
  //   // this.setState({
  //   //   isBuffering: status.isBuffering,
  //   // });
  //   alert(isPlaying);
  // };

  return (
    // <NavigationContainer style={styles.container}>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen
    //       name="Details"
    //       component={DetailsScreen}
    //       options={{ title: "Details" }}
    //     ></Stack.Screen>
    //     <Stack.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{ title: "Welcome" }}
    //     ></Stack.Screen>
    //   </Stack.Navigator>
    // </NavigationContainer>
    <React.Fragment>

    <Button 
      title="Play"
      onPress={()=> {
        console.log('pressed');
      }} />
      <Text> Hello! </Text>
    </React.Fragment>
  )
};

// const styles = StyleSheet.create({
//   container: {
//     color: "red",
//     backgroundColor: "black",
//     flex: 1,
//   },
// });

const mapStateToProps = (state) => {
  return {
    isPlaying: state.isPlaying,
    isBuffering: state.isBuffering,
    playbackInstance: state.playbackInstance,
    volume: state.volume,
    currentIndex: state.currentIndex,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setPlaying: () => dispatch({ type: "PLAYING" }),
//   };
// };

export default connect(mapStateToProps)(AudioApp);

