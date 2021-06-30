const mailer = require('nodemailer');

const rootMail = {
    user: 'vunam1218@gmail.com',
    pass: 'vunam123'
}

const transporter = mailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: rootMail.user,
            pass: rootMail.pass
        }
    }
);

function SendMail(EmailTarget) {
    const codeConfirm = Math.random().toString(36).toUpperCase().substr(2, 5);
    const messTex = `Xin chào. Gần đây, bạn đã đăng ký tài khoản. Để hoàn thành quy trình đăng ký, vui lòng xác nhận tài khoản của bạn. Bạn có thể được yêu cầu nhập mã xác nhận này: <strong>${codeConfirm}</strong>`
    const MailTemplate = {
        from: rootMail.user,
        to: EmailTarget,
        subject: 'Xác thực email đăng ký tài khoản',
        html: messTex
    };

    transporter.sendMail(MailTemplate, (err, data) => {
        if (err) {
            console.log('Error: 1', err);
        }
        else {
            console.log('Email sent');
            return null;
        }
    });

    return codeConfirm;
}

module.exports = {
    sendMail: SendMail
}