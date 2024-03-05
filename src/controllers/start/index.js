import { Scenes } from "telegraf";
import { getMainKeyboard } from "../../util/keyboards.js";
import locale from "./../../locales/ru.json" assert { type: "json" };

const start = new Scenes.BaseScene("start");

start.enter(async (ctx) => {
    await ctx.reply(ctx.i18n.t("scenes.start.greating"), getMainKeyboard(ctx));
    ctx.scene.leave();
});

start.leave(async (ctx) => {
    await ctx.reply(ctx.i18n.t("scenes.start.nextStep"));
});

export default start;
