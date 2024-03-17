import path from "path";
import dotenv from "dotenv";
import { Telegraf, Scenes, session } from "telegraf";
import TelegrafI18n from "telegraf-i18n";
import startScene from "./controllers/start/index.js";
import getQRScene from "./controllers/getQR/index.js";
import scanQRScene from "./controllers/scanQR/index.js";
import reportFormScene from "./controllers/reportForm/index.js";
import historyScene from "./controllers/history/index.js";

import asyncWrapper from "./util/error-handler.js";
import sequelize from "./services/db/index.js";
import { syncModels } from "./services/db/syncModels.js";
// import { fillExample } from "./services/db/fillExample.js";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

syncModels();

// fillExample();

try {
    await sequelize.authenticate();
    console.log("Соединение с БД было успешно установлено");
} catch (e) {
    console.log("Невозможно выполнить подключение к БД: ", e);
}

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const stage = new Scenes.Stage([startScene, getQRScene, scanQRScene, reportFormScene, historyScene]);
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

bot.telegram.setMyCommands([{ command: "start", description: "На главную" }]);

bot.start(asyncWrapper(async (ctx) => ctx.scene.enter("start")));

bot.hears(
    TelegrafI18n.match("keyboards.mainKeyboard.getQR"),
    asyncWrapper(async (ctx) => await ctx.scene.enter("getQR"))
);

bot.hears(
    TelegrafI18n.match("keyboards.mainKeyboard.scanQR"),
    asyncWrapper(async (ctx) => await ctx.scene.enter("scanQR"))
);

bot.hears(
    TelegrafI18n.match("keyboards.backKeyboard.toMain"),
    asyncWrapper(async (ctx) => ctx.scene.enter("start"))
);

bot.startPolling();
