require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // For Azure SQL, set to true
        trustServerCertificate: true // Only for development
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => console.error('Database connection failed!', err));

app.get('/fetch-data', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`SELECT TOP 1000 [FirstName], [LastName], [Age], [ID], [NotesCreatedIDs], [NotesTaggedIDs], [NotesPrimaryTaggedIDs] FROM [dbo].[Contacts]`);
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/add-user', async (req, res) => {
    try {
        const { FirstName, LastName, Age, NotesCreatedIDs, NotesTaggedIDs, NotesPrimaryTaggedIDs } = req.body;
        const pool = await poolPromise;
        const request = pool.request();
        request.input('FirstName', sql.VarChar, FirstName);
        request.input('LastName', sql.VarChar, LastName);
        request.input('Age', sql.Int, Age);
        request.input('NotesCreatedIDs', sql.VarChar, NotesCreatedIDs);
        request.input('NotesTaggedIDs', sql.VarChar, NotesTaggedIDs);
        request.input('NotesPrimaryTaggedIDs', sql.VarChar, NotesPrimaryTaggedIDs);
        await request.query(`
            INSERT INTO [dbo].[Contacts] ([FirstName], [LastName], [Age], [NotesCreatedIDs], [NotesTaggedIDs], [NotesPrimaryTaggedIDs])
            VALUES (@FirstName, @LastName, @Age, @NotesCreatedIDs, @NotesTaggedIDs, @NotesPrimaryTaggedIDs)
        `);
        res.status(201).json({ message: 'User added successfully' });
    } catch (err) {
        console.error('Failed to add user:', err);
        res.status(500).json({ message: 'Failed to add user' });
    }
});

// Fetching notes
app.get('/fetch-notes', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT TOP 1000 [NoteID], [NoteText], [CreatedByID], [PrimaryRecipientID], [TaggedIDs]
            FROM [dbo].[Notes]
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Adding a note
app.post('/add-note', async (req, res) => {
    try {
        const { NoteText, CreatedByID, PrimaryRecipientID, TaggedIDs } = req.body;
        const pool = await poolPromise;
        const request = pool.request();
        request.input('NoteText', sql.VarChar, NoteText);
        request.input('CreatedByID', sql.Int, CreatedByID);
        request.input('PrimaryRecipientID', sql.Int, PrimaryRecipientID);
        request.input('TaggedIDs', sql.VarChar, TaggedIDs);
        await request.query(`
            INSERT INTO [dbo].[Notes] ([NoteText], [CreatedByID], [PrimaryRecipientID], [TaggedIDs])
            VALUES (@NoteText, @CreatedByID, @PrimaryRecipientID, @TaggedIDs)
        `);
        res.status(201).json({ message: 'Note added successfully' });
    } catch (err) {
        console.error('Failed to add note:', err);
        res.status(500).json({ message: 'Failed to add note' });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
