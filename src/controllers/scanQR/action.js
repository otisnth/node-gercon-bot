import fs from "fs";
import https from "https";
import Jimp from "jimp";
import QrCode from "qrcode-reader";
import Order from "../../models/Order.js";
import Room from "../../models/Room.js";

export const scanQRAction = async (ctx) => {
    let imageId = ctx.message.photo.pop().file_id;
    let qrData;

    await ctx.telegram.getFileLink(imageId).then((link) => {
        https.get(link, (response) => response.pipe(fs.createWriteStream(`./storage/inputQR.jpeg`)));
    });

    await Jimp.read("./storage/inputQR.jpeg")
        .then((image) => {
            let qr = new QrCode();
            qr.callback = function (err, value) {
                if (err) {
                    console.error("Error reading QR Code", err);
                    return;
                }
                qrData = JSON.parse(value.result);
            };
            qr.decode(image.bitmap);
        })
        .catch((err) => {
            console.error("Error reading image", err);
        });
    fs.unlink("./storage/inputQR.png", () => {});

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
};
