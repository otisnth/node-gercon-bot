import { Scenes } from "telegraf";
import { removeKeyboard } from "../../util/keyboards.js";

const report = new Scenes.WizardScene(
    "report",
    (ctx) => {
        ctx.reply(ctx.i18n.t("scenes.report.form.getFullName"), removeKeyboard());
        ctx.wizard.state.data = {};
        return ctx.wizard.next();
    },
    (ctx) => {
        // validation
        // ctx.message.text
        // return;
        ctx.wizard.state.data.fullName = ctx.message.text;
        ctx.reply(ctx.i18n.t("scenes.report.form.getDate"));
        return ctx.wizard.next();
    },
    (ctx) => {
        // validation
        // ctx.message.text
        // return;
        ctx.wizard.state.data.fullName = ctx.message.text;
        ctx.reply(ctx.i18n.t("scenes.report.form.getDate"));
        return ctx.wizard.next();
    },
    (ctx) => {
        // validation
        // ctx.message.text
        // return;
        ctx.wizard.state.data.fullName = ctx.message.text;
        ctx.reply(ctx.i18n.t("scenes.report.form.getDate"));
        return ctx.wizard.next();
    },
    (ctx) => {
        return ctx.scene.leave();
    }
);

export default report;
