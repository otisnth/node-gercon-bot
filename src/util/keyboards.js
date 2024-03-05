import { Markup } from "telegraf";
import locale from "./../locales/ru.json" assert { type: "json" };

export const getMainKeyboard = () => {
    const mainKeyboardGetQR = locale.keyboards.mainKeyboard.getQR;
    const mainKeyboardScanQR = locale.keyboards.mainKeyboard.scanQR;
    let mainKeyboard = Markup.keyboard([mainKeyboardGetQR, mainKeyboardScanQR]);
    mainKeyboard = mainKeyboard.resize();

    return mainKeyboard;
};

export const getBackKeyboard = () => {
    const backKeyboardBack = locale.keyboards.backKeyboard.back;
    let backKeyboard = Markup.keyboard([backKeyboardBack]);
    backKeyboard = backKeyboard.resize();

    return backKeyboard;
};
