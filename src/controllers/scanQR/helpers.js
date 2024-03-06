import { Markup } from "telegraf";

export const getOptionKeyboard = (ctx, showHistory) => {
    const optionKeyboardHistory = showHistory ? ctx.i18n.t("keyboards.scanOptionsKeyboard.history") : "";
    const optionKeyboardReport = ctx.i18n.t("keyboards.scanOptionsKeyboard.report");

    let optionKeyboard = Markup.keyboard([optionKeyboardHistory, optionKeyboardReport]);
    optionKeyboard = optionKeyboard.resize().oneTime();

    return optionKeyboard;
};
