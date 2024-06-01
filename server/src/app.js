const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
// const EventEmitter = require('eventemitter3');
const dbConnect = require('./utils/dbConnect.js');
const { bot } = require('./utils/bot.js');
const sharp = require('sharp');
const { User } = require('./models/users.js');
dbConnect();
// const events = new EventEmitter();
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (_req, res) {
    res.send('Welcome to TeleGame Server!');
});

app.get('/ping', function (_req, res) {
    res.send('pong');
});

const joinLink = 'https://t.me/Usman_Wasim';
const imageUrl = 'https://telegram-game-liart.vercel.app/bitcoin1.png';

bot.onText(/^\/start(?: (.+))?$/, async (msg, match) => {
    let chatId = msg.chat.id;
    let username = msg.chat.username;
    let referral = match[1] || null;

    try {
        let user = await User.findOne({
            chatId,
        });
        if (!user) {
            // console.log(referral, 'referral-=-=-=++_++');
            user = await User({
                username,
                chatId,
                referral: referral || '',
            });
            await user.save();
        }
        let Count = await User.count();

        // Img resize Code +_____________________________________++++
        const { default: fetch } = await import('node-fetch');
        const response = await fetch(imageUrl);
        const buffer = await response.arrayBuffer();
        const resizedImageBuffer = await sharp(buffer).resize({ width: 300 }).toBuffer();

        // send response for /start_________________________
        return bot.sendPhoto(chatId, resizedImageBuffer, {
            caption: `🎮Welcome to TeleGame @${username}.\n\n 🤖Total Users ® : ${Count} \n\n ${
                match[1] ? `🚀Referral Code   : ${match[1]}` : '❌No Referral'
            } `,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: '👋 Play Game',
                            web_app: {
                                url: `https://telegram-game-liart.vercel.app?chatId${user.chatId}`,
                            },
                        },
                    ],
                    [
                        {
                            text: '🧑‍💻 Join Buddy',
                            url: joinLink,
                        },
                    ],
                ],
            },
        });
    } catch (error) {
        bot.sendMessage(chatId, ' Internal Server Error');
        console.log(error, 'app error -= - - = -=- ');
    }
});

bot.on('message', async (msg) => {
    const chatId = msg?.chat?.id;
    const text = msg?.text;

    if (text?.includes('Hello') || text?.includes('Hi')) {
        bot.sendMessage(chatId, 'Hello there 👋 ');
    } else if (!text.includes('/start')) {
        bot.sendMessage(chatId, 'How you doin`? 😊😎 ');
    }
    // console.log(msg);
});

module.exports = app;
