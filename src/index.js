import path from "path";
import dotenv from "dotenv";
import { Telegraf, Scenes, session } from "telegraf";
import TelegrafI18n from "telegraf-i18n";
import startScene from "./controllers/start/index.js";
import getQRScene from "./controllers/getQR/index.js";
import scanQRScene from "./controllers/scanQR/index.js";

import asyncWrapper from "./util/error-handler.js";
import sequelize from "./services/db/index.js";
import { syncModels } from "./services/db/syncModels.js";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

syncModels();

try {
    await sequelize.authenticate();
    console.log("Соединение с БД было успешно установлено");
} catch (e) {
    console.log("Невозможно выполнить подключение к БД: ", e);
}

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const stage = new Scenes.Stage([startScene, getQRScene, scanQRScene]);
const i18n = new TelegrafI18n({
    defaultLanguage: "ru",
    directory: path.resolve(__dirname, "locales"),
    useSession: true,
    allowMissing: false,
    sessionName: "session",
});

bot.use(session());
bot.use(i18n.middleware());
bot.use(stage.middleware());

bot.start(asyncWrapper(async (ctx) => ctx.scene.enter("start")));

bot.hears(
    TelegrafI18n.match("keyboards.mainKeyboard.getQR"),
    asyncWrapper(async (ctx) => await ctx.scene.enter("getQR"))
);

bot.hears(
    TelegrafI18n.match("keyboards.mainKeyboard.scanQR"),
    asyncWrapper(async (ctx) => await ctx.scene.enter("scanQR"))
);

bot.startPolling();
