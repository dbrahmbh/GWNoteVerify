const sql = require('mssql');
const config = {
    user: 'GWAdminLogin', // better stored in an app setting such as process.env.DB_USER
    password: 'GWAdmin24', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'myfreesqldbservergoodwill.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'myFreeDB', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}
console.log("Starting...");
connectAndQuery();
async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);

        console.log("Reading rows from the Contacts Table...");
        var resultSet = await poolConnection.request().query(`SELECT TOP 1000 [FirstName], [LastName], [Age], [ID], [NotesCreatedIDs], [NotesTaggedIDs], [NotesPrimaryTaggedIDs] FROM [dbo].[Contacts]`);

        console.log(`${resultSet.recordset.length} rows returned.`);

        // Output to console if needed
        resultSet.recordset.forEach(row => {
            console.log(`ID: ${row.ID}, Name: ${row.FirstName} ${row.LastName}, Age: ${row.Age}`);
        });

        poolConnection.close();

        return resultSet.recordset; // Return this result to your API call
    } catch (err) {
        console.error(err.message);
        return null; // return null in case of an error
    }
}
module.exports = { connectAndQuery };

/*
    //Use Azure VM Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        port: process.env["db_port"],
        database: process.env["db_database"],
        authentication: {
            type: 'azure-active-directory-msi-vm'
        },
        options: {
            encrypt: true
        }
    }

    //Use Azure App Service Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        port: process.env["db_port"],
        database: process.env["db_database"],
        authentication: {
            type: 'azure-active-directory-msi-app-service'
        },
        options: {
            encrypt: true
        }
    }
*/