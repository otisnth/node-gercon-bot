import moment from "moment";
import { Scenes } from "telegraf";
import { toMainKeyboard, getMainKeyboard } from "../../util/keyboards.js";
import { getTypeInjuryKeyboard, getSkipDescriptionKeyboard } from "./helpers.js";
import TypeInjury from "../../models/TypeInjury.js";
import Incident from "../../models/Incident.js";

let typeInjuryKeyboard = await getTypeInjuryKeyboard();

const report = new Scenes.WizardScene(
    "report",
    async (ctx) => {
        await ctx.reply(ctx.i18n.t("scenes.report.form.getFullName"), toMainKeyboard(ctx));
        ctx.wizard.state.data = {};
        if (ctx.message.text === ctx.i18n.t("keyboards.backKeyboard.toMain")) return ctx.scene.leave();
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.message.text === ctx.i18n.t("keyboards.backKeyboard.toMain")) return ctx.scene.leave();
        ctx.wizard.state.data.fullName = ctx.message.text;
        await ctx.reply(ctx.i18n.t("scenes.report.form.getDate"));
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.message.text === ctx.i18n.t("keyboards.backKeyboard.toMain")) return ctx.scene.leave();
        if (!/^\d{4}\-\d{2}\-\d{2}$/.test(ctx.message.text)) {
            await ctx.reply(ctx.i18n.t("scenes.report.errors.formatDate"));
            return;
        }
        if (!moment(ctx.message.text, "YYYY-MM-DD").isValid()) {
            await ctx.reply(ctx.i18n.t("scenes.report.errors.invalidDate"));
            return;
        }
        ctx.wizard.state.data.date = ctx.message.text;
        await ctx.reply(ctx.i18n.t("scenes.report.form.getInjury"), typeInjuryKeyboard);
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (!ctx.callbackQuery) {
            if (ctx.message.text === ctx.i18n.t("keyboards.backKeyboard.toMain")) return ctx.scene.leave();
            return;
        }
        // await ctx.deleteMessage();
        const callbackData = JSON.parse(ctx.callbackQuery.data);
        const typeInjury = await TypeInjury.findByPk(callbackData.id);
        await ctx.editMessageText(
            ctx.i18n.t("scenes.report.form.selectedInjury", { name: typeInjury.dataValues.name })
        );
        // await ctx.reply(ctx.i18n.t("scenes.report.form.selectedInjury", { name: typeInjury.dataValues.name }));
        ctx.wizard.state.data.injury = typeInjury.dataValues.id;
        await ctx.reply(ctx.i18n.t("scenes.report.form.getDescription"), getSkipDescriptionKeyboard(ctx));
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.callbackQuery) {
            await ctx.deleteMessage();
            ctx.wizard.state.data.description = "";
        } else {
            if (ctx.message.text === ctx.i18n.t("keyboards.backKeyboard.toMain")) return ctx.scene.leave();
            ctx.wizard.state.data.description = ctx.message.text;
        }
        let incident = Incident.build({
            fullName: ctx.wizard.state.data.fullName,
            date: ctx.wizard.state.data.date,
            injury: ctx.wizard.state.data.injury,
            description: ctx.wizard.state.data.description,
        });
        if (ctx.session["reportLocation"].type === "room") {
            incident.room = ctx.session["reportLocation"].id;
        } else {
            incident.order = ctx.session["reportLocation"].id;
        }
        await incident.save();
        await ctx.reply(ctx.i18n.t("scenes.report.form.sendReport"));
        return ctx.scene.leave();
    }
);

report.leave(async (ctx) => {
    await ctx.reply(ctx.i18n.t("scenes.start.nextStep"), getMainKeyboard(ctx));
});

export default report;
