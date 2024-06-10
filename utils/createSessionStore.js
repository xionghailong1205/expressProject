var session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const dbConfig = require("./dbConfig")

const store = new MySQLStore(dbConfig);

store.onReady().then(() => {
    // MySQL session store ready for use.
    console.log('MySQLStore ready');
}).catch(error => {
    // Something went wrong.
    console.error(error);
});

const getStore = () => {
    return store
}

module.exports.store = store
module.exports.getStore = getStore