import React from "react";
import { Home } from "screens/Home";
import { CarDetails } from "screens/CarDetails";
import { Scheduling } from "screens/Scheduling";
import { SchedulingDetails } from "screens/SchedulingDetails";
import { Confirmation } from "screens/Confirmation";
import { createStackNavigator } from "@react-navigation/stack";
import { CarDTO } from "dtos/CarDTO";
import { MyCars } from "screens/MyCars";
import { Splash } from "screens/Splash";
import { SignIn } from "screens/SignIn";
import {
  SignUpFirstStep,
  ValidateFirstStep,
} from "screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "screens/SignUp/SignUpSecondStep";
import { Car } from "database/model/Car";

const { Navigator, Screen } = createStackNavigator();

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: string;
      SignUpFirstStep: string;
      SignUpSecondStep: { user: ValidateFirstStep };
      CarDetails: { car: Car };
      Scheduling: { car: Car };
      SchedulingDetails: {
        car: CarDTO;
        dates: string[];
      };
      Confirmation: {
        title: string;
        message: string;
        nextScreenRoute: string;
      };
      MyCars: string;
    }
  }
}

export function AppStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
