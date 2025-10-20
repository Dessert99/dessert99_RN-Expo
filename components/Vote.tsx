import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import { useCreateVote } from "@/hooks/queries/useCreateVote";
import { PostVote } from "@/types";
import { Feather } from "@expo/vector-icons";
import React, { Fragment, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import VoteOption from "./VoteOption";

interface VoteProps {
  postId: number;
  postVotes: PostVote[]; // PostVote의 options에 투표 정보가 담긴다. (투표 내용, 어떤 유저가 했는지)
  voteCount: number;
}

function Vote({ postId, postVotes, voteCount }: VoteProps) {
  const { auth } = useAuth();
  const [selectedId, setSelectedId] = useState<number>(); // 투표 선택 상태
  const createVote = useCreateVote();

  // 투표 핸들러
  const handleVote = () => {
    createVote.mutate({ postId: postId, voteOptionId: Number(selectedId) });
  };

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={styles.labelTitle}>투표</Text>
        <View style={styles.labelCount}>
          <Feather
            name='user'
            size={14}
            color={colors.BLACK}
          />
          <Text style={styles.labelCountText}>{voteCount}명 참여</Text>
        </View>
      </View>

      {postVotes.map((vote) => {
        // 투표한 유저 id 수집
        const voteUsersId = vote.options.flatMap((option) =>
          option.userVotes.map((userVote) => userVote.userId)
        );

        // 내가 투표를 했는지
        const isVoted = voteUsersId.includes(Number(auth.id));

        return (
          <Fragment key={vote.id}>
            {vote.options.map((option) => {
              return (
                <VoteOption
                  key={option.id}
                  isVoted={isVoted}
                  isSelected={option.id === selectedId}
                  option={option}
                  totalCount={voteCount}
                  onSelectOption={() => setSelectedId(Number(option.id))}
                />
              );
            })}

            {/* 내가 아직 투표를 안했다면 투표하기 버튼 */}
            {!isVoted && (
              <CustomButton
                label='투표하기'
                onPress={handleVote}
                disabled={!selectedId} // 투표를 안했으면 버튼 비활성화
              />
            )}
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    borderWidth: 1,
    padding: 16,
    gap: 15,
    borderRadius: 7,
    borderColor: colors.GRAY_300,
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  labelTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  labelCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  labelCountText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Vote;
