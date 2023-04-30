export function render( data ) {
    let message = "🛳️\n";
    message += "🧭 " + data.latitude + "𝙉 " + data.longitude+ "𝙀\n";
    message += "🏴‍☠️ " + data.country + "\n";
    message += "📍 " + data.county;
    if ( data.type === "amenity" ) {
        message += "⚓";
    }
    message += "\n";
    return message;
}