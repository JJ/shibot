import WebSocket from "ws";
import axios from "axios";
import { writeFileSync } from "fs";

const socket = new WebSocket("wss://stream.aisstream.io/v0/stream");
const API_KEY = process.env.AISSTREAM_API_KEY;
const GEOAPI_KEY = process.env.GEOAPIFY_API_KEY;
const SHIP_NAME = process.env.SHIP_NAME.toUpperCase();
const ROUNDING_PRECISION = 4;

socket.addEventListener("open", (_) => {
  const subscriptionMessage = {
    APIkey: API_KEY,
    BoundingBoxes: [
      [
        [41, 22],
        [35, 28],
      ],
    ],
  };
  socket.send(JSON.stringify(subscriptionMessage));
});

socket.addEventListener("error", (event) => {
  console.error(event);
});

socket.addEventListener("message", (event) => {
  let aisMessage = JSON.parse(event.data);
  const metadata = aisMessage["MetaData"];
  if (metadata["ShipName"].indexOf(SHIP_NAME) >= 0) {
    console.warn("Encontrado ", metadata);
    const roundLat = metadata["latitude"].toFixed(ROUNDING_PRECISION);
    const roundLon = metadata["longitude"].toFixed(ROUNDING_PRECISION);

    axios
      .get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${roundLat}&lon=${roundLon}&apiKey=${GEOAPI_KEY}`
      )
      .then((response) => {
        const properties = response.data.features[0].properties;
        console.log(properties);
        console.warn(
          `🛳️ Country ${properties.country}; state ${properties.state}; county ${properties.county}; type ${properties.result_type}; importance ${properties.rank.importance}`
        );
        if (properties.result_type === "amenity") {
          console.warn("🚢 En el puerto");
        }
        if (aisMessage.messageType === "ShipStaticData") {
          console.warn(" Using ShipStaticData");
        }
        const data = {
          country: properties.country,
          state: properties.state,
          county: properties.county,
          type: properties.result_type,
          importance: properties.rank.importance,
          latitude: roundLat,
          longitude: roundLon,
          messageType: aisMessage.messageType,
        };
        if ("city" in properties) {
          data.city = properties.city;
        }
        writeFileSync("ship-position.json", JSON.stringify(data));
      });
  }
});
