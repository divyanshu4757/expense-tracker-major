const signup_details = require('../models/userInfo.js');

const signup_table = signup_details.Signup_details;




exports.signUp = (req,res,next)=>{


    const body = req.body;


    signup_table.findAll({where:{email:req.body.email}})
    .then((result)=>{
        console.log(result[0])
        if(result[0]){

            res.json({success:false})
        }

        else{
            signup_table.create({
                name:body.name,
                email:body.email,
                password:body.password
            })
            .then(data=>{
            res.json({success:true})
                
            })
        }
    })

    




}



exports.login = (req,res,next) =>{

    const body = req.body;
    console.log(req.body.email)

    signup_table.findAll({where:{email:req.body.email}}).then(data=>{
        
        if(data[0]){
            if(data[0].dataValues.password==req.body.password){
            res.send('User login sucessful')
            }
            else{
                res.status(401).send('User not authorised')
            }
            }

        else{
            
            res.status(404).send('User not found')
        }
        
    })


}