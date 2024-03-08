import { Scenes } from "telegraf";
import TelegrafI18n from "telegraf-i18n";
import { getHistoryKeyboard, getPagination } from "./helpers.js";
import { getHistory, getPageHistory } from "./action.js";

const history = new Scenes.BaseScene("history");

let historyList;
const itemPerPage = 5;
let currentPage;

history.enter(async (ctx) => {
    historyList = await getHistory(ctx);
    currentPage = 0;
    const historyKeyboard = await getHistoryKeyboard(ctx, getPageHistory(historyList, itemPerPage, currentPage));
    await ctx.reply(ctx.i18n.t("keyboards.historyKeyboard.title"), historyKeyboard);
    getPagination(ctx, itemPerPage, currentPage, historyList.length);
});

history.leave(async (ctx) => {});

history.hears(TelegrafI18n.match("keyboards.paginationKeyboard.next"), async (ctx) => {
    currentPage++;
    const historyKeyboard = await getHistoryKeyboard(ctx, getPageHistory(historyList, itemPerPage, currentPage));
    await ctx.reply(ctx.i18n.t("keyboards.historyKeyboard.title"), historyKeyboard);
    getPagination(ctx, itemPerPage, currentPage, historyList.length);
});

history.hears(TelegrafI18n.match("keyboards.paginationKeyboard.prev"), async (ctx) => {
    currentPage--;
    const historyKeyboard = await getHistoryKeyboard(ctx, getPageHistory(historyList, itemPerPage, currentPage));
    await ctx.reply(ctx.i18n.t("keyboards.historyKeyboard.title"), historyKeyboard);
    getPagination(ctx, itemPerPage, currentPage, historyList.length);
});

export default history;
