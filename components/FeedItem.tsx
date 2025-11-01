import { baseUrls } from "@/api/instance";
import { colors } from "@/constants";
import { useDeletePost } from "@/hooks/queries/useDeletePost";
import { useGetMe } from "@/hooks/queries/useGetMe";
import { useLikePost } from "@/hooks/queries/useLikePost";
import { Post } from "@/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Profile from "./Profile";
import Vote from "./Vote";

interface FeedItemProps {
  post: Post;
  isDetail?: boolean; // 상세 스크린이 계속 클릭되는 것을 방지. 상세 스크린이 보이는지 아닌지를 판단
}

function FeedItem({ post, isDetail = false }: FeedItemProps) {
  const { auth } = useGetMe();
  const { showActionSheetWithOptions } = useActionSheet();
  const deletePost = useDeletePost();
  const likeMutation = useLikePost();

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
            deletePost.mutate(post.id, {
              onSuccess: () => isDetail && router.back(), // 상세 페이지에서 삭제하면 홈으로 가기
            });
            break;
          case 1: // 수정
            router.push(`/post/update/${post.id}`);
            break;
          case cancelButtonIndex: //취소
            break;
          default:
            break;
        }
      }
    ); // options로 어떤 버튼인지 넣을 수 있다. 그 다음 누른 버튼에 따라 핸들링하면 된다.
  };

  //상세 스크린 이동 핸들러
  const handlePressFeed = () => {
    if (!isDetail) {
      router.push(`/post/${post.id}`);
    }
  };

  // 좋아요 클릭 핸들러
  const handlePressLike = () => {
    if (!auth.id) {
      router.push("/auth");
      return;
    }
    if (!isDetail) {
      router.push(`/post/${post.id}`);
      return;
    }
    likeMutation.mutate(post.id);
  };

  const ContainerComponent = isDetail ? View : Pressable;

  return (
    <ContainerComponent
      style={styles.container}
      onPress={handlePressFeed}>
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 5, flexGrow: 1 }}>
          {post.imageUris.map(({ uri }, idx) => {
            // 이미지 URI에는 서버 주소를 넣어줘야 한다.
            const imageUri = `${
              Platform.OS === "ios" ? baseUrls.ios : baseUrls.android
            }/${uri}`;

            return (
              <Pressable
                key={idx}
                style={styles.imageContainer}
                onPress={() =>
                  router.push({ pathname: "/image", params: { uri: imageUri } })
                }>
                <Image
                  style={styles.image}
                  source={{ uri: imageUri }}
                />
              </Pressable>
            );
          })}
        </ScrollView>

        {/* 상세 페이지가 아니고, 투표가 있을 때 보인다 */}
        {!isDetail && post.hasVote && (
          <View style={styles.voteContainer}>
            <View style={styles.voteTextContainer}>
              <MaterialCommunityIcons
                name='vote'
                size={24}
                color={colors.ORANGE_600}
              />
              <Text style={styles.voteText}>투표</Text>
            </View>
            <Text style={styles.voteCountText}>
              {post.voteCount}명 참여중...
            </Text>
          </View>
        )}

        {/* 상세 페이지에서 투표 컴포넌트 */}
        {isDetail && post.hasVote && (
          <Vote
            postId={post.id}
            postVotes={post.votes ?? []}
            voteCount={post.voteCount}
          />
        )}
      </View>
      <View style={styles.menuContainer}>
        <Pressable
          style={styles.menu}
          onPress={handlePressLike}>
          <Entypo
            name={isLiked ? "heart" : "heart-outlined"}
            size={16}
            color={isLiked ? colors.ORANGE_600 : colors.BLACK}
          />
          <Text style={isLiked ? styles.activeMenuText : styles.menuText}>
            {post.likes.length || "좋아요"}
          </Text>
        </Pressable>
        <Pressable
          style={styles.menu}
          onPress={handlePressFeed}>
          <Ionicons
            name='chatbubble-outline'
            size={16}
            color={colors.BLACK}
          />
          <Text style={styles.menuText}>{post.commentCount || "댓글"}</Text>
        </Pressable>
        <Pressable
          style={styles.menu}
          onPress={handlePressFeed}>
          <Ionicons
            name='eye-outline'
            size={16}
            color={colors.BLACK}
          />
          <Text style={styles.menuText}>{post.viewCount}</Text>
        </Pressable>
      </View>
    </ContainerComponent>
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
  imageContainer: {
    width: 90,
    height: 90,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  voteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    borderWidth: 1,
    borderRadius: 10,
    gap: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: colors.ORANGE_600,
    backgroundColor: colors.ORANGE_100,
  },
  voteTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  voteCountText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.BLACK,
  },
  voteText: {
    fontWeight: "bold",
    color: colors.ORANGE_600,
    fontSize: 14,
  },
});

export default FeedItem;

/*
space-around = 양끝에 같은 크기의 공간 추가 
*/
