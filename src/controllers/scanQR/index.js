import { Scenes } from "telegraf";

const scanQR = new Scenes.BaseScene("scanQR");

scanQR.enter(async (ctx) => {
    await ctx.reply("Отравьте фотографию QR-кода");
});

scanQR.leave(async (ctx) => {});

export default scanQR;
