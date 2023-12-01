import { test, expect } from '@playwright/test';
import { pomTest } from './fixtures/pomTest'; 


test.describe('api', async () => {
    const nodemailer = require('nodemailer');
    const { google } = require('googleapis');
    test('send email through API', async ({ page }) => {

        const CLIENT_ID = process.env.CLIENT_ID;
        const CLIENT_SECRET = process.env.CLIENT_SECRET;
        const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
        const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

        const oAuth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        );
        oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

        async function sendMail() {
            try {
                const accessToken = await oAuth2Client.getAccessToken();

                const transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user: 'testsangeles@gmail.com',
                        clientId: CLIENT_ID,
                        clientSecret: CLIENT_SECRET,
                        refreshToken: REFRESH_TOKEN,
                        accessToken: accessToken,
                    },
                });

                const mailOptions = {
                    from: 'SENDER NAME <testsangeles@gmail.com>',
                    to: 'testsangeles@gmail.com',
                    subject: 'Hello World from API',
                    text: 'Im sending this email using GMAILs API public services. do not reply!',
                    html: '<h1>Im sending this email using GMAILs API public services. do not reply!</h1>',
                };

                const result = await transport.sendMail(mailOptions);
                return result;
            } catch (error) {
                return error;
            }
        }

        await sendMail()
            .then((result) => console.log('Email sent...', result))
            .catch((error) => console.log(error.message));
    });
});


test.describe('ui', async () => {


    pomTest('login?',async({page,loginPage})=>{

        await loginPage.login();
        await page.goto('https://gmail.com');
        await page.pause();
    });

});