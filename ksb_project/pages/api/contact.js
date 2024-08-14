import '../../Database/connection'
const Contact = require("../../Models/ContactModel")


export default async function handler(req,res){
  try{
    if(req.method=="POST"){
      const{name,email,subject,message} = req.body
      const contact = await Contact.create({name,email,subject,message})
      if(!contact){
        return res.status(400).json({error:"Something went wrong"})
      }
      res.send(contact)
    } 
    else if(req.method == "GET"){
      if(req.query.id){
        const contact = await Contact.findById(req.query.id)
        if(!contact){
          return res.status(400).json({error:"Something went wrong"})
        }
        res.send(contact)
      } else{
        const contacts = await Contact.find()
        res.send(contacts)
      }
    } 
    else if(req.method == "DELETE"){
      const deleteContact = await Contact.findByIdAndDelete(req.query.id)
      if(!deleteContact){
        return res.status(400).json({error:"Something went wrong"})
      }
      res.send({ message: "Category deleted successfully" })
    } else {
      res.status(405).json({ error: "Method not allowed" })
  }
  }
  catch(error){
    res.status(500).json({ error: "Internal server error" })
  }
}