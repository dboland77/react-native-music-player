import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";

const soundObject = new Audio.Sound();

export default AudioApp = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [icon, setIcon] = useState("play-arrow");

  const playAudioHandler = async (url) => {
    if (isLoaded == true) {
      if (isPlaying == true) {
        await soundObject.pauseAsync();
        setIsPlaying(false);
        setIcon("play-arrow");
      } else {
        await soundObject.playAsync();
        setIsPlaying(true);
        setIcon("pause");
      }
    } else {
      try {
        await soundObject.loadAsync(
          require("../../assets/audio/Beethoven.mp3")
        );
        await soundObject
          .playAsync()
          .then(async (playbackStatus) => {
            console.log(playbackStatus);
            setIcon("pause");
            setIsPlaying(playbackStatus.isPlaying);
            setIsLoaded(playbackStatus.isLoaded);
            setTimeout(() => {
              soundObject.unloadAsync();
              setIsLoaded(false);
              setIcon("play-arrow");
            }, playbackStatus.playableDurationMillis);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
};
