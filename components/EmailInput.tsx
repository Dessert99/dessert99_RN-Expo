import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

function EmailInput() {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name='email'
      control={control}
      //유효성 검사
      rules={{
        validate: (data: string) => {
          if (data.length === 0) {
            return "이메일을 입력해주세요.";
          }
          if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(data)) {
            return "올바른 이메일을 넣어주세요.";
          }
        },
      }}
      // 표시할 컴포넌트
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => {
        return (
          <InputField
            label='이메일'
            placeholder='이메일을 입력해주세요'
            value={value}
            onChangeText={(text) => {
              onChange(text);
              console.log("error", error);
            }}
            error={error?.message} // 유효성 검사에서 리턴한 메시지를 error로 넘겨준다.
            autoFocus // 자동 포커스
            inputMode='email' // 목적에 맞는 키보드를 띄운다.
            returnKeyType='next' // 확인 버튼 타입
            submitBehavior='submit' // 엔터 눌러도 키보드 안 내려감
            onSubmitEditing={() => setFocus("password")} //비밀번호로 포커스 이동 (도착지에 ref달아야 함)
          />
        );
      }}
    />
  );
}

export default EmailInput;
