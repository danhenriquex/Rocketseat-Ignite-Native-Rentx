import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";
import { IconLogoBackgroundGray, IconDone } from "assets";
import { ConfirmButton } from "components/ConfirmButton";
import { Container, Content, Title, Message, Footer } from "./styles";
import { useNavigation } from "@react-navigation/core";

export function SchedulingComplete() {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  function handleGoHome() {
    navigation.navigate("Home");
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
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {"\n"}
          até a concessionária da RENTX {"\n"}
          pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleGoHome} />
      </Footer>
    </Container>
  );
}
