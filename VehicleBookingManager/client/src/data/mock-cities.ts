import { City } from "@/types";

export const getMockCities = (): City[] => [
  {
    id: "c1",
    name: "Mumbai",
    imageUrl: "https://cdn.pixabay.com/photo/2014/07/11/23/03/gateway-of-india-390768_1280.jpg",
    vehiclesCount: 150
  },
  {
    id: "c2",
    name: "Chennai",
    imageUrl: "https://wallpaperaccess.com/full/2273827.jpg",
    vehiclesCount: 200
  },
  {
    id: "c3",
    name: "Bangalore",
    imageUrl: "https://wallpaperaccess.com/full/6999881.jpg",
    vehiclesCount: 180
  },
  {
    id: "c4",
    name: "Hyderabad",
    imageUrl: "https://wallpaperaccess.com/full/2142411.jpg",
    vehiclesCount: 120
  }
];

export default getMockCities;
