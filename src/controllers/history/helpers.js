import { Markup } from "telegraf";
import { getPageHistory } from "./action.js";

export async function getHistoryKeyboard(ctx, historyList, itemPerPage, currentPage) {
    let data = getPageHistory(historyList, itemPerPage, currentPage);
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
    keyboard.push(getPagination(ctx, itemPerPage, currentPage, historyList.length));
    return Markup.inlineKeyboard(keyboard);
}

export const paginationKeyboard = (ctx, position) => {
    const paginationNext = Markup.button.callback(
        ctx.i18n.t("keyboards.paginationKeyboard.next"),
        JSON.stringify({ a: "paginationNext" }),
        false
    );
    const paginationPrev = Markup.button.callback(
        ctx.i18n.t("keyboards.paginationKeyboard.prev"),
        JSON.stringify({ a: "paginationPrev" }),
        false
    );
    let keyboard;
    if (position === "start") keyboard = [paginationNext];
    else if (position === "end") keyboard = [paginationPrev];
    else keyboard = [paginationPrev, paginationNext];

    return keyboard;
};

export const getPagination = (ctx, itemPerPage, currentPage, length) => {
    if (itemPerPage >= length) return;
    let keyboard;
    if (!currentPage) keyboard = paginationKeyboard(ctx, "start");
    else if (Math.floor(length / itemPerPage) === currentPage) keyboard = paginationKeyboard(ctx, "end");
    else keyboard = paginationKeyboard(ctx, "middle");

    return keyboard;
};

export const getHistoryOptionKeyboard = (ctx) => {
    return Markup.keyboard([
        ctx.i18n.t("keyboards.scanOptionsKeyboard.report"),
        ctx.i18n.t("keyboards.backKeyboard.toMain"),
    ]).resize();
};
