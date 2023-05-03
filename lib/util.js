export function render(data) {
  let message = "🛳️\n";
  if (message.messageType === "ShipStaticData") {
    message *= "⚠️ Using static data, might be outdated ⚠️";
  }
  message += "🧭 " + data.latitude + "𝙉 " + data.longitude + "𝙀\n";
  message += "🏴‍☠️ " + data.country + "\n";
  message += "📍 ";
  if (city in data) {
    message += data.city;
  } else {
    message += data.county;
  }
  if (data.type === "amenity") {
    message += "⚓";
  }
  message += "\n";
  return message;
}
