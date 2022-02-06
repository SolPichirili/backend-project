const twilio = require('twilio');
const logger = require('./winston');

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const sendWsp = async (messg) => {
    try {
        const message = await client.messages.create(
            {
                body: messg,
                from: '+14155238886',
                to: '+541168226456'
            }
        );
    }
    catch (error) {
        logger.error(error);
    }
}

module.exports = {
    sendWsp
}