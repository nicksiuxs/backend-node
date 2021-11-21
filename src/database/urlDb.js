const user =process.env.NODE_USER_DB;
const password= process.env.NODE_PASSWORD_DB;
const database = "db_ecommerce"

module.exports = {
    db: `mongodb+srv://${user}:${password}@cluster0.55jns.mongodb.net/${database}`
}