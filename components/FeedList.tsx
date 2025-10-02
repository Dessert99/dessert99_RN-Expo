import { colors } from "@/constants";
import { useGetInfinitePosts } from "@/hooks/queries/useGetInfinitePosts";
import { useScrollToTop } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import FeedItem from "./FeedItem";

function FeedList() {
  const {
    data: posts,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts(); // data의 이름을 posts로 변경
  if (error) console.log("[FeedList] fetch error:", error); // ← 여기 한 줄

  const [isRefreshing, setIsRefreshing] = useState(false); // 새로고침 상태
  const ref = useRef<FlatList | null>(null); //FlatList라고 박아두면, ref.current가 FlatList 인스턴스임을 TS가 안다.
  useScrollToTop(ref); // 최상단으로 이동

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  //다음 페이지 가져오는 로직
  const handleEndReached = () => {
    // 다음 페이지가 있으면서 다음 페이지를 가져오는 중이 아닐 때만 다음 페이지를 가져온다.
    if (hasNextPage && !isFetchingNextPage) {
      console.log("다음 페이지 ->", (posts?.pages.length ?? 0) + 1);
      fetchNextPage(); // 다음 페이지
    }
  };

  return (
    <FlatList
      ref={ref}
      data={posts?.pages.flat()} // 게시글 배열의 배열로 온다. ex) [게시글1, 게시글2 ...게시글10], [게시글11, 게시글12...게시글20]
      renderItem={({ item }) => <FeedItem post={item} />} // data 배열 요소를 하나씩 FeedItem에 넣음
      contentContainerStyle={styles.contentContainer} // FlatList 스타일
      keyExtractor={(item) => String(item.id)} //FlatList의 key 값은 문자열이어야 한다.
      onEndReached={handleEndReached} // 다음 글 목록 불러오는 옵션
      onEndReachedThreshold={0.5} // 밑에 완전히 닫지 않아도 자동으로 불러오는 옵션
      refreshing={isRefreshing} // 새로고침 상태 연결
      onRefresh={handleRefresh} // 새로고침 기능 추가
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
