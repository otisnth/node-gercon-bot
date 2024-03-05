import dotenv from "dotenv";
import { Telegraf, Scenes, session } from "telegraf";
import startScene from "./controllers/start/index.js";

import asyncWrapper from "./util/error-handler.js";

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const stage = new Scenes.Stage([startScene]);

bot.use(session());
bot.use(stage.middleware());

bot.start(asyncWrapper(async (ctx) => ctx.scene.enter("start")));

bot.startPolling();
