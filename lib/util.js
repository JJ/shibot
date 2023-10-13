export function render(data) {
  let message = `🛳️ ${data.ship}\n`;
  if (data.messageType === "ShipStaticData") {
    message += "⚠️ Using static data, might be outdated ⚠️\n";
  }
  message += "🧭 " + data.latitude + "𝙉 " + data.longitude + "𝙀\n";
  message += "🏴‍☠️ " + data.country + "\n";
  message += `📍 ${sayWhere(data)} `;

  if (data.type === "amenity") {
    message += "⚓";
  }
  message += "\n";
  return message;
}

export function sayWhere(data) {
  if ("city" in data) {
    return data.city;
  } else if ("county" in data) {
    return data.county;
  } else {
    return "🌊 the sea 🌊";
  }
}
