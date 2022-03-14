import React, { useState, useEffect } from "react";
import { CarDTO } from "dtos/CarDTO";
import { View, Text, StatusBar, FlatList } from "react-native";
import { api } from "services/api";
import { useTheme } from "styled-components";
import { BackButton } from "components/BackButton";
import { AntDesign } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointment,
  AppointmentTitle,
  AppointmentQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";
import { Car } from "components/Car";
import { LoadAnimation } from "components/LoadAnimation";
import { useAuth } from "hooks/auth";
import { Car as ModelCar } from "database/model/Car";
import { format, parseISO } from "date-fns";
import { useIsFocused } from "@react-navigation/native";

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}
interface DataProps {
  id: string;
  user_id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);

  const screenIsFocus = useIsFocused();
  const theme = useTheme();

  useEffect(() => {
    async function loadCars() {
      setLoading(true);
      try {
        const response = await api.get("/rentals");

        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            car: data.car,
            start_date: format(parseISO(data.start_date), "dd/mm/yyyy"),
            end_date: format(parseISO(data.end_date), "dd/mm/yyyy"),
          };
        });

        setCars(dataFormatted);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    }
    loadCars();
  }, [screenIsFocus]);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton color={theme.colors.shape} />

        <Title>
          Seus agendamentos, {"\n"}
          estão aqui.
        </Title>

        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appointment>
            <AppointmentTitle>Agendamentos feitos</AppointmentTitle>
            <AppointmentQuantity>{cars.length}</AppointmentQuantity>
          </Appointment>

          <FlatList
            data={cars}
            keyExtractor={(item) => String(item.car.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
