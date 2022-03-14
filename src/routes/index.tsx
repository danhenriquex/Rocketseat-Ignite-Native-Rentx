import { NavigationContainer } from "@react-navigation/native";
import { LoadAnimation } from "components/LoadAnimation";
import { useAuth } from "hooks/auth";
import React from "react";
import { AppStackRoutes } from "./app.stack.routes";
import { AppTabRoutes } from "./app.tab.routes";
import { AppAuthRoutes } from "./auth.routes";

export function Routes() {
  const { user, loading } = useAuth();

  return loading ? (
    <LoadAnimation />
  ) : (
    <NavigationContainer>
      {user.id ? <AppTabRoutes /> : <AppAuthRoutes />}
    </NavigationContainer>
  );
}
