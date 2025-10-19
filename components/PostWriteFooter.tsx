import { colors } from "@/constants";
import { useUploadImages } from "@/hooks/queries/useUploadImages";
import { getFormDataImages } from "@/utils/image";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function PostWriteFooter() {
  const inset = useSafeAreaInsets();
  const uploadImages = useUploadImages();
  const { control, setValue } = useFormContext();
  const [imageUris] = useWatch({ control, name: ["imageUris"] }); //  name 필드의 값(imageUris)가 바뀔 때마다 컴포넌트 자동으로 리렌더링시켜 최신 값을 가져올 수 있도록 한다.

  // 이미지 데이터 전달 핸들러
  const addImageUris = (uris: string[]) => {
    // 업로드 이미지 개수 제한
    if (imageUris.length + uris.length > 5) {
      Alert.alert("이미지 개수 초과", "추가 가능한 이미지는 최대 5개입니다.");
      return;
    }

    // 이름에 맞게 상태를 업데이트 해준다.
    setValue(
      "imageUris",
      [...imageUris, ...uris.map((uri) => ({ uri: uri }))] // 기존 이미지를 그대로 복사하고 추가
    );
  };

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
      onSuccess: (data: string[]) => addImageUris(data),
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
      <Pressable
        style={styles.footerIcon}
        onPress={() => setValue("isVoteOpen", true)} //  버튼 누르면 투표 오픈 상태 true. 그럼 투표 모달 오픈
      >
        <MaterialCommunityIcons
          name={"vote"}
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
