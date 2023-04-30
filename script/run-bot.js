import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BRBSTR_TOKEN);

bot.command('barb', (ctx) => ctx.reply('Star'));
bot.command('star', Telegraf.reply('barb'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));