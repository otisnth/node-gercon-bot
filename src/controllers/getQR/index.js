import { Scenes } from "telegraf";

const getQR = new Scenes.BaseScene("getQR");

getQR.enter(async (ctx) => {
    await ctx.reply(ctx.i18n.t("scenes.getQR.start"));
    ctx.scene.leave();
});

getQR.leave(async (ctx) => {});

export default getQR;
