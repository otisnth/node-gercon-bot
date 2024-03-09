import { Scenes } from "telegraf";
import TelegrafI18n from "telegraf-i18n";
import { getHistoryKeyboard, getHistoryOptionKeyboard } from "./helpers.js";
import { getHistory, historyItemAction, getHistoryTitle } from "./action.js";

const history = new Scenes.BaseScene("history");

let historyList;
const itemPerPage = 5;
let currentPage;
let listMsg;

history.enter(async (ctx) => {
    await ctx.reply(ctx.i18n.t("keyboards.historyKeyboard.title"), getHistoryOptionKeyboard(ctx));
    historyList = await getHistory(ctx);
    currentPage = 0;
    const historyKeyboard = await getHistoryKeyboard(ctx, historyList, itemPerPage, currentPage);
    listMsg = await ctx.reply(getHistoryTitle(ctx, itemPerPage, currentPage, historyList.length), historyKeyboard);
});

history.action(/paginationNext/, async (ctx) => {
    currentPage++;
    const historyKeyboard = await getHistoryKeyboard(ctx, historyList, itemPerPage, currentPage);
    await ctx.telegram.editMessageText(
        listMsg.chat.id,
        listMsg.message_id,
        undefined,
        getHistoryTitle(ctx, itemPerPage, currentPage, historyList.length),
        historyKeyboard
    );
});

history.action(/paginationPrev/, async (ctx) => {
    currentPage--;
    const historyKeyboard = await getHistoryKeyboard(ctx, historyList, itemPerPage, currentPage);
    await ctx.telegram.editMessageText(
        listMsg.chat.id,
        listMsg.message_id,
        undefined,
        getHistoryTitle(ctx, itemPerPage, currentPage, historyList.length),
        historyKeyboard
    );
});

history.action(/getHistoryItem/, async (ctx) => {
    await ctx.deleteMessage(listMsg.message_id);
    await historyItemAction(ctx);
    historyList = await getHistory(ctx);
    const historyKeyboard = await getHistoryKeyboard(ctx, historyList, itemPerPage, currentPage);
    listMsg = await ctx.reply(getHistoryTitle(ctx, itemPerPage, currentPage, historyList.length), historyKeyboard);
});

history.hears(TelegrafI18n.match("keyboards.scanOptionsKeyboard.report"), async (ctx) => ctx.scene.enter("report"));

export default history;
