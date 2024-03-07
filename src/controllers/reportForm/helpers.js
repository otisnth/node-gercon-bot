import { Markup } from "telegraf";
import TypeInjury from "../../models/TypeInjury.js";

export async function getTypeInjuryKeyboard() {
    let keyboard = [];

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
