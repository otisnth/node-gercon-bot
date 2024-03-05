require("dotenv").config();
import Telegraf from "telegraf";

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
