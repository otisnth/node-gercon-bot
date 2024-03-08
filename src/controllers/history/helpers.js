import { Markup } from "telegraf";

export async function getHistoryKeyboard(ctx, data) {
    let keyboard = [];
    for (const i of data) {
        keyboard.push([
            Markup.button.callback(
                ctx.i18n.t("keyboards.historyKeyboard.item", {
                    date: i.date,
                    injury: i.injury,
                }),
                JSON.stringify({ a: "getHistoryItem", id: i.id }),
                false
            ),
        ]);
    }
    return Markup.inlineKeyboard(keyboard);
}

export const paginationKeyboard = (ctx) => {
    const paginationNext = ctx.i18n.t("keyboards.paginationKeyboard.next");
    const paginationPrev = ctx.i18n.t("keyboards.paginationKeyboard.prev");
    let paginationKeyboard = Markup.keyboard([[paginationPrev, paginationNext]]);
    paginationKeyboard = paginationKeyboard.resize();

    return paginationKeyboard;
};
