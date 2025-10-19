import { colors } from "@/constants";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import VoteInput from "./VoteInput";

function VoteModal() {
  const { control, setValue } = useFormContext();
  const [isVoteOpen] = useWatch({ control, name: ["isVoteOpen"] }); // isVoteOpen 상태를 가져온다.
  const { fields, append, remove } = useFieldArray({
    control,
    name: "voteOptions",
  }); // voteOptions의 배열을 fields로 다룰 수 있다.

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
          <Text style={styles.headerRight}>첨부</Text>
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
});

export default VoteModal;
