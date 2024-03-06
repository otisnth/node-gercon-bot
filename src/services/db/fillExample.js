import Incident from "../../models/Incident.js";
import Order from "../../models/Order.js";
import Room from "../../models/Room.js";
import TypeInjury from "../../models/TypeInjury.js";

export const fillExample = async () => {
    await Room.create({ id: 0, name: "ПС № 32 Измайлово", address: "Народный просп., 7, Москва" });
    await Order.create({
        id: 0,
        name: "Обрыв ЛЭП Окружной проезд",
        address: "Окружной проезд, 19, Москва",
        date: "2024-01-01",
        description: "Выездные работы по устранению обрыва ЛЭП",
    });
    await TypeInjury.create({ id: 0, name: "Ссадина" });
    await TypeInjury.create({ id: 1, name: "Кровоподтек" });
    await TypeInjury.create({ id: 2, name: "Ушиб мягких тканей" });
    await TypeInjury.create({ id: 3, name: "Поверхностная рана" });
    await TypeInjury.create({ id: 4, name: "Другое повреждение" });
};
