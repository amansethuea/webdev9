const config = {
    development: {
        host: "cmpstudb-01.cmp.uea.ac.uk",
        user: "xzu22dbu",
        password: "KillSharpSubstance80*",
        database: "xzu22dbu",
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

