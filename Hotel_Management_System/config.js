const config = {
    development: {
        host: "cmpstudb-01.cmp.uea.ac.uk",
        user: "zfb23ecu",
        password: "",
        database: "zfb23ecu",
    },
    production: {
        user: '', // env var: PGUSER  - YOUR UEA username
        database: '', // env var: PGDATABASE  - YOUR UEA username
        password: '', // env var: PGPASSWORD  - YOUR UEA password
        host: 'cmpstudb-01.cmp.uea.ac.uk', // Server hosting the postgres database
        port: 5432, // env var: PGPORT
    },

};
module.exports = config;

