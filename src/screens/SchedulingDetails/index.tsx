import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Accessory } from "components/Accessory";
import { Button } from "components/Button";
import { BackButton } from "components/BackButton";
import { ImageSlider } from "components/ImageSlider";
import { getAccessoryIcon } from "utils/getAccessoryIcon";
import { Alert } from "react-native";
import { format } from "date-fns";
import uuid from "uuid";
import {
  Container,
  Header,
  CarImage,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Params } from "screens/CarDetails";
import { getPlataformDate } from "utils/getPlataformDate";
import { api } from "services/api";
import { useNetInfo } from "@react-native-community/netinfo";
import { CarDTO } from "dtos/CarDTO";
import { useAuth } from "hooks/auth";

interface NewParams extends Params {
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

interface ResponseProps {
  unavailable_dates: string[];
}

export function SchedulingDetails() {
  const [carUpdate, setCarUpdate] = useState<CarDTO>({} as CarDTO);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const { user } = useAuth();
  const route = useRoute();
  const { car, dates } = route.params as NewParams;

  async function handleConfirmRental() {
    setLoading(true);
    // const schedulesByCar = await api.get<ResponseProps>(
    //   `/schedules_bycars/${car.id}`
    // );

    // const unavailable_dates = [
    //   ...schedulesByCar.data.unavailable_dates,
    //   ...dates,
    // ];

    // await api.post("/schedules_byuser", {
    //   user_id: 3333,
    //   car,
    //   startDate: format(getPlataformDate(new Date(dates[0])), "dd/MM/yyyy"),
    //   endDate: format(
    //     getPlataformDate(new Date(dates[dates.length - 1])),
    //     "dd/MM/yyyy"
    //   ),
    // });

    await api
      .post("/rentals", {
        user_id: user.user_id,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      })
      .then(() =>
        navigation.navigate("Confirmation", {
          nextScreenRoute: "Home",
          title: "Carro alugado!",
          message: `Agora você só precisa ir\n até a concessionária da RENTX\n pegar o seu automóvel`,
        })
      )
      .catch(() => {
        setLoading(false);
        Alert.alert("Erro ao reservar o carro");
      });

    // await api
    //   .put(`/schedules_bycars/${car.id}`, {
    //     id: car.id,
    //     unavailable_dates,
    //   })
    //   .then(() =>
    //     navigation.navigate("Confirmation", {
    //       nextScreenRoute: "Home",
    //       title: "Carro alugado!",
    //       message: `Agora você só precisa ir\n até a concessionária da RENTX\n pegar o seu automóvel`,
    //     })
    //   )
    //   .catch(() => {
    //     setLoading(false);
    //     Alert.alert("Erro ao reservar o carro");
    //   });
  }

  const rentTotal = Number(dates.length) * car.price;

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlataformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlataformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  useEffect(() => {
    async function fetchOnlineData() {
      const response = await api.get(`cars/${car.id}`);
      setCarUpdate(response.data);
    }

    if (netInfo.isConnected === true) {
      fetchOnlineData();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <CarImage>
        <ImageSlider
          imagesUrl={
            !!carUpdate.photos
              ? carUpdate.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImage>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>
        {carUpdate.accessories && (
          <Accessories>
            {carUpdate.accessories.map((accessory) => (
              <Accessory
                key={accessory.type}
                icon={getAccessoryIcon(accessory.type)}
                name={accessory.name}
              />
            ))}
          </Accessories>
        )}

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          loading={loading}
          enabled={!loading}
        />
      </Footer>
    </Container>
  );
}
