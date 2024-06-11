const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "hzrecho@gmail.com",
        pass: "gdpfacqfwqdxejza",
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendEmailToMemberList(userList, subject, content) {
    const to = userList.join(',')
    console.log(to)
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"My Organization List" <hzrecho@gmail.com>', // sender address
        to, // list of receivers
        subject: subject, // Subject line
        text: content, // plain text body
        // html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports.sendEmailToMemberList = sendEmailToMemberList

// test
// sendEmailToMemberList(['734208174@qq.com'], "新的活动", "活动内容").catch(console.error);