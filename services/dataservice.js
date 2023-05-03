const jwt = require("jsonwebtoken")
const db = require('./db')

register = (firstname, lastname, email, password) => {

    // if (acno in userDetails) {
  
    return db.User.findOne({ email }).then(Person => {
      if (Person) {
        return {
          status: false,
          message: 'user already exist',
          statuscode: 401
        }
      } else {
        //create new user object in database
        const newuser = new db.User({
          firstname,
          lastname,
          email,
          password,
          list: []
        })
        // save object in db
        
        newuser.save()
  
        return {
          status: true,
          message: 'Registered successfully',
          statuscode: 200
        }
      }
    })
  }

  login = (email, password) => {


    return db.User.findOne({ email, password }).then(Person => {
      if (Person) {
        firstname = Person.firstname
        lastname = Person.lastname
        currentAc = email

      const token = jwt.sign({ currentAc }, "secretkey1")
  
        return {
          status: true,
          message: 'Login Success',
          statuscode: 200,
          firstname,
          lastname,
          currentAc,
          token
  
  
        }
      } else {
        return {
          status: false,
          message: 'incorrect account number or password',
          statuscode: 401
        }
      }
    })
  
  
  
  }

  viewProfessors = ()=>{
    return db.Professor.find().then(Person => {
      if(Person){
        return{
          status:true,
          statuscode:200,
          data:Person
        }
      }else{
        return{
        status: false,
        statuscode: 401}
      }
    })
  }

  ProfessorDetails=(profId)=>{
    return db.Professor.findOne({id:profId}).then(Person => {
      if(Person){
        return{
          status:true,
          statuscode:200,
          data:Person
        }
      }else{
        return{
        status: false,
        statuscode: 401}
      }
    })

  }

  bookClass=(profData,email)=>{
    return db.User.findOne({email}).then(Person => {
      if(Person){

        Person.list.push(profData)
        Person.save()
        return{
          status:true,
          statuscode:200,
          message:"Your request has been notified to the Professor and you will be contacted by the Professor via Email"

        }
      }else{
        return{
        status: false,
        statuscode: 401}
      }
    })
  }

  bookingHistory=(email)=>{
    return db.User.findOne({email}).then(Person=>{
      if(Person){
       
        return{
          status:true,
          statuscode:200,
          data:Person.list
        }
      }else{
        return{
        status: false,
        statuscode: 401}
      }
    })
  }


  module.exports={
    register,
    login,
    viewProfessors,
    ProfessorDetails,
    bookClass,
    bookingHistory
  }