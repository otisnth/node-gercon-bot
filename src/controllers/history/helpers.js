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

export const paginationKeyboard = (ctx, position) => {
    const paginationNext = ctx.i18n.t("keyboards.paginationKeyboard.next");
    const paginationPrev = ctx.i18n.t("keyboards.paginationKeyboard.prev");
    let keyboard;
    if (position === "start") keyboard = [paginationNext];
    else if (position === "end") keyboard = [paginationPrev];
    else keyboard = [paginationPrev, paginationNext];
    let paginationKeyboard = Markup.keyboard([keyboard]);
    paginationKeyboard = paginationKeyboard.resize();

    return paginationKeyboard;
};

export const getPagination = (ctx, itemPerPage, currentPage, length) => {
    if (itemPerPage >= length) return;
    let keyboard;
    if (!currentPage) keyboard = paginationKeyboard(ctx, "start");
    else if (Math.floor(length / itemPerPage) === currentPage) keyboard = paginationKeyboard(ctx, "end");
    else keyboard = paginationKeyboard(ctx, "middle");

    let startIndex = currentPage * itemPerPage + 1;
    let endIndex = currentPage * itemPerPage + itemPerPage;
    endIndex = endIndex > length ? length : endIndex;

    ctx.reply(
        ctx.i18n.t("keyboards.paginationKeyboard.showed", {
            start: startIndex,
            end: endIndex,
            length: length,
        }),
        keyboard
    );
    return;
};
