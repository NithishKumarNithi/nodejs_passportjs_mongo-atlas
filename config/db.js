const mongoUri = "mongodb+srv://mongo_test:test123@mongotest.eyd0b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDb = (mongoose) => {
    let conn = false;
    mongoose.connect(mongoUri)
    .then(
        (cn) => { 
            console.log(`${cn.connection.host} database established`);
            conn = true;
        },
        err => {console.log(err.codeName)}
    );
    return conn;
}

module.exports = connectDb;
