import Incident from "../../models/Incident.js";
import TypeInjury from "../../models/TypeInjury.js";
import Room from "../../models/Room.js";
import Order from "../../models/Order.js";

export async function getHistory(ctx) {
    let data;
    if (ctx.session["reportLocation"].type === "room") {
        data = await Incident.findAll({
            where: {
                room: ctx.session["reportLocation"].id,
            },
        });
    } else {
        data = await Incident.findAll({
            where: {
                order: ctx.session["reportLocation"].id,
            },
        });
    }

    data = data.map((d) => d.dataValues);

    for (const i of data) {
        let injury = await TypeInjury.findByPk(i.injury);
        i.injury = injury.name;
    }

    return data;
}

export function getPageHistory(data, itemPerPage, currentPage) {
    const startIndex = currentPage * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return data.length < endIndex ? data.slice(startIndex) : data.slice(startIndex, itemPerPage);
}

export const historyItemAction = async (ctx) => {
    const data = JSON.parse(ctx.callbackQuery.data);
    let item = await Incident.findByPk(data.id);
    item = item.dataValues;
    let injury = await TypeInjury.findByPk(item.injury);
    item.injury = injury.name;
    if (item.room !== null) {
        let room = await Room.findByPk(item.room);
        item.location = room.name;
        item.address = room.address;
    } else {
        let order = await Order.findByPk(item.order);
        item.location = order.name;
        item.address = order.address;
        item.orderDate = order.date;
        item.orderDescription = order.description;
    }

    if (item.room !== null) {
        await ctx.reply(
            ctx.i18n.t("scenes.history.detail.room", {
                name: item.location,
                address: item.address,
                fullName: item.fullName,
                date: item.date,
                injury: item.injury,
                description: item.description,
            })
        );
    } else {
        await ctx.reply(
            ctx.i18n.t("scenes.history.detail.order", {
                name: item.location,
                address: item.address,
                fullName: item.fullName,
                date: item.date,
                injury: item.injury,
                description: item.description,
                orderDate: item.orderDate,
                orderDescription: item.orderDescription,
            })
        );
    }
    return;
};
