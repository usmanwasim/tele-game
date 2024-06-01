const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const EventEmitter = require('eventemitter3');
const dbConnect = require('./utils/dbConnect.js');
const { bot } = require('./utils/bot.js');
const sharp = require('sharp');
const { User } = require('./models/users.js');
dbConnect();
const events = new EventEmitter();
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

const joinLink = `https://t.me/Usman_Wasim`;
const imageUrl = 'https://telegram-game-liart.vercel.app/bitcoin1.png';

bot.onText(/^\/start (.+)$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const firstName = msg.chat.first_name;
    const lastName = msg.chat.last_name;

    try {
        const { default: fetch } = await import('node-fetch');
        const response = await fetch(imageUrl);
        const buffer = await response.arrayBuffer();

        const resizedImageBuffer = await sharp(buffer).resize({ height: 200 }).toBuffer();

        let user = await User.findOne({
            chatId,
        });
        let Count = await User.count();
        if (!user) {
            return bot.sendPhoto(chatId, resizedImageBuffer, {
                caption: `Welcome to TeleGame ${firstName} ${lastName}.\n\nTotal Users : ${Count} \n\n ${
                    match && `referral link : ${match}`
                } `,
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '👋 Play Game',
                                web_app: { url: 'https://telegram-game-liart.vercel.app' },
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
        }
    } catch (error) {
        bot.sendMessage(chatId, error);
        console.log(error, 'app error -= - - = -=- ');
    }
});

bot.on('message', async (msg) => {
    const chatId = msg?.chat?.id;
    const text = msg?.reply_to_message?.text;
    const messageId = msg.message_id;

    if (text?.includes('Hello') || text?.includes('Hi')) {
        bot.sendMessage(chatId, 'your message id is ' + messageId);
    }
});

module.exports = app;
