import { colors } from "@/constants";
import { useGetInfinitePosts } from "@/hooks/queries/useGetInfinitePosts";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import FeedItem from "./FeedItem";

function FeedList() {
  const { data: posts, error } = useGetInfinitePosts(); // data의 이름을 posts로 변경
  if (error) console.log("[FeedList] fetch error:", error); // ← 여기 한 줄
  return (
    <FlatList
      data={posts?.pages.flat()} // 게시글 배열의 배열로 온다. ex) [게시글1, 게시글2 ...게시글10], [게시글11, 게시글12...게시글20]
      renderItem={({ item }) => <FeedItem post={item} />} // data 배열 요소를 하나씩 FeedItem에 넣음
      contentContainerStyle={styles.contentContainer} // FlatList 스타일
      keyExtractor={(item) => String(item.id)} //FlatList의 key 값은 문자열이어야 한다.
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});

export default FeedList;
