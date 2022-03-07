import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { BackButton } from "components/BackButton";
import { Bullet } from "components/Bullet";
import { PasswordInput } from "components/PasswordInput";
import { Button } from "components/Button";

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from "./styles";
import { ValidateFirstStep } from "../SignUpFirstStep";
import { api } from "services/api";

interface Params {
  user: ValidateFirstStep;
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegisterUser() {
    if (!password || !confirmPassword) {
      return Alert.alert("Informe a senha e a confirmação dela.");
    }

    if (password !== confirmPassword) {
      return Alert.alert("As senhas não conferem.");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.driveLicense,
        password,
      })
      .then(() => {
        navigation.navigate("Confirmation", {
          nextScreenRoute: "SignIn",
          title: "Conta criada!",
          message: `Agora é só fazer login\n e aproveitar`,
        });
      })
      .catch(() => Alert.alert("Opa, não foi possível criar o usuário."));

    // Enviar para API
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Form>
            <FormTitle>2. Dados</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              secureTextEntry
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </Form>
          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegisterUser}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
