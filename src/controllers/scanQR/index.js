import { Scenes } from "telegraf";
import { message } from "telegraf/filters";
import TelegrafI18n from "telegraf-i18n";
import { getBackKeyboard, getMainKeyboard } from "../../util/keyboards.js";
import { scanQRAction, getHistory, sendReport } from "./action.js";

const scanQR = new Scenes.BaseScene("scanQR");

const { leave } = Scenes.Stage;

scanQR.enter(async (ctx) => {
    await ctx.reply(ctx.i18n.t("scenes.scanQR.start"), getBackKeyboard(ctx));
});

scanQR.hears(TelegrafI18n.match("keyboards.backKeyboard.back"), async (ctx) => {
    await ctx.reply(ctx.i18n.t("scenes.start.nextStep"), getMainKeyboard(ctx));
    leave();
});
scanQR.hears(TelegrafI18n.match("keyboards.scanOptionsKeyboard.history"), getHistory);
scanQR.hears(TelegrafI18n.match("keyboards.scanOptionsKeyboard.report"), sendReport);

scanQR.on(message("photo"), scanQRAction);

export default scanQR;
