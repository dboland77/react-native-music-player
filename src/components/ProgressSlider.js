import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";

const ProgressSlider = ({ navigation }, props) => {
  const [slideValue, setSlideValue] = useState(0.0);

  return (
    <View>
      <Text style={styles.text}>{String(slideValue)}</Text>
      <Slider
        step={1}
        maximumValue={100}
        onValueChange={setSlideValue}
        value={slideValue}
        style={styles.slide}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    textAlign: "center",
  },
  slide: {
    marginLeft:30,
    marginRight: 30
  }
});

export default ProgressSlider;
