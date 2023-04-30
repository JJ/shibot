import { Telegraf } from 'telegraf';
import {readFileSync } from 'fs';
import {render} from "../lib/util.js";

console.log(JSON.parse(readFileSync("./ship-position.json", { encoding: 'utf8', flag: 'r' })))
let positionData = readData();
console.log( "Última posición", positionData);

const bot = new Telegraf(process.env.BRBSTR_TOKEN);
console.log( "Starting bot");

bot.command('barb', Telegraf.reply('Star'));
bot.command('star', Telegraf.reply('Barb'));
bot.command('donde', Telegraf.reply(donde()));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

function donde() {
    return render(readData())
}

function readData() {
    return JSON.parse(readFileSync("./ship-position.json", { encoding: 'utf8', flag: 'r' }))
}