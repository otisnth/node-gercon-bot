import dotenv from "dotenv";
import { Telegraf, Scenes, session } from "telegraf";
import startScene from "./controllers/start/index.js";
import getQRScene from "./controllers/getQR/index.js";
import scanQRScene from "./controllers/scanQR/index.js";

import asyncWrapper from "./util/error-handler.js";
import { initDB } from "./services/db/index.js";

dotenv.config();

const db = initDB();

try {
    await db.authenticate();
    console.log("Соединение с БД было успешно установлено");
} catch (e) {
    console.log("Невозможно выполнить подключение к БД: ", e);
}

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const stage = new Scenes.Stage([startScene, getQRScene, scanQRScene]);

bot.use(session());
bot.use(stage.middleware());

bot.start(asyncWrapper(async (ctx) => ctx.scene.enter("start")));

bot.hears(
    "Получить тестовый QR-код",
    asyncWrapper(async (ctx) => await ctx.scene.enter("getQR"))
);

bot.hears(
    "Сканировать QR-код",
    asyncWrapper(async (ctx) => await ctx.scene.enter("scanQR"))
);

bot.startPolling();
