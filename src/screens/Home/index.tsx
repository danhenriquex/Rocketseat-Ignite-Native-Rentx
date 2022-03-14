import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  BackHandler,
  Alert,
  Button,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { useNetInfo } from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import { IconLogo } from "assets";
import { Car } from "components/Car";
import { Ionicons } from "@expo/vector-icons";
import {
  HeaderContent,
  Container,
  Header,
  TotalCars,
  CarList,
  MyCarsButton,
} from "./styles";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/core";
import { api } from "services/api";
import { CarDTO } from "dtos/CarDTO";
import { Load } from "components/Load";
import { LoadAnimation } from "components/LoadAnimation";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
import { database } from "database";
import { Car as ModelCar } from "database/model/Car";

export function Home() {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: positionX.value,
        },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  const navigation = useNavigation();
  const theme = useTheme();

  function handleCarDetails(car: ModelCar) {
    navigation.navigate("CarDetails", { car });
  }

  async function offlineSyncronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        console.log(lastPulledAt);
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt ?? 0}`
        );

        const { changes, latestVersion } = response.data;

        console.log(changes);

        return { changes: changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;

        await api.post("/users/sync", user).catch(console.log);
      },
    });
  }

  // function handleOpenMyCars() {
  //   navigation.navigate("MyCars");
  // }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>("cars");
        const cars = await carCollection.query().fetch();

        if (isMounted) {
          setCars(cars);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", () => {
  //     return true;
  //   });
  // }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSyncronize();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Header>
        <HeaderContent>
          <IconLogo width={RFValue(108)} height={RFValue(12)} />

          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
      {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            { position: "absolute", right: 22, bottom: 13 },
          ]}
        >
          <ButtonAnimated style={styles.button} onPress={handleOpenMyCars}>
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}
    </Container>
  );
}

// const styles = StyleSheet.create({
//   button: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#dc1637",
//   },
// });
