import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const Images = [
  { image: require("../../assets/banners/bioferia.jpg") },
  { image: require("../../assets/banners/feria_artesanal.jpg") },
  { image: require("../../assets/banners/feria_del_libro.jpg") },
  { image: require("../../assets/banners/feria_flores.jpg") },
  { image: require("../../assets/banners/feria_productos.jpg") },
];

export const markers = [
  {
    coordinate: {
      latitude: -12.097712,
      longitude: -77.060307,
    },
    title: "Venta de Garage",
    description: "Venta de articulos de hogar y ropa",
    image: Images[0].image,
    rating: 4,
    reviews: 11,
    icon: <MaterialCommunityIcons name="sale" size={30} color="blue" />,
  },
  {
    coordinate: {
      latitude: -12.10082,
      longitude: -77.063925,
    },
    title: "Feria Artesanal",
    description: "Venta de artesania de la sierra y selva peruana",
    image: Images[1].image,
    rating: 3.5,
    reviews: 12,
    icon: <MaterialIcons color="red" name="festival" size={30} />,
  },
  {
    coordinate: {
      latitude: -12.094184,
      longitude: -77.078381,
    },
    title: "Feria del Libro",
    description: "",
    image: Images[2].image,
    rating: 2,
    reviews: 6,
    icon: <MaterialIcons color="red" name="festival" size={30} />,
  },
  {
    coordinate: {
      latitude: -12.108158,
      longitude: -77.054653,
    },
    title: "Feria Floricultural Peruana",
    description:
      "Naturaleza Creativa: La feria de diseño con diversidad de flores",
    image: Images[3].image,
    rating: 5,
    reviews: 48,
    icon: <MaterialIcons color="red" name="festival" size={30} />,
  },
  {
    coordinate: {
      latitude: -12.098794,
      longitude: -77.058413,
    },
    title: "Feria diversa con productos organicos",
    description:
      "Feria de compras al aire libre, disfrute en familia de la comida, haga compras y admire productos locales",
    image: Images[4].image,
    rating: 4.6,
    reviews: 44,
    icon: <MaterialIcons color="red" name="festival" size={30} />,
  },
];

export const mapDarkStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];

export const mapStandardStyle = [
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];
