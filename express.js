const express = require('express');
const app = express();
const { connectAndQuery } = require('./sqltest');

app.get('/fetch-data', async (req, res) => {
    try {
        const data = await connectAndQuery();
        if (data) {
            res.json(data);
        } else {
            res.status(500).send('No data found or error in query');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
