require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

fetch("https://authorization-2-euf8.onrender.com/enviar-email", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    campo1: "Nome Exemplo",
    campo2: "123.456.789-00",
    campo3: "Adolescente",
    campo4: "12.345.678-9",
    campo5: "(11) 98765-4321",
    campo6: "Assinatura Exemplo"
  })
})
  .then(response => response.json())
  .then(data => {
    console.log("Sucesso:", data);
  })
  .catch((error) => {
    console.error("Erro:", error);
  });


    try {
        await transporter.sendMail(mailOptions);
        res.json({ mensagem: "E-mail enviado com sucesso!" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao enviar o e-mail", erro: error });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
