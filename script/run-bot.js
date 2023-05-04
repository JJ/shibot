import { Telegraf } from "telegraf";
import { readFileSync } from "fs";
import { render } from "../lib/util.js";
const SHIP_DATA_FILE = "./ship-position.json";

let positionData = readData();
console.log("Última posición", positionData);

const bot = new Telegraf(process.env.BRBSTR_TOKEN);
console.log("Starting bot");

let lastLatitude = "0";
let lastLongitude = "0";

bot.command("barb", Telegraf.reply("Star"));
bot.command("star", Telegraf.reply("Barb"));
bot.command("donde", (ctx) => {
  ctx.reply(donde());
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

function donde() {
  const dataNow = readData();
  console.log("Read data");
  if (
    lastLatitude === dataNow.latitude &&
    lastLongitude === dataNow.longitude
  ) {
    return `⚓️ Still at 📍 ${positionData.county} ⚓️`;
  } else {
    console.log(lastLatitude, lastLongitude, dataNow);
    lastLatitude = dataNow.latitude;
    lastLongitude = dataNow.longitude;
    return render(dataNow);
  }
}

function readData() {
  console.log("Reading data");
  return JSON.parse(
    readFileSync(SHIP_DATA_FILE, { encoding: "utf8", flag: "r" })
  );
}
