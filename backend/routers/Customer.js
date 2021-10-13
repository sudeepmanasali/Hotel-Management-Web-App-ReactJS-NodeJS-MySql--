const express = require("express");
const mysql = require('mysql');

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var  mysqlConnection = mysql.createConnection({
    host:"localhost",
    user: 'root',
	password: '',
    database: 'hotelmanagement'

});

// ----Zn3dWYhV_>X6)/{/   ---
mysqlConnection.connect((err)=>{
 if(!err){
     console.log("SUccessfully connected to database ...!!");
 }
 else{
     console.log(err);
 }
});

const router = express.Router();


router.get("/login/:email/:password",(req,res)=>{
    const email = req.params.email;
    const password = req.params.password;
    mysqlConnection.query("SELECT * from customer where cust_email=? ",[req.params.email],(err, rows, fields)=>{
        try{
            if(rows.length==0){
                
                throw new Error("No data exists in DB ..!");
            }
            bcrypt.compare(password, rows[0]['cust_password'] ).then(isEqual => {
                if(!isEqual){
                    error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
                }
            })

            req.session.isLoggedIn = true;
            req.session.user = rows[0]['cust_name'];
            req.session.email = rows[0]['cust_email'];
       

            const token = jwt.sign(
                {
                  email: rows[0]['cust_email'],
                  userId: rows[0]['cust_id'].toString()
                },
                'somesupersecretsecret',
                { expiresIn: '1h' }
              );
            res.status(200).json({ token: token, userId: rows[0]['cust_id'].toString(), rowData: rows  });
        }
        catch(err){
            res.status(401).send(err.message);
        }   
        })
    });
   
        
   

const auth = require("../auth");

router.get("/customer",(req,res)=>{
    mysqlConnection.query("select * from customer",(err, rows, fields)=>{
        if(!err){
          
                res.send(rows);
            
        }
        else{
            console.log(err);
        }
    })
})



router.post("/editcustomer",auth,(req,res)=>{
     if(!req.isAuth){
            res.status(401).send("Unauthorised resource access..!");
        }
 
    var cust = JSON.parse(req.body.data);
           
        var data=[cust.username,cust.useremail,cust.phone,cust.custid]
         

        let sql = "update customer set cust_name = ? , cust_email = ?, cust_phone = ?  where cust_id = ? ";
        mysqlConnection.query(sql,data,(err,Results)=>{
               
                if(Results.affectedRows > 0 ){
                    res.status(201).send('User Updated Successfully!');
                }  else{
                    res.status(500).send("User Not Updated !!");
                }              

        })


    
})



router.post("/reservation",auth,(req,res)=>{
    var hotel = req.body.data;
    console.log(hotel);
    if(!req.isAuth){
        console.log(req.isAuth);
        res.status(401).send("Unauthorized access...!");
    }
    var data=[hotel.roomId, hotel.custId,hotel.bookingDate,hotel.startDate,hotel.endDate,hotel.amount,]
    let sql = "INSERT INTO reservation(room_id,cust_id,booking_date,start_date,end_date,amount) VALUES( ?, ? ,?,?,?,?)";

    mysqlConnection.query(sql,data,(err, rows, fields)=>{
        if(!err){
            res.status(200).send("Success");
        }else{
            res.status(500).send("Invalid values!!");
        }
    })
        
})

router.delete("/cancelReserve/:id",auth,(req,res)=>{

      if(req.isAuth){
        mysqlConnection.query("DELETE from reservation where r_id= ?",[req.params.id],(err, rows, fields)=>{
            if(!err){
                
                res.send("Deleted successfully .");

            }
           
        })
      }  
      else{
          res.status(401).send("Unauthorized access..!");
      }
       
    
})


router.get("/rooms/aminities/",(req,res)=>{
    mysqlConnection.query("SELECT * from facilities",(err, rows, fields)=>{
        if(!err){

            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})


router.get("/rooms/details/:start_date/:end_date",(req,res)=>{
   
    mysqlConnection.query("SELECT type_name, cost, room.room_id,availability, images, facility, facility_cost from (((room inner join room_type on room.type_id = room_type.type_id) inner join room_status on room.status_id = room_status.status_id )  inner join facilities on room.facility_id = facilities.facility_id) where room.room_id not in (select room_id from reservation where start_date between ? and ? or end_date between ? and ?)",[req.params.start_date,req.params.end_date,req.params.start_date,req.params.end_date],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

router.get("/room/types/",(req,res)=>{
    mysqlConnection.query("SELECT * from room_type",(err, rows, fields)=>{
        if(!err){

            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

module.exports = router;