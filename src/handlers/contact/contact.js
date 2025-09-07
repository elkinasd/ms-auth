const nodemailer = require('nodemailer');
const Contact = require('../../models/Contact');

async function contactHandler(req, res){
    try{
        const data = new Contact(req.body);

        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465, // o 587 si prefieres TLS
            secure: true, // true para 465, false para 587 
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const info = await transporter.sendMail({
            from: `"Landing Page" <${process.env.MAIL_USER}>`,
            to: 'contacto@ayvtraditions.com', // tu buzón de destino
            subject: `Nuevo contacto: ${data.fullName}`,
            html: `
                <h2>Nuevo mensaje de contacto</h2>
                <p><b>Nombre:</b> ${data.fullName}</p>
                <p><b>Empresa:</b> ${data.CompanyName}</p>
                <p><b>Email:</b> ${data.email}</p>
                <p><b>Teléfono:</b> ${data.phone}</p>
                <p><b>Asunto:</b> ${data.issue}</p>
                <p><b>Medio de contacto:</b> ${data.channel}</p>
                <p><b>Mensaje:</b><br>${data.request}</p>
            `
        });
        console.log('Correo enviado: ', info.messageId);
        res.json({ ok: true, msg: 'Correo enviado correctamente.' })

    }catch(e){
        console.error(e)
        res.status(500).json({ ok: false, msg: 'Error al enviar el correo.' })
    }
}

module.exports = contactHandler;