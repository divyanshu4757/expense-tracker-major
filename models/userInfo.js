const Sequelize = require('sequelize');

const sequelize = new Sequelize('expenses' , 'root' ,'ak475767' ,{dialect:'mysql' , host:'localhost'});


const Signup_details = sequelize.define('signup',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true ,
        allowNull:false   
    },
    name:Sequelize.STRING,
    email:Sequelize.STRING,
    password:Sequelize.STRING
})


module.exports ={sequelize: sequelize,
  
Signup_details:Signup_details,

}
