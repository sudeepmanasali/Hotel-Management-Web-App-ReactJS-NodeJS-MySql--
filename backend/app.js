const mysql = require('mysql');
const express = require('express');
const multer = require('multer')
const path = require('path')
var app = express()
var cors = require('cors')
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const helmet = require("helmet");
const auth = require("./auth");

app.use(helmet());
var options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'hotelmanagement',
    schema: {
		tableName: 'custom_sessions_table_name',
		columnNames: {
			session_id: 'custom_session_id',
			expires: 'custom_expires_column_name',
			data: 'custom_data_column_name'
		}
	}
};


var sessionStore = new MySQLStore(options);

app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



var  mysqlConnection = mysql.createConnection({
    host: "localhost",

	user: "root",
	password: "",
	database: "hotelmanagement",

});

mysqlConnection.connect((err)=>{
   if(!err){
       console.log("SUccessfully connected to database ...!!");
   }
   else{
       console.log(err);
   }
});



const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
})


app.use('/profile', express.static('upload/images'));

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.post("/upload", upload.single('profile'),(req,res)=>{
   res.json({
       success:1,
       profile_url: `http://localhost:8000/profile/${req.file.filename}`
   })
})

const customer = require("./routers/Customer");
const Admin = require("./routers/Admin");


app.use(customer);
app.use(Admin);


app.listen(8000,()=>{console.log("expresss server is running at port nnumber 3000")})





