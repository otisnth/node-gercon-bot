import { Scenes } from "telegraf";
import { removeKeyboard } from "../../util/keyboards.js";

const report = new Scenes.WizardScene(
    "report",
    (ctx) => {
        ctx.reply("Введите название проблемы", removeKeyboard());
        return ctx.wizard.next();
    },
    (ctx) => {
        return ctx.scene.leave();
    }
);

export default report;
