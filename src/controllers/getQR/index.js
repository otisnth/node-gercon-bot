import { Scenes } from "telegraf";
import locale from "./../../locales/ru.json" assert { type: "json" };

const getQR = new Scenes.BaseScene("getQR");

getQR.enter(async (ctx) => {
    await ctx.reply(locale.scenes.getQR.start);
    ctx.scene.leave();
});

getQR.leave(async (ctx) => {});

export default getQR;
