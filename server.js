require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({
    origin: "https://matheusdevprado.github.io",  // Permite requisições do GitHub Pages
    methods: "GET, POST, OPTIONS",
    allowedHeaders: "Content-Type"
}));

// Responder manualmente a requisições OPTIONS (preflight)
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://matheusdevprado.github.io");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.sendStatus(200);
});
 app.use(cors());

app.post("/enviar-email", async (req, res) => {
    const dados = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS 
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "acampmjamis@gmail.com",
        subject: "Autorização para Menores - Formulário Recebido",
        html: `
            <h3>Dados Recebidos:</h3>
            <p><strong>Nome:</strong> ${dados.campo1}</p>
            <p><strong>CPF:</strong> ${dados.campo2}</p>
            <p><strong>Adolescente:</strong> ${dados.campo3}</p>
            <p><strong>RG:</strong> ${dados.campo4}</p>
            <p><strong>Telefone:</strong> ${dados.campo5}</p>
            <p><strong>Assinatura:</strong> ${dados.campo6}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ mensagem: "E-mail enviado com sucesso!" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao enviar o e-mail", erro: error });
    }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
