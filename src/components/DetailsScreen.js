import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Button } from "react-native";
import ProgressSlider from "./ProgressSlider";
import ImageComponent from "./ImageComponent";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

function DetailsScreen({ navigation }, props) {
  return (
    <View style={styles.container}>
      <ImageComponent />

      <View style={styles.controls}>
        <TouchableOpacity style={styles.control} onPress={() => alert("")}>
          <Ionicons name="ios-skip-backward" size={48} color="#444" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.control} onPress={() => alert("")}>
          {props.isPlaying ? (
            <Ionicons name="ios-pause" size={48} color="#444" />
          ) : (
            <Ionicons name="ios-play-circle" size={48} color="#444" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.control} onPress={() => alert("")}>
          <Ionicons name="ios-skip-forward" size={48} color="#444" />
        </TouchableOpacity>
      </View>
      <ProgressSlider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "column",
  },
  albumCover: {
    width: 250,
    height: 250,
  },
  controls: {
    flexDirection: "row",
  },
  control: {
    margin: 20,
  },
});

const mapStateToProps = state => {
  return {
    isPlaying: state.isPlaying,
  };
};

const mapDispatchToProps = dispatch => {
  return{
    setPlaying: () => dispatch({type: 'PLAYING'})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);
