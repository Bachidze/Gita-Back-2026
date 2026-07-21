const { default: mongoose } = require("mongoose")


async function connectToMongo(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log({message:"გილოცავ წარამტებით დაუკავშირდი ბაზას"})
    } catch (error) {
        console.log(error,"ეს ერორი მოდის მონგოს ქონექთიდან")
    }
}


module.exports = connectToMongo

