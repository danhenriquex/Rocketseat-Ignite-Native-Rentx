import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import { IconLogoBackgroundGray, IconDone } from "assets";
import { ConfirmButton } from "components/ConfirmButton";
import { Container, Content, Title, Message, Footer } from "./styles";
import { useNavigation } from "@react-navigation/core";

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export function Confirmation() {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();
  const route = useRoute();
  const { title, message, nextScreenRoute } = route.params as Params;

  function handleGoHome() {
    navigation.navigate(nextScreenRoute);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <IconLogoBackgroundGray width={width} />

      <Content>
        <IconDone width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleGoHome} />
      </Footer>
    </Container>
  );
}
