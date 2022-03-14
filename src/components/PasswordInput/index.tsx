import React, { useState } from "react";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { TextInputProps } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import { Container, IconContainer, InputText } from "./styles";

interface PasswordInputProps extends TextInputProps {
  iconName?: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function PasswordInput({
  iconName,
  value,
  ...rest
}: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function changeVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>
      <InputText
        isFocused={isFocused}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
        autoCorrect={false}
        secureTextEntry={isPasswordVisible}
      />

      <BorderlessButton onPress={changeVisibility}>
        <IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}
