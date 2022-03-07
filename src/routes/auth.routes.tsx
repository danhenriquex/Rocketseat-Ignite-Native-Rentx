import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Confirmation } from "screens/Confirmation";
import { Home } from "screens/Home";
import { SignIn } from "screens/SignIn";
import {
  SignUpFirstStep,
  ValidateFirstStep,
} from "screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "screens/SignUp/SignUpSecondStep";
import { Splash } from "screens/Splash";

const { Navigator, Screen } = createStackNavigator();

export function AppAuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
