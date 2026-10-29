const nodeMailer = require('nodemailer');
const { PROVIDER_CORREO, USUARIO_CORREO, CONTRASENA_CORREO } = process.env;

const transporter = nodeMailer.createTransport({
  service: PROVIDER_CORREO,
  secure: false,
  port: 587,
  auth: {
    user: USUARIO_CORREO,
    pass: CONTRASENA_CORREO,
  },
});

const enviarCorreo = async (destinatario, asunto, mensaje) => {
  try {
    const mailOptions = {
        from: USUARIO_CORREO,
        to: destinatario,
        subject: asunto,
        text: mensaje,
    };
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

module.exports = { enviarCorreo };
module.exports = transporter;