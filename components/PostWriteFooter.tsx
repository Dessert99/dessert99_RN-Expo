import { colors } from "@/constants";
import { useUploadImages } from "@/hooks/queries/useUploadImages";
import { getFormDataImages } from "@/utils/image";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function PostWriteFooter() {
  const inset = useSafeAreaInsets();
  const uploadImages = useUploadImages();

  // 이미지 피커 핸들러
  const handleOpenImagePick = async () => {
    //갤러리 열기
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images", //기본값이 images임
      allowsMultipleSelection: true, // 여러 장 선택 가능
    });

    //취소를 눌렀다면
    if (result.canceled) {
      return;
    }
    // 폼 데이터로 변환
    const formData = getFormDataImages("images", result.assets);

    // 업로드 api
    uploadImages.mutate(formData, {
      onSuccess: (data: string[]) => console.log(data),
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      <Pressable
        style={styles.footerIcon}
        onPress={handleOpenImagePick}>
        <Ionicons
          name={"camera"}
          size={20}
          color={colors.BLACK}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 12,
    bottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_200,
    flexDirection: "row",
  },
  footerIcon: {
    backgroundColor: colors.GRAY_200,
    padding: 10,
    borderRadius: 5,
  },
});

export default PostWriteFooter;
