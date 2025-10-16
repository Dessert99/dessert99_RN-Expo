import AuthRoute from "@/components/AuthRoute";
import CommentItem from "@/components/CommentItem";
import FeedItem from "@/components/FeedItem";
import InputField from "@/components/InputField";
import { colors } from "@/constants";
import { useCreateComment } from "@/hooks/queries/useCreateComment";
import { useGetPost } from "@/hooks/queries/useGetPost";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PostDetailScreen() {
  const inset = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPost(Number(id));
  const [content, setContent] = useState("");
  const createComment = useCreateComment();
  const scrollRef = useRef<ScrollView | null>(null);
  const [parentCommentId, setParentCommentId] = useState<number | null>(null); // 대댓글을 위한 부모 댓글 ID 상태
  const inputRef = useRef<TextInput | null>(null);

  if (isError || isPending) {
    return <Text>로딩중</Text>;
  }
  //대댓글이 달릴 부모 댓글 ID 상태를 관리하는 핸들러
  const handleReply = (commentId: number) => {
    setParentCommentId(commentId);
    inputRef.current?.focus(); // 답글 남기기 클릭하면 입력창으로 포커스 이동
  };

  // 답글 취소 핸들러
  const handleCancelReply = () => {
    setParentCommentId(null);
    Keyboard.dismiss(); // 키보드 내리기
  };

  //댓글 생성 요청 핸들러
  const handleSubmitComment = () => {
    const commentData = {
      postId: post.id,
      content: content,
    };
    createComment.mutate(commentData);
    setContent(""); // 댓글 입력창 초기화

    setTimeout(() => {
      scrollRef.current?.scrollToEnd(); // 댓글 입력 후 0.5초 뒤에 스크롤 내리기
    }, 500);
  };

  return (
    <AuthRoute>
      <View style={[styles.container, { paddingBottom: inset.bottom }]}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.awareScrollViewContainer}>
          <ScrollView
            ref={scrollRef}
            style={{ marginBottom: 75 }} // 댓글이 입력창에 가려지지 않도록 마진 추가
            contentContainerStyle={styles.scrollViewContainer}>
            <View style={{ marginTop: 12 }}>
              <FeedItem
                post={post}
                isDetail={true}
              />
              <Text style={styles.commentCount}>
                댓글 {post.commentCount}개
              </Text>
            </View>

            {post.comments?.map((comment) => {
              return (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  parentCommentId={parentCommentId}
                  onReply={() => handleReply(comment.id)}
                  onCancelReply={handleCancelReply}
                />
              );
            })}
          </ScrollView>

          {/* 댓글 인풋 */}
          <View style={styles.commentInputContainer}>
            <InputField
              ref={inputRef}
              value={content}
              onChangeText={(text) => setContent(text)}
              returnKeyType='send'
              onSubmitEditing={handleSubmitComment} // 엔터키를 입력하면 댓글이 바로 등록 되도록 핸들러 연결
              placeholder={
                parentCommentId ? "답글 남기는 중..." : "댓글을 남겨 보세요."
              }
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
