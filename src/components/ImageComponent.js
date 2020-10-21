import React from "react";
import { Image, View } from "react-native";

const ImageView = () => {
  return (
    <View>
      <ImageComponent
        source={{
          uri:
            "https://upload.wikimedia.org/wikipedia/commons/6/6f/Beethoven.jpg",
        }}
      />
    </View>
  );
};

export default ImageView;
