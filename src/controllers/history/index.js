import { Scenes } from "telegraf";
import { getHistoryKeyboard } from "./helpers.js";

const history = new Scenes.BaseScene("history");

history.enter(async (ctx) => {
    const historyKeyboard = await getHistoryKeyboard(ctx);
    await ctx.reply(ctx.i18n.t("keyboards.historyKeyboard.title"), historyKeyboard);
});

history.leave(async (ctx) => {});

export default history;
