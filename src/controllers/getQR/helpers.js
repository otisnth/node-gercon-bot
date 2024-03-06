import { Markup } from "telegraf";

export function getSelectQRKeyboard(ctx, data) {
    let keyboard = [];
    for (const i of data) {
        const title =
            i.type === "room"
                ? ctx.i18n.t("scenes.getQR.title.room", { room: i.name })
                : ctx.i18n.t("scenes.getQR.title.order", { order: i.name });
        keyboard.push([
            Markup.button.callback(title, JSON.stringify({ a: "generateQR", type: i.type, id: i.id }), false),
        ]);
    }
    return Markup.inlineKeyboard(keyboard).resize();
}
