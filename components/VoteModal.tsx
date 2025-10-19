import { colors } from "@/constants";
import { VoteOption } from "@/types";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import VoteInput from "./VoteInput";

function VoteModal() {
  const { control, setValue } = useFormContext();
  const [isVoteOpen, voteOptions] = useWatch({
    control,
    name: ["isVoteOpen", "voteOptions"],
  }); // isVoteOpen 상태를 가져온다.
  const { fields, append, remove } = useFieldArray({
    control,
    name: "voteOptions",
  }); // voteOptions의 배열을 fields로 다룰 수 있다.

  // 항목 추가 핸들러
  const handleAppendVote = () => {
    // 추가할 항목의 순서는 현재 추가되어 있는 인풋의 순서에서 가장 큰 순서에서 1을 더해주면 된다.
    const priorities = voteOptions.map(
      (vote: VoteOption) => vote.displayPriority
    );
    const nextPriority = Math.max(...priorities) + 1;

    append({ displayPriority: nextPriority, content: "" });
  };

  // 투표 제출 핸들러
  const handleSubmitVote = () => {
    if (voteOptions.lenght < 2) {
      Alert.alert("투표 항목을 2개 이상 추가해주세요.", "");
      return;
    }

    setValue("isVoteAttached", true); // 투표가 첨부 되었는지 판단하는 상태
    setValue("isVoteOpen", false); // 제출하면 isVoteOpen을 false로 바꿔서 모달을 닫아준다.
  };

  return (
    <Modal
      visible={isVoteOpen} // true 일 떄만 보인다.
      animationType='slide'>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Pressable
              style={styles.headerLeft}
              onPress={() => setValue("isVoteOpen", false)} // 뒤로가기 누르면 isVoteOpen이 false가 되며 모달이 내려간다.
            >
              <Feather
                name='arrow-left'
                size={28}
                color={colors.BLACK}
              />
            </Pressable>
            <Text style={styles.headerTitle}>투표</Text>
            <Text
              style={styles.headerRight}
              onPress={handleSubmitVote}>
              첨부
            </Text>
          </View>
          <KeyboardAwareScrollView
            contentContainerStyle={{ gap: 12, padding: 16 }}>
            {fields.map((field, idx) => {
              return (
                <VoteInput
                  key={field.id}
                  index={idx}
                  onRemove={() => remove(idx)} // 그냥 삭제할 인덱스를 전달하면 된다.
                />
              );
            })}
            <Pressable onPress={handleAppendVote}>
              <Text style={styles.addVoteText}>+ 항목 추가</Text>
            </Pressable>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.BLACK,
  },
  headerRight: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: colors.ORANGE_600,
    fontSize: 16,
    fontWeight: "bold",
  },
  addVoteText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.GRAY_500,
  },
});

export default VoteModal;
