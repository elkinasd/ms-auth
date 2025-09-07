const nodemailer = require('nodemailer');
const Contact = require('../../models/Contact');

async function contactHandler(req, res) {
  try {
    console.log('Body recibido:', req.body);
    const data = new Contact(req.body); // 👈 usa el modelo

    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
    });

    // await transporter.verify(); // (opcional) para diagnosticar conexión

    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: 'a.aguilar@ayvtraditions.com',
      replyTo: data.email || undefined,
      subject: `Nuevo contacto: ${data.fullName ?? '-'}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><b>Nombre:</b> ${data.fullName ?? '-'}</p>
        <p><b>Empresa:</b> ${data.companyName ?? '-'}</p>
        <p><b>Email:</b> ${data.email ?? '-'}</p>
        <p><b>Teléfono:</b> ${data.phone ?? '-'}</p>
        <p><b>Asunto:</b> ${data.issue ?? '-'}</p>
        <p><b>Medio de contacto:</b> ${data.channel ?? '-'}</p>
        <p><b>Mensaje:</b><br>${data.request ?? '-'}</p>
      `
    });

    console.log('Correo enviado:', info.messageId);
    res.json({ ok: true, msg: 'Correo enviado correctamente.' });
  } catch (e) {
    console.error('SMTP ERROR:', e);
    res.status(500).json({ ok: false, msg: 'Error al enviar el correo.' });
  }
}
module.exports = contactHandler;
