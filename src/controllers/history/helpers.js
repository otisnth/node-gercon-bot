import { Markup } from "telegraf";
import Incident from "../../models/Incident.js";
import Order from "../../models/Order.js";
import Room from "../../models/Room.js";
import TypeInjury from "../../models/TypeInjury.js";

export async function getHistoryKeyboard(ctx) {
    let data;
    if (ctx.session["reportLocation"].type === "room") {
        data = await Incident.findAll({
            where: {
                room: ctx.session["reportLocation"].id,
            },
        });
    } else {
        data = await Incident.findAll({
            where: {
                order: ctx.session["reportLocation"].id,
            },
        });
    }

    let keyboard = [];
    for (const i of data) {
        let location, injury;

        if (typeof i.dataValues.room === "number") {
            location = await Room.findByPk(i.dataValues.room);
        } else {
            location = await Order.findByPk(i.dataValues.order);
        }
        injury = await TypeInjury.findByPk(i.dataValues.injury);

        keyboard.push([
            Markup.button.callback(
                ctx.i18n.t("keyboards.historyKeyboard.item", {
                    location: location.dataValues.name,
                    injury: injury.dataValues.name,
                }),
                JSON.stringify({ a: "getHistoryItem", id: i.dataValues.id }),
                false
            ),
        ]);
    }
    return Markup.inlineKeyboard(keyboard).resize();
}
