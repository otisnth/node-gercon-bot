import { Scenes } from "telegraf";
import Room from "../../models/Room.js";
import Order from "../../models/Order.js";
import { getSelectQRKeyboard } from "./helpers.js";
import { generateQRAction } from "./actions.js";

const getQR = new Scenes.BaseScene("getQR");

getQR.enter(async (ctx) => {
    const room = await Room.findOne();
    room.dataValues.type = "room";
    const order = await Order.findOne();
    order.dataValues.type = "order";
    await ctx.reply(ctx.i18n.t("scenes.getQR.start"), getSelectQRKeyboard(ctx, [room.dataValues, order.dataValues]));
});

getQR.action(/generateQR/, generateQRAction);

export default getQR;
