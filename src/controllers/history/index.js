import { Scenes } from "telegraf";
import { getHistoryKeyboard, paginationKeyboard } from "./helpers.js";
import { getHistory } from "./action.js";

const history = new Scenes.BaseScene("history");

let historyList;

history.enter(async (ctx) => {
    historyList = await getHistory(ctx);
    const historyKeyboard = await getHistoryKeyboard(ctx, historyList);
    await ctx.reply(ctx.i18n.t("keyboards.historyKeyboard.title"), historyKeyboard);
    await ctx.reply("Показано:", paginationKeyboard(ctx));
});

history.leave(async (ctx) => {});

export default history;
