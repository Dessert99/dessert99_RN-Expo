//폼 데이터 변환 함수
import * as ImagePicker from "expo-image-picker";

function getFormDataImages(
  key: string,
  images: ImagePicker.ImagePickerAsset[]
) {
  const formData = new FormData();

  images.forEach(({ uri, mimeType = "image/jpeg" }) => {
    const file = {
      uri: uri,
      type: mimeType,
      name: uri.split("/").pop(), // uri에서 이름 추출
    };

    formData.append(key, file as unknown as File);
  });
  return formData;
}

export { getFormDataImages };
