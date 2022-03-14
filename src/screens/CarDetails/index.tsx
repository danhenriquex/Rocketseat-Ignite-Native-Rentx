import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { useNetInfo } from "@react-native-community/netinfo";

import { useNavigation, useRoute } from "@react-navigation/core";
import { Accessory } from "components/Accessory";
import { BackButton } from "components/BackButton";
import { Button } from "components/Button";
import { ImageSlider } from "components/ImageSlider";
import { CarDTO } from "dtos/CarDTO";
import { getAccessoryIcon } from "utils/getAccessoryIcon";
import {
  About,
  Accessories,
  Brand,
  CarImage,
  Container,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent,
  OfflineInfo
} from "./styles";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useTheme } from "styled-components";
import { Car as ModelCar } from "database/model/Car";
import { api } from "services/api";

export interface Params {
  car: ModelCar;
}

export function CarDetails() {
  const [carUpdate, setCarUpdate] = useState<CarDTO>({} as CarDTO);

  const navigation = useNavigation();
  const route = useRoute();
  const netInfo = useNetInfo();
  const theme = useTheme();
  const { car } = route.params as Params;

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    console.log(event.contentOffset.y);
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handleConfirmRental() {
    navigation.navigate("Scheduling", { car });
  }

  useEffect(() => {
    async function fetchOnlineData() {
      const response = await api.get(`cars/${car.id}`);
      setCarUpdate(response.data);
    }

    if (netInfo.isConnected === true) {
      fetchOnlineData();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary },
        ]}
      >
        <Header>
          <BackButton />
        </Header>

        <Animated.View style={sliderCarsStyleAnimation}>
          <CarImage>
            <ImageSlider
              imagesUrl={
                !!carUpdate.photos
                  ? carUpdate.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </CarImage>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          marginTop: getStatusBarHeight() + 160,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {netInfo.isConnected === true ? car.price : "..."}</Price>
          </Rent>
        </Details>
        {carUpdate.accessories && (
          <Accessories>
            {carUpdate?.accessories?.map((accessory) => (
              <Accessory
                key={accessory.name}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        )}

        <About>{car.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher período de aluguel"
          onPress={handleConfirmRental}
          enabled={netInfo.isConnected === true}
        />

        {netInfo.isConnected === false && (
          <OfflineInfo>
            Conecte-se a Internet para ver mais detalhes e agendar seu carro.
          </OfflineInfo>
        )}
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
});
