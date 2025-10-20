import { colors } from "@/constants";
import { PostVoteOption } from "@/types";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface VoteOptionProps {
  option: PostVoteOption; // 투표 옵션
  totalCount: number; // 전체 투표 개수
  isVoted: boolean; // 나의 투표 여부
  isSelected: boolean; // 현재 선택 됐는지
  onSelectOption: () => void; //선택 핸들러
}

function VoteOption({
  option,
  totalCount,
  isVoted,
  isSelected,
  onSelectOption,
}: VoteOptionProps) {
  return (
    <>
      {isVoted ? (
        <View></View>
      ) : (
        <Pressable
          onPress={onSelectOption}
          style={isSelected ? styles.selectedContainer : styles.container}>
          <Text style={styles.content}>{option.content}</Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.GRAY_300,
    backgroundColor: colors.WHITE,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedContainer: {
    borderColor: colors.ORANGE_600,
    backgroundColor: colors.WHITE,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: { marginLeft: 10 },
});

export default VoteOption;
