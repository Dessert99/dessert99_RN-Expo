import { colors } from "@/constants";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import FeedItem from "./FeedItem";

const dummyData = [
  {
    id: 1,
    userId: 1,
    title: "더미 타이틀",
    description:
      "더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음",
    createdAt: "2024-02-02",
    author: {
      id: 1,
      nickname: "닉네임",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
    votes: [],
    comments: [],
  },
  {
    id: 2,
    userId: 1,
    title: "더미 타이틀",
    description:
      "더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음더미짱많음",
    createdAt: "2025-09-30",
    author: {
      id: 1,
      nickname: "닉네임",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
    votes: [],
    comments: [],
  },
];

function FeedList() {
  return (
    <FlatList
      data={dummyData}
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
