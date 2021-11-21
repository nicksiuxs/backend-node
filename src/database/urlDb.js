const user ="dev";
const password= "misiontic"
const database = "db_ecommerce"

module.exports = {
    db: `mongodb+srv://${user}:${password}@cluster0.55jns.mongodb.net/${database}`
}