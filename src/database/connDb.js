const mongoose = require('mongoose');
const { db } = require('./urlDb');

class ConnDb {
    constructor() {
        this.connection();
    }

    async connection() {
        try {
            this.conn = await mongoose.connect(db);
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ConnDb;