import React, { useState, useEffect, ChangeEvent } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import {
  View,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AppLoading } from "expo";

interface IBGEUFResponse {
  sigla: string;
}
interface IBGECityResponse {
  nome: string;
}

const Home = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const navigation = useNavigation();

  const [uf, setUf] = useState("0");
  const [city, setCity] = useState("0");

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla).sort();
        setUfs(ufInitials);
      });
  }, []);
  if (!ufs) {
    return <AppLoading />;
  }
  useEffect(() => {
    if (uf === "0") return;
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome).sort();
        setCities(cityNames);
      });
  }, [uf]);

  const placeholderUf = {
    label: "Selecione o estado",
    value: null,
    color: "#9EA0A4",
  };
  const placeholderCity = {
    label: "Selecione a cidade",
    value: null,
    color: "#9EA0A4",
  };

  function handleNavigateToPoints() {
    navigation.navigate("Points", {
      uf,
      city,
    });
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ImageBackground
        source={require("../../assets/home-background.png")}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require("../../assets/logo.png")} />
          <Text style={styles.title}>
            Seu marketplace de coleta de resíduos
          </Text>
          <Text style={styles.description}>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </Text>
        </View>

        <View style={styles.footer}>
          <View>
            <RNPickerSelect
              onValueChange={(value) => setUf(value)}
              value={uf}
              style={pickerSelectStyles}
              placeholder={placeholderUf}
              items={ufs.map((uf) => {
                return { label: uf, value: uf };
              })}
              useNativeAndroidPickerStyle={false}
            />
            <RNPickerSelect
              onValueChange={(value) => setCity(value)}
              value={city}
              style={pickerSelectStyles}
              placeholder={placeholderCity}
              items={cities.map((uf) => {
                return { label: uf, value: uf };
              })}
              useNativeAndroidPickerStyle={false}
            />
          </View>
          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    fontSize: 16,
    backgroundColor: "#FFF",
    paddingVertical: 12,
    marginBottom: 8,
    paddingHorizontal: 24,
    borderRadius: 10,
    color: "#6C6C80",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    backgroundColor: "#FFF",
    height: 60,
    fontSize: 16,
    paddingVertical: 12,
    marginBottom: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    color: "#6C6C80",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default Home;
