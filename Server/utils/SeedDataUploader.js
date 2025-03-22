const subjects = require("../models/Subject")

const SeedData =[
    {Sname:"DSA (Data Structure & Algorithms)" , Scode:"CS-301",},
    {Sname:"CN (Computer Networks)" ,Scode:"CS-402"},
    {Sname:"DBMS (Database Management Syatem)",Scode:"CS-503"},
    {Sname:"OOPS (Object Oriented Programming)",Scode:"CS-301"},
    {Sname:"OS (Operating System)", Scode:"CS-501"}
]

const EnterSeedData = async()=>{

    const countSubjects = await subjects.countDocuments()

    if(SeedData.length>countSubjects){
        if(countSubjects===0){
            await subjects.create([...SeedData])
            console.log("Seed data Entered Sucessfuly")
            return 
        }else{
            // delete all the documents
            await subjects.deleteMany()
            // now enter the seedData 
            await subjects.create([...SeedData])

            console.log("Seed Data updated Sucessfuly")
            return 

        }
    }else{
        console.log("Seed data found sucessful")
        return 
    }
} 

module.exports  = EnterSeedData