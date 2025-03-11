const mongoose= require('mongoose')

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://culturalteammcj:Aqua2024@aquaregia.9rho1co.mongodb.net/?retryWrites=true&w=majority');
    console.log("connected to database")
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


