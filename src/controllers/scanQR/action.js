import fs from "fs";
import https from "https";
import { Input } from "telegraf";
export const scanQRAction = async (ctx) => {
    let imageId = ctx.message.photo.pop().file_id;
    let qrData;

    // await ctx.telegram.getFileLink(imageId).then((link) => {
    //     https.get(link, (response) => response.pipe(fs.createWriteStream(`./storage/inputQR.jpeg`)));
    // });
};
