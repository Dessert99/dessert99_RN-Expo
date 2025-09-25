import { colors } from "@/constants";
import { Post } from "@/types";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Profile from "./Profile";

interface FeedItemProps {
  post: Post;
}

function FeedItem({ post }: FeedItemProps) {
  const isLike = false;
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Profile
          nickname={post.author.nickname}
          createdAt={post.createdAt}
          imageUri={post.author.imageUri}
          onPress={() => {}}
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
            name={isLike ? "heart" : "heart-outlined"}
            size={16}
            color={isLike ? colors.ORANGE_600 : colors.BLACK}
          />
          <Text style={isLike ? styles.activeMenuText : styles.menuText}>
            1
          </Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <Ionicons
            name='chatbubble-outline'
            size={16}
            color={colors.BLACK}
          />
          <Text style={styles.menuText}>1</Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <Ionicons
            name='eye-outline'
            size={16}
            color={colors.BLACK}
          />
          <Text style={styles.menuText}>1</Text>
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
