import { Scenes } from "telegraf";
import TelegrafI18n from "telegraf-i18n";
import { getHistoryKeyboard, getPagination } from "./helpers.js";
import { getHistory, getPageHistory, historyItemAction } from "./action.js";

const history = new Scenes.BaseScene("history");

let historyList;
const itemPerPage = 5;
let currentPage;
let paginationMsgs = [];

history.enter(async (ctx) => {
    historyList = await getHistory(ctx);
    currentPage = 0;
    const historyKeyboard = await getHistoryKeyboard(ctx, getPageHistory(historyList, itemPerPage, currentPage));
    let msg = await ctx.reply(ctx.i18n.t("keyboards.historyKeyboard.title"), historyKeyboard);
    paginationMsgs.push(msg);
    let showed = await getPagination(ctx, itemPerPage, currentPage, historyList.length);
    paginationMsgs.push(showed);
});

history.leave(async (ctx) => {});

history.hears(TelegrafI18n.match("keyboards.paginationKeyboard.next"), async (ctx) => {
    await ctx.deleteMessage();
    for (const i of paginationMsgs) {
        await ctx.deleteMessage(i.message_id);
    }
    paginationMsgs = [];
    currentPage++;
    const historyKeyboard = await getHistoryKeyboard(ctx, getPageHistory(historyList, itemPerPage, currentPage));
    let msg = await ctx.reply(ctx.i18n.t("keyboards.historyKeyboard.title"), historyKeyboard);
    paginationMsgs.push(msg);
    let showed = await getPagination(ctx, itemPerPage, currentPage, historyList.length);
    paginationMsgs.push(showed);
});

history.hears(TelegrafI18n.match("keyboards.paginationKeyboard.prev"), async (ctx) => {
    await ctx.deleteMessage();
    for (const i of paginationMsgs) {
        await ctx.deleteMessage(i.message_id);
    }
    paginationMsgs = [];
    currentPage--;
    const historyKeyboard = await getHistoryKeyboard(ctx, getPageHistory(historyList, itemPerPage, currentPage));
    let msg = await ctx.reply(ctx.i18n.t("keyboards.historyKeyboard.title"), historyKeyboard);
    paginationMsgs.push(msg);
    let showed = await getPagination(ctx, itemPerPage, currentPage, historyList.length);
    paginationMsgs.push(showed);
});

history.action(/getHistoryItem/, async (ctx) => {
    for (const i of paginationMsgs) {
        await ctx.deleteMessage(i.message_id);
    }
    paginationMsgs = [];
    await historyItemAction(ctx);
    const historyKeyboard = await getHistoryKeyboard(ctx, getPageHistory(historyList, itemPerPage, currentPage));
    let msg = await ctx.reply(ctx.i18n.t("keyboards.historyKeyboard.title"), historyKeyboard);
    paginationMsgs.push(msg);
    let showed = await getPagination(ctx, itemPerPage, currentPage, historyList.length);
    paginationMsgs.push(showed);
});

export default history;
