import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextInputProps } from "react-native";
import InputField from "./InputField";

interface Props {
  submitBehavior?: TextInputProps["submitBehavior"];
}

function PasswordInput({ submitBehavior = "blurAndSubmit" }: Props) {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name='password'
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length < 8) {
            return "비밀번호는 8자리 이상입니다.";
          }
          if (data.length > 20) {
            return "비밀번호는 20자리 이하입니다.";
          }
        },
      }}
      // 표시할 컴포넌트
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => {
        return (
          <InputField
            ref={ref} // 도착지에 ref
            label='비밀번호'
            placeholder='비밀번호를 입력해주세요'
            value={value}
            onChangeText={onChange}
            error={error?.message}
            secureTextEntry // 암호화
            textContentType='oneTimeCode' //Strong Password 제거
            returnKeyType='next' // 확인 버튼 타입
            submitBehavior={submitBehavior} // 엔터 눌러도 키보드 안 내려감
            onSubmitEditing={() => setFocus("passwordConfirm")} //비밀번호로 포커스 이동 (도착지에 ref달아야 함)
          />
        );
      }}
    />
  );
}

export default PasswordInput;
