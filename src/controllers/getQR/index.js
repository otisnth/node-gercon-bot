import { Scenes } from "telegraf";
import Room from "../../models/Room.js";
import Order from "../../models/Order.js";

const getQR = new Scenes.BaseScene("getQR");

getQR.enter(async (ctx) => {
    await ctx.reply(ctx.i18n.t("scenes.getQR.start"));
    const rooms = await Room.findOne();
    console.log(rooms.dataValues);
    ctx.scene.leave();
});

getQR.leave(async (ctx) => {});

export default getQR;
