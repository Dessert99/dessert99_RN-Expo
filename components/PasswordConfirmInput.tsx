import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import InputField from "./InputField";

function PasswordConfirmInput() {
  const { control } = useFormContext();

  //비밀번호 가져오기
  const password = useWatch({ control, name: "password" });
  return (
    <Controller
      name='passwordConfirm'
      control={control}
      rules={{
        validate: (data: string) => {
          if (data !== password) {
            return "비밀번호가 일치하지 않습니다.";
          }
        },
      }}
      // 표시할 컴포넌트
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => {
        return (
          <InputField
            ref={ref}
            label='비밀번호 확인'
            placeholder='비밀번호를 입력해주세요'
            value={value}
            onChangeText={onChange}
            error={error?.message}
            secureTextEntry // 암호화
            textContentType='oneTimeCode' //Strong Password 제거
          />
        );
      }}
    />
  );
}

export default PasswordConfirmInput;
