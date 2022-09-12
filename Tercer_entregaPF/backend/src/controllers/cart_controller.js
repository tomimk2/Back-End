const classC = require("../lib/carts_class");
const classCarts = new classC;
const uuid = require("uuid");
const {transporter} = require('../config/nodemailer');
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTHTOKEN);
const {log4js} = require('../middlewares/logger');
const loggerError = log4js.getLogger('error');
const loggerWarning = log4js.getLogger('warn');


const createCart = async (req, res) => {
    const {comprador, productos, precioFinal, fecha} = req.body;
    comprador.id_comprador = comprador.id;
    const cart = {id: uuid.v4(), comprador, productos, precioFinal, fecha};
    const subject = `Nuevo pedido de ${comprador.nombre} - ${comprador.username}`;
    let messageId;
    let whatsappId;
    let smsId;

    const mailOptions = {
        from: 'macarenasromero@gmail.com',
        to: process.env.NODEMAILER_USER,
        subject: subject,
        text: JSON.stringify(productos) 
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            loggerError.error(`Ocurrió un error al enviar el correo electrónico: ${err}`);
            return;
        }
        return messageId = info.messageId;
    });

    client.messages.create({
        body: subject,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:+549${Number(process.env.TWILIO_NUMWHATSAPP)}`
    }, (err, info) => {
        if(err) {
            loggerError.error(`Ocurrió un error al enviar el mensaje por WhatsApp: ${err}`);
            return;
        }
        return whatsappId = info.accountSid;
    });


    client.messages.create({
        body: "Tu pedido fue recibido y se encuentra en proceso",
        from: '16184271614',
        to: `+54${Number(comprador.telefono)}`
    }, (err, info) => {
        if(err) {
            loggerError.error(`Ocurrió un error al enviar el mensaje por SMS: ${err}`);
            return;
        }
        return smsId = info.accountSid;
    });

    try {
        const result = await classCarts.createCart(cart);
        res.status(200).json(result);
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar crear el pedido: ${error}`);
        res.status(500).json({
            "Ocurrió un error": error
        });
    };   
};

const getProductsByUserId = async (req, res) => {
    const {id} = req.params;

    const products = await classCarts.getCarts(id);

    if (products != undefined) {
        try {
            res.status(200).json(products);
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar obtener las órdenes: ${error}`);
            res.status(500).json({
                "Ocurrió un error": error
            });
        };
    } else {
        loggerWarning.error(`No se encontró el carrito con id ${id}`);
        res.status(404).json(`No se encontró el carrito con id ${id}`);
    };
};


module.exports = {
    createCart,
    getProductsByUserId
};