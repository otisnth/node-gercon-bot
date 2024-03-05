import { Scenes } from "telegraf";

const getQR = new Scenes.BaseScene("getQR");

getQR.enter(async (ctx) => {
    await ctx.reply("Держи свой QR-код");
    ctx.scene.leave();
});

getQR.leave(async (ctx) => {});

export default getQR;
