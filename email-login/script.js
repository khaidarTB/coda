const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Konfigurasi Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Anda bisa menggunakan layanan email lain
    auth: {
        user: 'YOUR_EMAIL@gmail.com', // Ganti dengan email Anda
        pass: 'YOUR_EMAIL_PASSWORD' // Ganti dengan password email Anda
    }
});

// Endpoint untuk mengirim email
app.post('/send-email', (req, res) => {
    const { email } = req.body;

    const mailOptions = {
        from: 'khaidaridar18@gmail.com',
        to: 'khaidaridar09@gmail.com', // Ganti dengan email tujuan
        subject: 'New Login',
        text: `User  logged in with email: ${email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});