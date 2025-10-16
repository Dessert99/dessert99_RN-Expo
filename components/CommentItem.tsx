import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import { useDeleteComment } from "@/hooks/queries/useDeleteComment";
import { Comment } from "@/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import InputField from "./InputField";
import Profile from "./Profile";

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean; // 댓글인지 대댓글인지 구분하는 props
  parentCommentId?: number | null;
  onReply?: () => void;
  onCancelReply?: () => void;
}

function CommentItem({
  comment,
  isReply = false,
  parentCommentId,
  onReply,
  onCancelReply,
}: CommentItemProps) {
  const { auth } = useAuth();
  const deleteComment = useDeleteComment();
  const { showActionSheetWithOptions } = useActionSheet();

  // 선택된 댓글 배경색을 바꾸기 위한 로직
  const getCommentBackground = () => {
    // 선택된 댓글이라면 오렌지 색 반환
    if (parentCommentId === comment.id) {
      return colors.ORANGE_100;
    }

    // 답글이면 회색 반환
    if (isReply) {
      return colors.GRAY_200;
    }

    // 나머지는 하얀색 반환
    return colors.WHITE;
  };

  //옵션 핸들러
  const handlePressOption = () => {
    const options = ["삭제", "취소"];
    const cancelButtonIndex = 1;
    const destructiveButtonIndex = 0;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            deleteComment.mutate(comment.id);
            break;
          case cancelButtonIndex:
            break;
          default:
            break;
        }
      }
    );
  };
  return (
    <View
      style={[styles.container, { backgroundColor: getCommentBackground() }]}>
      <View style={styles.profileContainer}>
        {isReply && (
          <MaterialCommunityIcons
            name='arrow-right-bottom'
            size={24}
            color={"black"}
          />
        )}
        <Profile
          imageUri={comment.isDeleted ? "" : comment.user.imageUri}
          nickname={comment.isDeleted ? "(삭제)" : comment.user.nickname}
          createdAt={comment.createdAt}
          onPress={() => {}}
          options={
            //내 댓글인 경우 + 삭제되지 않은 경우에만 옵션이 보이도록 한다.
            auth.id === comment.user.id &&
            !comment.isDeleted && (
              <Ionicons
                name='ellipsis-vertical'
                size={24}
                color={"black"}
                onPress={handlePressOption}
              />
            )
          }
        />
      </View>
      <InputField
        editable={false} // 편집 불가
        value={comment.isDeleted ? "삭제된 댓글입니다." : comment.content}
      />
      {/* 삭제된 댓글이 아니고, 답글이 아닌 경우에만 보인다. */}
      {!comment.isDeleted && !isReply && (
        <View style={styles.replyButtonContainer}>
          <Pressable onPress={onReply}>
            <Text style={styles.replyButton}>답글 남기기</Text>
          </Pressable>

          {/* 현재 댓글 Id와 parentComment id가 같을 때만 취소 버튼이 보인다 */}
          {parentCommentId === comment.id && (
            <Pressable onPress={onCancelReply}>
              <Text style={styles.cancelButton}>취소</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  replyButtonContainer: {
    flexDirection: "row",
    gap: 15,
    alignContent: "center",
  },
  replyButton: {
    color: colors.ORANGE_600,
    fontSize: 12,
    fontWeight: "bold",
  },
  cancelButton: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.BLACK,
  },
});

export default CommentItem;

/*
1. 댓글은 삭제되면 사라지는 것이 아니라, "삭제된 댓글입니다" 라는 형태로 표시된다.
*/
