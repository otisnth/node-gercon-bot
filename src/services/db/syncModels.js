import Incident from "../../models/Incident.js";
import Order from "../../models/Order.js";
import Room from "../../models/Room.js";
import TypeInjury from "../../models/TypeInjury.js";

export const syncModels = async () => {
    await Incident.sync();
    await Order.sync();
    await Room.sync();
    await TypeInjury.sync();
};
