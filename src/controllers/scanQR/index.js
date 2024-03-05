import { Scenes } from "telegraf";
import TelegrafI18n from "telegraf-i18n";
import { getBackKeyboard, getMainKeyboard } from "../../util/keyboards.js";

const scanQR = new Scenes.BaseScene("scanQR");

const { leave } = Scenes.Stage;

scanQR.enter(async (ctx) => {
    await ctx.reply(ctx.i18n.t("scenes.scanQR.start"), getBackKeyboard(ctx));
});

scanQR.leave(async (ctx) => {
    await ctx.reply(ctx.i18n.t("scenes.start.nextStep"), getMainKeyboard(ctx));
});

scanQR.hears(TelegrafI18n.match("keyboards.backKeyboard.back"), leave());

export default scanQR;
