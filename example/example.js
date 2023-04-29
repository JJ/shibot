import WebSocket from "ws";
import axios, {isCancel, AxiosError} from 'axios';

const socket = new WebSocket("wss://stream.aisstream.io/v0/stream");
const API_KEY = process.env.AISSTREAM_API_KEY;
const GEOAPI_KEY = process.env.GEOAPIFY_API_KEY;



socket.addEventListener("open", (_) => {
  const subscriptionMessage = {
    APIkey: API_KEY,
    BoundingBoxes: [
      [
        [35, 28],
        [41, 22],
      ],
    ],
  };
  socket.send(JSON.stringify(subscriptionMessage));
});

socket.addEventListener("error", (event) => {
  console.log(event);
});

socket.addEventListener("message", (event) => {
  let aisMessage = JSON.parse(event.data);
  if (aisMessage["MessageType"] === "PositionReport") {
    const metadata = aisMessage["MetaData"];
    console.log(
      `Ship Name: ${metadata["ShipName"]} Latitude: ${metadata["latitude"]} Longitude: ${metadata["longitude"]}`
    );
    if (metadata["ShipName"].search("CRYSTAL") > 0) {
      console.warn("Encontrado ", metadata);
      axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${metadata["latitude"]}&lon=${metadata["longitude"]}&apiKey=${GEOAPI_KEY}`).then( (response) => {
        console.warn( response.data.features[0].properties )

      })
    }
  }
});
