const mongoose=require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/OnlineProfessor')

const User=mongoose.model('User',{
    firstname: String,
    lastname: String, 
    email: String, 
    password: String,
    list: [] 
})

const Professor=mongoose.model('Professor',{
    id:Number,
    name:String,
    image:String,
    subject:String,
    personalDescription:String,
    aboutLesson:String,
    fees:String,
    review:[],
    schedule:[]
})


module.exports={
    User,
    Professor
}