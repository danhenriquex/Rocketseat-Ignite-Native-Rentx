import "intl";
import "intl/locale-data/jsonp/pt-BR";
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";
import {
  Inter_400Regular,
  Inter_500Medium,
  useFonts,
} from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import React from "react";
import { Routes } from "routes";
import { AppStackRoutes } from "routes/app.stack.routes";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import { AppProvider } from "hooks";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}
