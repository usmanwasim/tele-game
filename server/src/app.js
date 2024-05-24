var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const EventEmitter = require('eventemitter3');
var dbConnect = require('./utils/dbConnect.js');
const { bot } = require('./utils/bot.js');
var { User } = require('./models/users.js');

dbConnect();
const events = new EventEmitter();
var app = express();

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

// Bot Code Start___________________________________++++++++++++++++++

bot.onText(/^\/start$/, async (msg) => {
    try {
        let chatId = msg.chat.id;
        let firstName = msg.chat.first_name;
        let lastName = msg.chat.last_name;

        let user = await User.findOne({
            chatId,
        });
        let Count = await User.count();
        if (!user) {
            return bot.sendMessage(
                chatId,
                `\nWelcome to CryptoBot ${firstName} ${lastName}.\n\n` + `Total Users : ${Count}`,
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Generate Wallet',
                                    callback_data: JSON.stringify({
                                        command: 'walletid',
                                        answer: 'generate wallet',
                                    }),
                                },
                            ],
                            [
                                {
                                    text: '⬇️ Import Wallet',
                                    callback_data: JSON.stringify({
                                        command: 'walletkey',
                                        answer: `${chatId}`,
                                    }),
                                },
                            ],
                        ],
                    },
                },
            );
        }
        events.emit('mainmenu', {
            user,
            msgId: msg?.message_id,
        });
    } catch (error) {
        console.log(error, 'app error -= - - = -=- ');
    }
});

bot.on('message', async (msg) => {
    const chatId = msg?.chat?.id;
    const text = msg?.reply_to_message?.text;
    const messageId = msg.message_id;

    // generate wallet from privateKey
    if (text?.includes('Hello') || text?.includes('Hi')) {
        bot.sendMessage(chatId, 'yourmessage id is ' + messageId);
    }
});
module.exports = app;
