/* eslint-disable no-console */
import fs         from 'fs';
import path       from 'path';
import nodemailer from 'nodemailer';

export default class {
    constructor(environment) {
        this._environment = environment;
    }

    log(stack) {
        this._logFile(stack);
        if (this._environment.app.sendEmailErrors) this._logMail(stack);

        console.log('\x1b[31m[Exception] uncaughtException has launched\x1b[0m');
    }

    _logFile(message) {
        let errorStr = '';

        errorStr += `######### ${Date().toLocaleString()} #########\n`;
        errorStr += `${message}\n`;
        errorStr += `###########################################################\n\n`;

        fs.createWriteStream(path.join(__dirname, '../../logs/error.txt'), {'flags': 'a'}).write(errorStr);
    }

    _logMail(message) {
        nodemailer.createTestAccount(err => {
            try {
                const transporter = nodemailer.createTransport(this._environment.mail);

                transporter.sendMail({
                    from   : `"[Piaget] ${this._environment.app.name}" <${this._environment.mail.sender}>`,
                    to     : this._environment.app.adminEmail,
                    subject: '[🕷️] Erro não tratado',
                    text   : '[🕷️] Erro não tratado',
                    html   : `<pre>${message}</pre>`
                }, error => {
                    if (error) return console.log(error);
                });
            } catch (e) {
                return console.log(e);
            }

            if (err) return console.log(err);
        });
    }
}