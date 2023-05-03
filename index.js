const dataservice = require('./services/dataservice')

const express = require("express")

const app = express()

const cors = require("cors")

app.use(cors({origin:'http://localhost:4200'}))

const jwt = require("jsonwebtoken")

app.use(express.json())

const jwtmiddleware = (req, res, next) => {
   try {
      const token = req.headers['access_token']
      //verify token
      const data = jwt.verify(token, "secretkey1")
      //to continue to the next step
      next()
   }
   catch {
      res.status(422).json({
         statuscode: 422,
         status: false,
         message: "Please LogIn First"
      })
   }

}






app.post('/register', (req, res) => {

    dataservice.register(req.body.firstname, req.body.lastname, req.body.email, req.body.password).then(result => {
 
       res.status(result.statuscode).json(result)
    })
 
 
 
 })

 app.post('/login', (req, res) => {

    dataservice.login(req.body.email, req.body.password).then(result => {
       res.status(result.statuscode).json(result)
    })
 
 
 
 
 
 })

 app.get('/viewProfessors',(req,res)=>{
    dataservice.viewProfessors().then(result=>{
      res.status(result.statuscode).json(result)
    })
 })

 app.post('/ProfessorDetails',(req,res)=>{
   dataservice.ProfessorDetails(req.body.profId).then(result=>{
      res.status(result.statuscode).json(result)
   })
 })

 app.post('/bookClass',jwtmiddleware, (req,res)=>{
   dataservice.bookClass(req.body.profData,req.body.email).then(result=>{
      res.status(result.statuscode).json(result)
   })

 })

 app.post('/bookingHistory',jwtmiddleware, (req,res)=>{
   dataservice.bookingHistory(req.body.email).then(result=>{
      res.status(result.statuscode).json(result)
   })
 })

app.listen(3000, () => { console.log("Server started at port number 3000"); })