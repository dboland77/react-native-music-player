import React from "react";
import { StyleSheet, Image, View } from "react-native";

const ImageComponent = ({ navigation }, props) => {
  return (
    <View>
      <Image
        source={require("../../assets/Image/Beethoven.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default ImageComponent;

const styles = StyleSheet.create({
  image: {
   borderWidth:1,
   borderRadius:75,
    width: 150,
    height: 150,
    alignSelf:'center',
    marginBottom:40
  },
});
