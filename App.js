import React, { useState, useEffect, useRef } from "react";
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Animated,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { markers, mapDarkStyle, mapStandardStyle } from "./src/models/mapData";
import {
  Ionicons,
  MaterialCommunityIcons,
  Fontisto,
  MaterialIcons,
  FontAwesome,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";

import { useTheme } from "@react-navigation/native";

import * as Location from "expo-location";
import StarRating from "./src/components/StarRating";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 320;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export default function App() {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const theme = useTheme();
  const initialMapState = {
    markers,
    categories: [
      {
        name: "Ferias",
        icon: (
          <MaterialIcons
            style={styles.chipsIcon}
            name="festival"
            color="red"
            size={18}
          />
        ),
      },
      {
        name: "Actividades",
        icon: <Feather name="activity" size={18} color="blue" />,
      },
      {
        name: "Shows",
        icon: (
          <FontAwesome5
            name="theater-masks"
            style={styles.chipsIcon}
            size={18}
          />
        ),
      },
      {
        name: "Liquidaciones",
        icon: (
          <MaterialIcons
            name="local-offer"
            style={styles.chipsIcon}
            size={18}
          />
        ),
      },
      {
        name: "Muestras gratis",
        icon: (
          <MaterialIcons
            name="attach-money"
            style={styles.chipsIcon}
            size={15}
          />
        ),
      },
    ],
    // region: {
    //   latitude: 22.62938671242907,
    //   longitude: 88.4354486029795,
    //   latitudeDelta: 0.04864195044303443,
    //   longitudeDelta: 0.040142817690068,
    // },
  };

  const [state, setState] = useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    console.log("blon!");
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = state.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              // latitudeDelta: 0.04864195044303443,
              // longitudeDelta: 0.040142817690068,
              latitudeDelta: 0.00962,
              longitudeDelta: 0.00961,
              // latitudeDelta: state.region.latitudeDelta,
              // longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const _map = useRef(null);
  const _scrollView = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permiso para acceder a la ubicacion denegado");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setLocation(location.coords);
      setLoading(false);
    })();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.middleContainer}>
        <Text style={styles.middleText}>{errorMsg}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.middleContainer}>
        <Text style={styles.middleText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        // initialRegion={location}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0262,
          longitudeDelta: 0.0261,
        }}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
      >
        <Marker
          coordinate={{
            latitude: -12.1001093,
            longitude: -77.0628235,
          }}
          description={"This is a marker in React Native"}
          pinColor="red"
        >
          <Image
            source={require("./assets/person.png")}
            style={{ height: 55, width: 55 }}
            color="red"
          />
        </Marker>
        <Circle
          center={{ latitude: -12.1001093, longitude: -77.0628235 }}
          radius={2500}
          strokeColor="rgba(251, 247, 33, 1)"
          lineCap="round"
          lineJoin="miter"
          fillColor="rgba(251, 247, 33, 0.3)"
        />
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker
              key={index}
              coordinate={marker.coordinate}
              onPress={(e) => onMarkerPress(e)}
            >
              <View style={styles.markerWrap}>
                <Animated.View style={[styles.markerWrap]}>
                  <MaterialIcons
                    style={styles.chipsIcon}
                    name="festival"
                    size={30}
                    color="red"
                  />
                  <Animated.Image
                    // source={require("./assets/map_marker.png")}
                    style={[styles.marker, scaleStyle]}
                    resizeMode="cover"
                  >
                    {/*<View style={[styles.marker, scaleStyle]} resizeMode="cover">*/}

                    {/*</View>*/}
                  </Animated.Image>
                </Animated.View>
              </View>
            </MapView.Marker>
          );
        })}
      </MapView>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Buscar"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
        />
        <Ionicons name="ios-search" size={20} />
      </View>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{
          // iOS only
          top: 0,
          left: 0,
          bottom: 0,
          right: 20,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === "android" ? 20 : 0,
        }}
      >
        {state.categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem}>
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {state.markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={marker.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {marker.title}
              </Text>
              <StarRating ratings={marker.rating} reviews={marker.reviews} />
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.description}
              </Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[
                    styles.signIn,
                    {
                      borderColor: "#FF6347",
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#FF6347",
                      },
                    ]}
                  >
                    Ir
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
    // <View style={styles.container}>
    //   <MapView
    //     style={styles.map}
    //     showsCompass={true}
    //     provider={PROVIDER_GOOGLE}
    //     loadingEnabled={true}
    //     initialRegion={{
    //       latitude: location.latitude,
    //       longitude: location.longitude,
    //       latitudeDelta: 0.0262,
    //       longitudeDelta: 0.0261,
    //     }}
    //   >
    //     <Marker coordinate={{ latitude: -12.1001093, longitude: -77.0628235 }}>
    //       <Callout>
    //         <Text>Casa</Text>
    //       </Callout>
    //     </Marker>
    //     <Circle
    //       center={{ latitude: -12.1001093, longitude: -77.0628235 }}
    //       radius={2500}
    //       strokeColor="rgba(251, 247, 33, 1)"
    //       // strokeWidth={1}
    //       lineCap="round"
    //       lineJoin="miter"
    //       fillColor="rgba(251, 247, 33, 0.2)"
    //     />
    //   </MapView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 19,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: "#444",
    paddingBottom: 10,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
  middleContainer: {
    flex: 1,
    backgroundColor: "#290af2",
    color: "#ffffff",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  middleText: {
    color: "#ffffff",
    fontSize: 30,
  },
});
