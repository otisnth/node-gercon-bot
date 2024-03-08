import { Markup } from "telegraf";
import Incident from "../../models/Incident.js";
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
        let injury;

        injury = await TypeInjury.findByPk(i.dataValues.injury);

        keyboard.push([
            Markup.button.callback(
                ctx.i18n.t("keyboards.historyKeyboard.item", {
                    date: i.dataValues.date,
                    injury: injury.dataValues.name,
                }),
                JSON.stringify({ a: "getHistoryItem", id: i.dataValues.id }),
                false
            ),
        ]);
    }
    return Markup.inlineKeyboard(keyboard);
}
