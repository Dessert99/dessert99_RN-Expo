import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

function ImageContainer() {
  const [imageUris, setImageUris] = useState<string[]>([]);

  // 이미지 피커 핸들러
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    //취소를 눌렀을 때
    if (result.canceled) {
      return;
    }

    // 이미지 개수 제한
    if (imageUris.length + result.assets.length > 5) {
      Alert.alert("이미지는 최대 5장 입니다.");
      return;
    }

    //덮어쓰기
    setImageUris((prev) => [
      ...prev,
      ...result.assets.map((asset) => asset.uri),
    ]);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal>
      <Pressable
        style={styles.addButton}
        onPress={pickImage}>
        <Text>추가</Text>
      </Pressable>
      {imageUris &&
        imageUris.map((url) => (
          <Image
            style={styles.image}
            key={url}
            source={{ uri: url }}
          />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexGrow: 1,
    gap: 5,
  },
  addButton: {
    borderWidth: 2,
    padding: 10,
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default ImageContainer;
