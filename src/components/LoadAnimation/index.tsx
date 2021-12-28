import React from "react";

import LottieView from "lottie-react-native";

import LoadCar from "assets/load_animated.json";

import { Container } from "./styles";

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        style={{ height: 200 }}
        resizeMode="contain"
        source={LoadCar}
        autoPlay
        loop
      />
    </Container>
  );
}
