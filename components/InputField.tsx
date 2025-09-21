import { colors } from "@/constants";
import React from "react";
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
}

function InputField({ label, variant = "filled", ...props }: InputFieldProps) {
  return (
    <View>
      {
        label && <Text style={styles.label}>{label}</Text> //라벨이 있을때만 사용
      }
      <View style={[styles.container, styles[variant]]}>
        <TextInput
          placeholderTextColor={colors.GRAY_500}
          style={styles.input}
          {...props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 10,
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
  },
});

export default InputField;
