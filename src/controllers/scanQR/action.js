import fs from "fs";
import https from "https";
import Jimp from "jimp";
import QrCode from "qrcode-reader";
import Order from "../../models/Order.js";
import Room from "../../models/Room.js";

export const scanQRAction = async (ctx) => {
    let imageId = ctx.message.photo.pop().file_id;
    let qrData;

    try {
        const link = await ctx.telegram.getFileLink(imageId);
        await new Promise((resolve, reject) => {
            https.get(link, (response) => {
                const fileStream = fs.createWriteStream(`./storage/inputQR.jpeg`);
                response.pipe(fileStream);
                fileStream.on("finish", resolve);
                fileStream.on("error", reject);
            });
        });

        const image = await Jimp.read("./storage/inputQR.jpeg");
        const qr = new QrCode();
        qr.callback = function (err, value) {
            if (err) {
                console.error("Error reading QR Code", err);
                return;
            }
            qrData = JSON.parse(value.result);
        };
        qr.decode(image.bitmap);

        if (qrData.type === "room") {
            let room = await Room.findByPk(qrData.id);
            room = room.dataValues;
            await ctx.reply(ctx.i18n.t("scenes.scanQR.result.room", { name: room.name, address: room.address }));
        } else {
            let order = await Order.findByPk(qrData.id);
            order = order.dataValues;
            await ctx.reply(
                ctx.i18n.t("scenes.scanQR.result.order", {
                    name: order.name,
                    address: order.address,
                    date: order.date,
                    description: order.description,
                })
            );
        }

        await fs.promises.unlink("./storage/inputQR.jpeg");
    } catch (err) {
        console.error("Error scanning QR Code", err);
    }
};
