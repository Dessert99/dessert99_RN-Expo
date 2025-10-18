import { baseUrls } from "@/api/instance";
import { ImageUri } from "@/types";
import { router } from "expo-router";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

type FormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
};

function ImagePreviewList() {
  const { control } = useFormContext<FormValues>();
  const [imageUris] = useWatch({ control, name: ["imageUris"] }); // imageUris바뀔 때마다 추적
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false} // 스크롤 바 보이지 않게
      contentContainerStyle={styles.container}>
      {imageUris.map(({ uri }, idx) => {
        // 이미지 URI에는 서버 주소를 넣어줘야 한다.
        const imageUri = `${
          Platform.OS === "ios" ? baseUrls.ios : baseUrls.android
        }/${uri}`;

        return (
          <Pressable
            key={idx}
            style={styles.imageContainer}
            onPress={() =>
              router.push({ pathname: "/image", params: { uri: imageUri } })
            }>
            <Image
              style={styles.image}
              source={{ uri: imageUri }}
            />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
    flexGrow: 1,
  },
  imageContainer: {
    width: 90,
    height: 90,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});

export default ImagePreviewList;
