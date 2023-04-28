const socket: WebSocket = new WebSocket("wss://stream.aisstream.io/v0/stream");
const API_KEY = Deno.env.get("AISSTREAM_API_KEY");
const subscriptionMessage: Object = {
  APIkey: API_KEY,
  BoundingBoxes: [
    [
      [35, 28],
      [41, 22],
    ],
  ],
};
const openMsg: string = JSON.stringify(subscriptionMessage);
console.log(openMsg);

socket.onopen = () => {
  socket.send(openMsg);
};

socket.onerror = (error) => {
  console.log(error);
};

socket.onmessage = (message) => {
  console.warn(message.data);
  const aisMessage: Object = message.data;
  if (aisMessage instanceof PositionReport) {
    const metadata = aisMessage["MetaData"];
    console.log(
      `Ship Name: ${metadata["ShipName"]} Latitude: ${metadata["latitude"]} Longitude: ${metadata["longitude"]}`
    );
    if (metadata["ShipName"].search("CRYS") > 0) {
      console.warn("Encontrado ", metadata);
    }
  }
};
