const express = require('express')

const app = express();

const cors = require('cors')
const bodyParser = require('body-parser');

const routes = require('./routes/routes.js')
const Sequelize = require('./models/userInfo.js');



app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 



app.use(routes); 





Sequelize.sequelize.sync().then((result)=>{
    app.listen(5000);
})
.catch(error=>{
    console.log(error);
})

