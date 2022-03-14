import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { BackButton } from "components/BackButton";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from "./styles";
import { Input } from "components/Input";
import { PasswordInput } from "components/PasswordInput";
import { useAuth } from "hooks/auth";
import { Button } from "components/Button";
import { useNetInfo } from "@react-native-community/netinfo";

type Option = "dataEdit" | "passwordEdit";

export function Profile() {
  const { user, signOut, updatedUser } = useAuth();

  const [option, setOption] = useState<Option>("dataEdit");
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const netInfo = useNetInfo();
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  async function handleSignOut() {
    Alert.alert(
      "Tem certeza?",
      "Lembre-se que, Se você sair, irá precisar de internet para conectar-se novamente",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: () => signOut(),
        },
      ]
    );
  }

  function handleOptionChange(type: Option) {
    if (netInfo.isConnected === false && type === "passwordEdit") {
      Alert.alert(
        "Sem conexão",
        "Você precisa estar conectado para alterar sua senha"
      );
    } else {
      setOption(type);
    }
  }

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) return;

    if (result) {
      setAvatar(result.uri);
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("CNH é obrigatória"),
        name: Yup.string().required("Nome é obrigatório"),
      });

      await schema.validate({ driverLicense, name });

      console.log("entrou aqui");

      await updatedUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token,
      });

      Alert.alert("Alterações salvas com sucesso!");
    } catch (error) {
      console.log(error);
      if (error instanceof Yup.ValidationError) {
        Alert.alert(error.message);
      }

      Alert.alert("Não foi possível atualizar o perfil");
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && (
                <Photo
                  source={{
                    uri: avatar,
                  }}
                />
              )}
              <PhotoButton onPress={handleSelectAvatar}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === "dataEdit"}
                onPress={() => handleOptionChange("dataEdit")}
              >
                <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === "passwordEdit"}
                onPress={() => handleOptionChange("passwordEdit")}
              >
                <OptionTitle active={option === "passwordEdit"}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            {option === "dataEdit" ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  defaultValue={user.name}
                  onChangeText={setName}
                  autoCorrect={false}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  onChangeText={setDriverLicense}
                  defaultValue={user.driver_license}
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput iconName="lock" placeholder="Senha atual" />
                <PasswordInput iconName="mail" placeholder="Nova senha" />
                <PasswordInput
                  iconName="credit-card"
                  placeholder="Repetir senha"
                />
              </Section>
            )}
            <Button title="Salvar alterações" onPress={handleProfileUpdate} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
