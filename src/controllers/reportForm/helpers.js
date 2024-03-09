import { Markup } from "telegraf";
import TypeInjury from "../../models/TypeInjury.js";

export async function getTypeInjuryKeyboard() {
    let keyboard = [];
    await TypeInjury.sync();
    const typeInjury = await TypeInjury.findAll();

    for (const type of typeInjury) {
        keyboard.push([
            Markup.button.callback(
                type.dataValues.name,
                JSON.stringify({ a: "selectInjury", id: type.dataValues.id }),
                false
            ),
        ]);
    }

    return Markup.inlineKeyboard(keyboard).resize();
}

export function getSkipDescriptionKeyboard(ctx) {
    return Markup.inlineKeyboard([
        Markup.button.callback(
            ctx.i18n.t("scenes.report.form.skipDescription"),
            JSON.stringify({ a: "skipDescription" }),
            false
        ),
    ]).resize();
}
