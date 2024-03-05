import Incident from "../../models/Incident.js";
import Order from "../../models/Order.js";
import Room from "../../models/Room.js";
import TypeInjury from "../../models/TypeInjury.js";

export const syncModels = async () => {
    await Room.create({ id: 0, name: "ПС № 32 Измайлово", address: "Народный просп., 7, Москва" });
    await Order.create({ id: 0, name: "", address: "", date: "", description: "" });
    await TypeInjury.create({ name: "" });
};
