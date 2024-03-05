import { Scenes } from "telegraf";

const start = new Scenes.BaseScene("start");

start.enter(async (ctx) => {
    await ctx.reply("Здравствуйте! Вы пользуетесь ботом команды ГЕРКОН!");
});

start.leave(async (ctx) => {
    await ctx.reply("Выберите следующее действие:");
});

export default start;
