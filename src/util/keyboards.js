import { Markup } from "telegraf";

export const getMainKeyboard = (ctx) => {
    const mainKeyboardGetQR = ctx.i18n.t("keyboards.mainKeyboard.getQR");
    const mainKeyboardScanQR = ctx.i18n.t("keyboards.mainKeyboard.scanQR");
    let mainKeyboard = Markup.keyboard([mainKeyboardGetQR, mainKeyboardScanQR]);
    mainKeyboard = mainKeyboard.resize();

    return mainKeyboard;
};

export const getBackKeyboard = (ctx) => {
    const backKeyboardBack = ctx.i18n.t("keyboards.backKeyboard.back");
    let backKeyboard = Markup.keyboard([backKeyboardBack]);
    backKeyboard = backKeyboard.resize();

    return backKeyboard;
};

export const removeKeyboard = () => {
    let removeKeyboard = Markup.removeKeyboard();
    return removeKeyboard;
};

export const toMainKeyboard = (ctx) => {
    return Markup.keyboard([[ctx.i18n.t("keyboards.backKeyboard.toMain")]]).resize();
};
