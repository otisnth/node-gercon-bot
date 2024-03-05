import { Scenes } from "telegraf";
import { getMainKeyboard } from "../../util/keyboards.js";
import locale from "./../../locales/ru.json" assert { type: "json" };

const start = new Scenes.BaseScene("start");

start.enter(async (ctx) => {
    await ctx.reply(locale.scenes.start.greating, getMainKeyboard());
    ctx.scene.leave();
});

start.leave(async (ctx) => {
    await ctx.reply(locale.scenes.start.nextStep);
});

export default start;
