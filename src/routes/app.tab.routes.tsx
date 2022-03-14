import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconHome, IconCar, IconPeople } from "assets";
import { Home } from "screens/Home";
import { MyCars } from "screens/MyCars";
import { AppStackRoutes } from "./app.stack.routes";
import { useTheme } from "styled-components";
import { Platform } from "react-native";
import { Profile } from "screens/Profile";

const { Navigator, Screen } = createBottomTabNavigator();

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: string;
      Profile: string;
      MyCars: string;
    }
  }
}

export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary,
        },
      }}
    >
      <Screen
        name="AppHome"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <IconHome width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <IconCar width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <IconPeople width={24} height={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
}
