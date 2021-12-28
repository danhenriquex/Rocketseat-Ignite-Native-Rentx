import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Container } from "./styles";
import { BorderlessButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

interface Props extends BorderlessButtonProps {
  color?: string;
}

export function BackButton({ color, ...rest }: Props) {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container {...rest} onPress={handleBack}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color ? color : theme.colors.text}
      />
    </Container>
  );
}
