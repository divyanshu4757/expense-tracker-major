const express = require('express')

const app = express();

const cors = require('cors')
const bodyParser = require('body-parser');

const routes = require('./routes/routes.js')
const Sequelize = require('./models/userInfo.js');
const signup_details = require('./models/userInfo.js');

const signup_table = signup_details.Signup_details;


const expense_table = require('./models/expenses.js');
const order_table = require('./models/orders.js');


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 



app.use(routes); 


signup_table.hasMany(expense_table)
expense_table.belongsTo(signup_table);


signup_table.hasMany(order_table);
order_table.belongsTo(signup_table);



Sequelize.sequelize.sync().then((result)=>{
    app.listen(5000);
})
.catch(error=>{
    console.log(error);
})

