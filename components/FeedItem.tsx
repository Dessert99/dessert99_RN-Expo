import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import { Post } from "@/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Profile from "./Profile";

interface FeedItemProps {
  post: Post;
}

function FeedItem({ post }: FeedItemProps) {
  const { auth } = useAuth();
  const { showActionSheetWithOptions } = useActionSheet();

  const likeUsers = post.likes?.map((like) => Number(like.userId)); // 게시글에 좋아요가 있다면, 유저의 아이디만 뽑아준다.
  const isLiked = likeUsers?.includes(Number(auth.id)); // 좋아요 누른 사람 목록에 내 id가 있다면 true

  // 프로필 옵션 버튼 핸들러
  const handlePressOption = () => {
    const options = ["삭제", "수정", "취소"];
    const cancelButtonIndex = 2;
    const destructiveButtonIndex = 0;

    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex: // 삭제
            break;
          case 1: // 수정
            break;
          case cancelButtonIndex: //취소
            break;
          default:
            break;
        }
      }
    ); // options로 어떤 버튼인지 넣을 수 있다. 그 다음 누른 버튼에 따라 핸들링하면 된다.
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Profile
          nickname={post.author.nickname}
          createdAt={post.createdAt}
          imageUri={post.author.imageUri}
          onPress={() => {}}
          options={
            // 내가 올린 게시글에만 옵션이 보이도록 설정
            auth.id === post.author.id && (
              <Ionicons
                name='ellipsis-vertical'
                size={24}
                color={colors.BLACK}
                onPress={handlePressOption}
              />
            )
          }
        />
        <Text style={styles.title}>{post.title}</Text>
        <Text
          numberOfLines={3} // 텍스트가 많이 와도 3줄까지만 보여주고 ...으로 대체
          style={styles.description}>
          {post.description}
        </Text>
      </View>
      <View style={styles.menuContainer}>
        <Pressable style={styles.menu}>
          <Entypo
            name={isLiked ? "heart" : "heart-outlined"}
            size={16}
            color={isLiked ? colors.ORANGE_600 : colors.BLACK}
          />
          <Text style={isLiked ? styles.activeMenuText : styles.menuText}>
            {post.likes.length || "좋아요"}
          </Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <Ionicons
            name='chatbubble-outline'
            size={16}
            color={colors.BLACK}
          />
          <Text style={styles.menuText}>{post.commentCount || "댓글"}</Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <Ionicons
            name='eye-outline'
            size={16}
            color={colors.BLACK}
          />
          <Text style={styles.menuText}>{post.viewCount}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  contentContainer: {
    padding: 16, // 보통 패딩으로 구조 잡는듯
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.BLACK,
    padding: 3,
  },
  description: {
    fontSize: 16,
    color: colors.BLACK,
    padding: 3,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_300,
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    width: "33%",
    gap: 4,
  },
  menuText: {
    fontSize: 14,
    color: colors.GRAY_700,
  },
  activeMenuText: {
    fontWeight: "500",
    color: colors.ORANGE_600,
  },
});

export default FeedItem;

/*
space-around = 양끝에 같은 크기의 공간 추가 
*/
