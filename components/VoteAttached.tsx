import { colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Pressable } from "react-native";
import InputField from "./InputField";

function VoteAttached() {
  const { control, setValue, resetField } = useFormContext();
  const [isVoteAttached] = useWatch({ control, name: ["isVoteAttached"] });
  return (
    <>
      {isVoteAttached && (
        <InputField
          variant='outlined'
          editable={false}
          value='투표가 첨부되었습니다.'
          righteChild={
            <Pressable
              onPress={() => {
                setValue("isVoteAttached", false);
                resetField("voteOptions"); // 투표 항목을 모두 초기화해줄 수 있다.
              }}>
              <Ionicons
                name='close'
                size={20}
                color={colors.BLACK}
              />
            </Pressable>
          }
        />
      )}
    </>
  );
}

export default VoteAttached;
