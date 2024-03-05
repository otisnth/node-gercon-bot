import { Scenes } from "telegraf";
import locale from "./../../locales/ru.json" assert { type: "json" };
import { getBackKeyboard, getMainKeyboard } from "../../util/keyboards.js";

const scanQR = new Scenes.BaseScene("scanQR");

const { leave } = Scenes.Stage;

scanQR.enter(async (ctx) => {
    await ctx.reply(locale.scenes.scanQR.start, getBackKeyboard());
});

scanQR.leave(async (ctx) => {
    await ctx.reply(locale.scenes.start.nextStep, getMainKeyboard());
});

scanQR.hears(locale.keyboards.backKeyboard.back, leave());

export default scanQR;
