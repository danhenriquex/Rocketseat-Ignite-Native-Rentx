import React from "react";
import { Accessory } from "components/Accessory";
import { Button } from "components/Button";
import { BackButton } from "components/BackButton";
import { ImageSlider } from "components/ImageSlider";
import {
  IconSpeed,
  IconAcceleration,
  IconForce,
  IconGasoline,
  IconExchange,
  IconPeople,
} from "assets";
import {
  Container,
  Header,
  CarImage,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from "./styles";
import { useNavigation } from "@react-navigation/core";

export function CarDetails() {
  const navigation = useNavigation();

  function handleConfirmRental() {
    navigation.navigate("Scheduling");
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImage>
        <ImageSlider
          imagesUrl={[
            "https://www.pngkey.com/png/detail/383-3833840_rs-5-coup-price-from-audi-rs5-png.png",
          ]}
        />
      </CarImage>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>
        <Accessories>
          <Accessory icon={IconSpeed} name="380km/h" />
          <Accessory icon={IconAcceleration} name="3.2s" />
          <Accessory icon={IconForce} name="800 HP" />
          <Accessory icon={IconGasoline} name="Gasolina" />
          <Accessory icon={IconExchange} name="Auto" />
          <Accessory icon={IconPeople} name="2 pessoas" />
        </Accessories>

        <About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide
          indultado na praça Real Maestranza de Sevilla. É um belíssimo carro
          para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button
          title="Escolher período de aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
