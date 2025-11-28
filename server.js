// server.js
const app = require('./src/app');

// Gunakan port 3000 sebagai default
const PORT = 3000; 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Akses aplikasi di: http://localhost:${PORT}`);
});