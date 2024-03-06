import fs from "fs";
import { Input } from "telegraf";
import QRCode from "qrcode";
export const generateQRAction = async (ctx) => {
    const qrData = JSON.parse(ctx.callbackQuery.data);
    delete qrData.a;
    QRCode.toFile("./storage/qr.png", [{ data: JSON.stringify(qrData), mode: "byte" }]);
    ctx.answerCbQuery();
    ctx.deleteMessage();
    await ctx.replyWithPhoto(Input.fromLocalFile("./storage/qr.png"));
    fs.unlinkSync("./storage/qr.png");
};
