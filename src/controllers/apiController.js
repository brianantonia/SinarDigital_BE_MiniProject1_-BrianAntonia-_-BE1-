
const fs = require('fs');
const path = require('path');


const DATA_FILE = path.join(__dirname, '../../data/data.json');


/**
 * Menghitung rata-rata suasana hati dari seluruh entri.
 * @param {Array<Object>} data 
 * @returns {{average: number, count: number}} 
 */
const calculateMoodAverage = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
        return { average: 0, count: 0 };
    }

    
    const totalMood = data.reduce(
        (accumulator, entry) => accumulator + entry.moodLevel, 
        0
    );

   
    const average = (totalMood / data.length).toFixed(2);

  
    return { average: parseFloat(average), count: data.length };
};




exports.getHomePage = (req, res) => {
    res.send(`
        <h1>🐈 Cat Mood Tracker</h1>
        <p>Aplikasi sederhana untuk mencatat suasana hati kucing.</p>
        <ul>
            <li><a href="/log-mood">Catat Mood Baru</a></li>
            <li><a href="/mood-history">Lihat Riwayat Mood</a></li>
        </ul>
    `);
};

exports.getFormPage = (req, res) => {

    res.send(`
        <h2>Catat Suasana Hati Kucing</h2>
        <form method="POST" action="/log-mood">
            <label for="catName">Nama Kucing:</label><br>
            <input type="text" id="catName" name="catName" required><br><br>

            <label for="moodLevel">Level Suasana Hati (1 - 5):</label><br>
            <input type="number" id="moodLevel" name="moodLevel" min="1" max="5" required><br><br>

            <label for="description">Deskripsi (Mengapa mood ini?)</label><br>
            <textarea id="description" name="description" rows="4" cols="50"></textarea><br><br>

            <button type="submit">Simpan Log Mood</button>
        </form>
        <p><a href="/">Kembali ke Home</a></p>
    `);
};

exports.processFormData = (req, res) => {
    const { catName, moodLevel, description } = req.body;
    
    const parsedMoodLevel = parseInt(moodLevel);

    if (isNaN(parsedMoodLevel) || parsedMoodLevel < 1 || parsedMoodLevel > 5) {
        return res.status(400).send("Input Level Suasana Hati tidak valid (harus angka 1-5).");
    }

    const newEntry = {
        id: Date.now(), 
        catName: catName || 'Unnamed Cat',
        moodLevel: parsedMoodLevel,
        description: description || '-',
        timestamp: new Date().toISOString()
    };


    let data = [];
    try {
        const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
        data = JSON.parse(rawData);
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error("Error reading data.json:", error.message);
        }
    }

  
    data.push(newEntry);


    try {
     
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)); 
        

        res.redirect('/mood-history'); 
    } catch (error) {
        console.error("Error writing to data.json:", error);
        res.status(500).send('Terjadi kesalahan server saat menyimpan data.');
    }
};

exports.getHistoryPage = (req, res) => {
    let data = [];
    try {
        const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
        data = JSON.parse(rawData);
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error("Error reading data.json:", error.message);
        }
    }


    const { average, count } = calculateMoodAverage(data);

    
    const dataList = data.reverse().map(entry => 
        `<li>
            [${entry.timestamp.substring(0, 10)}] **${entry.catName}**: 
            Mood Level: <b>${entry.moodLevel} / 5</b><br>
            Deskripsi: <i>${entry.description}</i>
        </li>`
    ).join('');

    res.send(`
        <h2>📊 Riwayat Suasana Hati Kucing</h2>
        <p>Total Entri: <b>${count}</b> | Rata-rata Mood Keseluruhan: <b>${average}</b></p>
        <hr>
        <ul style="list-style-type: none; padding: 0;">${dataList}</ul>
        <p><a href="/">Kembali ke Home</a> | <a href="/log-mood">Catat Mood Baru</a></p>
    `);
};