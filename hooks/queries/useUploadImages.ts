import { uploadImages } from "@/api/image";
import { useMutation } from "@tanstack/react-query";

export function useUploadImages() {
  return useMutation({
    mutationFn: uploadImages,
  });
}
