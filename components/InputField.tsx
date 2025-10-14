import { colors } from "@/constants";
import React, { ReactNode } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  variant?: "filled" | "standard" | "outline";
  error?: string;
  ref?: React.Ref<TextInput>; // 타입 설정
  righteChild?: ReactNode;
}

function InputField({
  label,
  variant = "filled",
  error = "",
  ref, //React 19부터 props로 넣을 수 있다.
  righteChild = null,
  ...props
}: InputFieldProps) {
  return (
    <View>
      {
        label && <Text style={styles.label}>{label}</Text> //라벨이 있을때만 사용
      }
      <View
        style={[
          styles.container,
          styles[variant],
          Boolean(error) && styles.inputError,
        ]}>
        <TextInput
          ref={ref}
          placeholderTextColor={colors.GRAY_500}
          style={styles.input}
          {...props}
          autoCapitalize='none' // 첫글자 대문자 끄기
          spellCheck={false}
          autoCorrect={false}
        />
        {righteChild}
      </View>
      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: colors.GRAY_700,
  },
  filled: {
    backgroundColor: colors.GRAY_100,
  },
  standard: {},
  outline: {},
  input: {
    fontSize: 16,
    flex: 1,
  },
  error: {
    color: colors.RED_500,
  },
  inputError: {
    backgroundColor: colors.RED_100,
  },
});

export default InputField;
