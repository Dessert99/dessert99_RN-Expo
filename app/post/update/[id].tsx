import CustomButton from "@/components/CustomButton";
import DescriptionInput from "@/components/DescriptionInput";
import TitleInput from "@/components/TitleInput";
import VoteAttached from "@/components/VoteAttached";
import { useGetPost } from "@/hooks/queries/useGetPost";
import { useUpdatePost } from "@/hooks/queries/useUpdatePost";
import { ImageUri } from "@/types";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type FormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
  isVoteAttached: boolean;
};

export default function PostUpdateScreen() {
  const { id } = useLocalSearchParams(); // param에 있는 id를 가져온다. 이 id를 가져와서 게시글 정보를 가져온다.
  const { data: post } = useGetPost(Number(id));
  const updatePost = useUpdatePost();
  const navigation = useNavigation();
  const postForm = useForm<FormValues>({
    defaultValues: {
      title: post?.title,
      description: post?.description,
      imageUris: post?.imageUris,
      isVoteAttached: post?.hasVote, // 투표가 있는지 없는지 부울값이 있다.
    },
  });

  const onSubmit = (formValues: FormValues) => {
    updatePost.mutate(
      {
        id: Number(id),
        body: formValues,
      },
      {
        onSuccess: () => router.back(),
      }
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          label='저장'
          size='medium'
          variant='standard'
          onPress={postForm.handleSubmit(onSubmit)}
        />
      ),
    });
  }, []);

  return (
    <FormProvider {...postForm}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TitleInput />
        <DescriptionInput />
        <VoteAttached />
      </KeyboardAwareScrollView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});
