require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const twilio = require("twilio");
app.use(bodyParser.json());
app.use(cors());


app.post("/twilioSMS", async (req, res) => {
    const { to, body } = req.body;
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = twilio(accountSid, authToken);

        const message = await client.messages.create({
            body: body,
            from: "+17087296801",
            to: to,
        });
       
        res.status(200).send({success: true, message: "SMS sent successfully" });
    } catch (error) {
        console.log(error);
         res.status(500).send({success: false, error: "Failed to send SMS" });
    }


});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});