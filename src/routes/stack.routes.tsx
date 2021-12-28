import React from "react";
import { Home } from "screens/Home";
import { CarDetails } from "screens/CarDetails";
import { Scheduling } from "screens/Scheduling";
import { SchedulingDetails } from "screens/SchedulingDetails";
import { SchedulingComplete } from "screens/SchedulingComplete";
import { createStackNavigator } from "@react-navigation/stack";
import { CarDTO } from "dtos/CarDTO";
import { MyCars } from "screens/MyCars";
import { Splash } from "screens/Splash";

const { Navigator, Screen } = createStackNavigator();

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: string;
      CarDetails: { car: CarDTO };
      Scheduling: { car: CarDTO };
      SchedulingDetails: {
        car: CarDTO;
        dates: string[];
      };
      SchedulingComplete: string;
      MyCars: string;
    }
  }
}

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
