const bcrypt = require('bcrypt');



const signup_details = require('../models/userInfo.js');

const signup_table = signup_details.Signup_details;


const expense_table = require('../models/expenses.js');


exports.signUp = (req,res,next)=>{
    const body = req.body;


    signup_table.findAll({where:{email:req.body.email}})
    .then((result)=>{
        console.log(result[0])
        if(result[0]){

            res.json({success:false})
        }

        else{

            bcrypt.hash(body.password , 10 ,(err,hash)=>{
                signup_table.create({
                    name:body.name,
                    email:body.email,
                    password:hash,
                })
                .then(data=>{
                res.json({success:true})
                    
                })

            })

            
        }
    })

    




}



exports.login = (req,res,next) =>{

    const body = req.body;
    console.log(req.body.email)

    signup_table.findAll({where:{email:req.body.email}}).then(data=>{
        
        if(data[0]){
            bcrypt.compare(req.body.password,data[0].dataValues.password,(err,response)=>{
               console.log(response);

               if(err){
                res.status(500).send('something went wrong')
               }

             if(response===true){
                 res.send('User login sucessful')
             }
             else if(response===false){
                 res.status(401).send('User not authorised')
             }
 
            });
            
             
             }
 
        else{
            
            res.status(404).send('User not found')
        }
        
    })


}



exports.postExpenses=(req,res,next)=>{

    const incomingData=req.body;

    expense_table.create({
       amount: incomingData.amount,
       category: incomingData.category,
       description: incomingData.description
    })
    .then(serverData=>{
        res.json({data:serverData.dataValues})
    })

}


exports.getExpenses=(req,res,next)=>{

    expense_table.findAll()
    .then((result)=>{
        const pureResult = result.map(key=>key.dataValues)
       
        res.json(pureResult);

    })
    .catch((error)=>{
        console.log(error);
    })


}


exports.deleteExpense=(req,res,next)=>{
    const id =req.params.id;

    expense_table.destroy({where:{id:id}})
    .then((result)=>{
          res.json({message:'User deleted'});
      })
      .catch(error=>{
         console.log(error);
      })


};