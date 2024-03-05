import { Scenes } from "telegraf";
import { getMainKeyboard } from "../../util/keyboards.js";

const start = new Scenes.BaseScene("start");
const mainKeyboard = getMainKeyboard();

start.enter(async (ctx) => {
    await ctx.reply("Здравствуйте! Вы пользуетесь ботом команды ГЕРКОН!", mainKeyboard);
    ctx.scene.leave();
});

start.leave(async (ctx) => {
    await ctx.reply("Выберите следующее действие:");
});

export default start;
