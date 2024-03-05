import { Markup } from "telegraf";

export const getMainKeyboard = () => {
    const mainKeyboardGetQR = "Получить тестовый QR-код";
    const mainKeyboardScanQR = "Сканировать QR-код";
    let mainKeyboard = Markup.keyboard([mainKeyboardGetQR, mainKeyboardScanQR]);
    mainKeyboard = mainKeyboard.resize();

    return mainKeyboard;
};
