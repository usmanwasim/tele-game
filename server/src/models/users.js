var mongoose = require('mongoose');
const crypto = require('crypto');

var userSchema = mongoose.Schema(
    {
        username: { type: String },
        chatId: { type: String },
        referral: { type: String, default: '' },
        referralCode: { type: String, unique: true },
    },
    {
        timeStamps: true,
    },
);

// Utility function to generate an 8-digit random string
function generateRandomString() {
    return crypto.randomBytes(4).toString('hex').substring(0, 8);
}
// generate referral code
userSchema.pre('save', async function (next) {
    if (this.isNew) {
        let unique = false;
        while (!unique) {
            this.referralCode = generateRandomString();
            const existingString = await User.findOne({ referralCode: this.referralCode });
            if (!existingString) {
                unique = true;
            }
        }
    }
    next();
});

function encryption(text) {
    let cipher = crypto.createCipheriv(
        process.env.algorithm,
        Buffer.from(process.env.key, 'hex'),
        Buffer.from(process.env.iv, 'hex'),
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

function decryption(text) {
    let encryptedText = Buffer.from(text, 'hex');

    let decipher = crypto.createDecipheriv(
        process.env.algorithm,
        Buffer.from(process.env.key, 'hex'),
        Buffer.from(process.env.iv, 'hex'),
    );

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

userSchema.methods.encrypt = async function () {
    let encryptData1 = encryption(this.privateKey);
    this.privateKey = encryptData1;
};

const User = mongoose.model('User', userSchema);
module.exports.User = User;
module.exports.encryption = encryption;
module.exports.decryption = decryption;
