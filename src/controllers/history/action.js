import Incident from "../../models/Incident.js";
import TypeInjury from "../../models/TypeInjury.js";

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
