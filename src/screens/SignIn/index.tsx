import React, { useState, useEffect } from "react";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import * as Yup from "yup";
import { useTheme } from "styled-components";
import { Button } from "components/Button";
import { Input } from "components/Input";
import { PasswordInput } from "components/PasswordInput";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "hooks/auth";

import { Container, Header, SubTitle, Title, Form, Footer } from "./styles";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const theme = useTheme();
  const navigation = useNavigation();
  const { signIn } = useAuth();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("Senha obrigatória"),
      });

      await schema.validate({ email, password });

      await signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Erro na validação", error.message);
      } else {
        Alert.alert(
          "Erro na autenticação, você preencheu os dados corretamente?"
        );
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate("SignUpFirstStep");
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="transparent"
          />
          <Header>
            <Title>Estamos {"\n"}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar {"\n"}uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              // enabled={false}
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              onPress={handleNewAccount}
              // enabled={false}
              loading={false}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
