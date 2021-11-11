import React from "react";
import { Home } from "screens/Home";
import { CarDetails } from "screens/CarDetails";
import { Scheduling } from "screens/Scheduling";
import { SchedulingDetails } from "screens/SchedulingDetails";
import { SchedulingComplete } from "screens/SchedulingComplete";
import { createStackNavigator } from "@react-navigation/stack";
import { CarDTO } from "dtos/CarDTO";

const { Navigator, Screen } = createStackNavigator();

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: string;
      CarDetails: { car: CarDTO };
      Scheduling: string;
      SchedulingDetails: string;
      SchedulingComplete: string;
    }
  }
}

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
    </Navigator>
  );
}
