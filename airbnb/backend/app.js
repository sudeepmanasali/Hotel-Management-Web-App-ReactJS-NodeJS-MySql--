const mysql = require('mysql');
const express = require('express');
const multer = require('multer')



const path = require('path')

var app = express()
var cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



var  mysqlConnection = mysql.createConnection({
      host:"localhost",
      user:"root",
      password:"",
      database:"hotelmanagement"

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

console.log(upload)
app.use('/profile', express.static('upload/images'));

app.post("/upload", upload.single('profile'),(req,res)=>{
   console.log(req.file)
   res.json({
       success:1,
       profile_url: `http://localhost:8000/profile/${req.file.filename}`
   })
})

app.listen(8000,()=>{console.log("expresss server is running at port nnumber 3000")})

app.get("/customer",(req,res)=>{
    mysqlConnection.query("select * from customer",(err, rows, fields)=>{
        if(!err){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

app.get("/rooms/details/:start_date/:end_date",(req,res)=>{
    
    // console.log(Date())
    mysqlConnection.query("SELECT type_name, cost, room.room_id,availability, images, facility, facility_cost from (((room inner join room_type on room.type_id = room_type.type_id) inner join room_status on room.status_id = room_status.status_id )  inner join facilities on room.facility_id = facilities.facility_id) where room.room_id not in (select room_id from reservation where start_date between ? and ? or end_date between ? and ?)",[req.params.start_date,req.params.end_date,req.params.start_date,req.params.end_date],(err, rows, fields)=>{
        if(!err){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})


app.get("/login/:email/:password",(req,res)=>{
    mysqlConnection.query("SELECT * from customer where cust_email=? and cust_password=? ",[req.params.email,req.params.password],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})


app.get("/adminlogin/:email/:password",(req,res)=>{
    mysqlConnection.query("SELECT * from admin where admin_email=? and admin_password=? ",[req.params.email,req.params.password],(err, rows, fields)=>{
        if(!err){
         
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})


app.get("/hotel/details/",(req,res)=>{
    mysqlConnection.query("SELECT * from hotel",(err, rows, fields)=>{
        if(!err){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})




app.get("/room_types",(req,res)=>{
    mysqlConnection.query("SELECT * from room_type",(err, rows, fields)=>{
        if(!err){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            console.log(rows)
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

app.get("/facilities",(req,res)=>{
    mysqlConnection.query("SELECT * from facilities",(err, rows, fields)=>{
        if(!err){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            console.log(rows)
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})



app.post("/addcustomer",(req,res)=>{
    var cust = req.body;
    console.log(cust)
    var data=[cust.username,cust.useremail,cust.phone,cust.password]
    let sql = "INSERT INTO customer(cust_name,cust_email,cust_phone,cust_password) VALUES( ?, ? ,?,?)";
    mysqlConnection.query(sql,data,(err, rows, fields)=>{
        if(!err){
      console.log('success')
        }
        else{
            console.log(err);
        }
    })
})



app.post("/addnewroom",(req,res)=>{
    var room = req.body;
    console.log(room)
    var data=[room.roomtype,room.roomfacility,room.roomimage,room.hotelid,room.statusid]
    let sql = "INSERT INTO room(type_id, facility_id, images, hotel_id, status_id) VALUES( ? ,?,?, ? ,?)";
    mysqlConnection.query(sql,data,(err, rows, fields)=>{
        if(!err){res.send("New Room Added Succesfully")
        }
        else{
            console.log(err);
        }
    })
})


app.post("/addfacility",(req,res)=>{
    var facility = req.body;
    console.log(facility)
    var data=[facility.facility, facility.facility_cost]
    let sql = "INSERT INTO facilities(facility, facility_cost) VALUES( ?,?)";
    mysqlConnection.query(sql,data,(err, rows, fields)=>{
        if(!err){
            res.send("New Room Added Succesfully")

        }
        else{
            console.log(err);
        }
    })
})




app.put("/editcustomer",(req,res)=>{
    var cust = req.body;
    console.log(cust)
    var data=[cust.username,cust.useremail,cust.phone,cust.password,cust.custid]
    let sql = "update customer set cust_name = ? , cust_email = ?, cust_phone = ? ,cust_password = ? where cust_id = ? ";
    mysqlConnection.query(sql,data,(err, rows, fields)=>{
        if(!err){
      console.log("Updated SUccessfully");
      
        }
        else{
            console.log(err);
        }
    })
})

app.put("/edithotel",(req,res)=>{
    var hotel = req.body;
    console.log(hotel)
    var data=[hotel.hotelname,hotel.hotelemail,hotel.phone,hotel.addr]
    let sql = "update hotel set hotel_name = ? , hotel_email = ?, hotel_phone = ? ,hotel_addr = ?  ";
    mysqlConnection.query(sql,data,(err, rows, fields)=>{
    
            res.send("updated Succesfully")
     
            
        
    })
})


app.put("/editroomscost",(req,res)=>{
    var room = req.body;
    console.log(room)
    var data=[room.ac_cost, "AC"]
    let sql = "update room_type set cost = ? where type_name = ?  ";
    mysqlConnection.query(sql,data,(err, rows, fields)=>{
        if(!err){
      console.log("Updated SUccessfully");
      
        }
        else{
            console.log(err);
        }
    })


    var data2=[room.non_ac_cost, "NON AC"]
    let sql2 = "update room_type set cost = ? where type_name = ?  ";
    mysqlConnection.query(sql2,data2,(err, rows, fields)=>{
        if(!err){
      console.log("Updated SUccessfully");
      
        }
        else{
            console.log(err);
        }
    })







})



app.post("/reservation",(req,res)=>{
    var hotel = req.body;
    console.log(hotel)
    var data=[hotel.roomId, hotel.custId,hotel.bookingDate,hotel.startDate,hotel.endDate,hotel.amount,]
    let sql = "INSERT INTO reservation(room_id,cust_id,booking_date,start_date,end_date,amount) VALUES( ?, ? ,?,?,?,?)";

    mysqlConnection.query(sql,data,(err, rows, fields)=>{
        if(!err){
      
          
            console.log(rows);
        }
        else{
            console.log(err);
        }
    })
})

app.get("/reservations/:id",(req,res)=>{
    mysqlConnection.query("SELECT * from reservation where cust_id = ? ",[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
            console.log(rows)
        }
        else{
            console.log(err);
        }
    })
})

app.get("/bookings",(req,res)=>{
    mysqlConnection.query("SELECT * from reservation order by booking_date",(err, rows, fields)=>{
        if(!err){
            res.send(rows);
            console.log(rows)
        }
        else{
            console.log(err);
        }
    })
})

app.delete("/cancelReserve/:id/:booking_date",(req,res)=>{

    mysqlConnection.query("DELETE from reservation where room_id= ? and booking_date = ?",[req.params.id, req.params.booking_date],(err, rows, fields)=>{
        if(!err){
            console.log([req.params.booking_date])
            res.send("deleted successfully")
        }
        else{
            console.log(err);
        }
    })
})


app.get("/rooms/aminities/",(req,res)=>{
    mysqlConnection.query("SELECT * from facilities",(err, rows, fields)=>{
        if(!err){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

app.get("/room/types/",(req,res)=>{
    mysqlConnection.query("SELECT * from room_type",(err, rows, fields)=>{
        if(!err){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

app.delete("/facility/delete/:id",(req,res)=>{

    mysqlConnection.query("DELETE from facilities where facility_id= ?",[req.params.id],(err, rows, fields)=>{
        if(!err){

            res.send("deleted successfully")
        }
        else{
            console.log(err);
        }
    })
})


