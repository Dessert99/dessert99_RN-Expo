import AuthRoute from "@/components/AuthRoute";
import FeedItem from "@/components/FeedItem";
import InputField from "@/components/InputField";
import { colors } from "@/constants";
import { useCreateComment } from "@/hooks/queries/useCreateComment";
import { useGetPost } from "@/hooks/queries/useGetPost";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPost(Number(id));
  const [content, setContent] = useState("");
  const createComment = useCreateComment();

  if (isError || isPending) {
    return <Text>로딩중</Text>;
  }

  //댓글 생성 요청 핸들러
  const handleSubmitComment = () => {
    const commentData = {
      postId: post.id,
      content: content,
    };
    createComment.mutate(commentData);
    setContent(""); // 댓글 입력창 초기화
  };

  return (
    <AuthRoute>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.awareScrollViewContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={{ marginTop: 12 }}>
              <FeedItem
                post={post}
                isDetail={true}
              />
              <Text style={styles.commentCount}>
                댓글 {post.commentCount}개
              </Text>
            </View>
          </ScrollView>

          {/* 댓글 인풋 */}
          <View style={styles.commentInputContainer}>
            <InputField
              value={content}
              onChangeText={(text) => setContent(text)}
              returnKeyType='send'
              onSubmitEditing={handleSubmitComment} // 엔터키를 입력하면 댓글이 바로 등록 되도록 핸들러 연결
              placeholder='댓글을 남겨 보세요.'
              righteChild={
                <Pressable
                  disabled={!content} // 입력된 댓글이 없을 때는 클릭되지 않는다.
                  style={styles.inputButtonContainer}
                  onPress={handleSubmitComment}>
                  <Text style={styles.inputButtonText}>등록</Text>
                </Pressable>
              }
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollViewContainer: {
    backgroundColor: colors.GRAY_300,
  },
  commentCount: {
    marginTop: 12,
    backgroundColor: colors.WHITE,
    padding: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  awareScrollViewContainer: {
    flex: 1,
    borderTopColor: colors.GRAY_200,
  },
  commentInputContainer: {
    position: "absolute",
    bottom: 0,
    padding: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_200,
    width: "100%",
  },
  inputButtonContainer: {
    padding: 8,
    backgroundColor: colors.ORANGE_600,
    borderRadius: 5,
  },
  inputButtonText: {
    color: colors.WHITE,
    fontWeight: "bold",
  },
});
