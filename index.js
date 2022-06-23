const express = require('express');

const app = express();

const mysql = require('mysql2');

app.use(express.static('sf'));
let db = {
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'exam',
    port: 3306
}
const conn = mysql.createConnection(db);
console.log('before get')
app.get("/getbook", (req, res) => {
    console.log('after get')
    let id = req.query.id;
    console.log(id)
    let output = {status : false, detail:{id:0,name:'',price:0}}

    conn.query('select * from book where bookid = ?',[id],(error,rows)=>{
        if(error){
            console.log('error in query' + toString(error))
        }else{
            if(rows.length > 0){
                console.log('success');
                output.status = true;
                output.detail.id = rows[0].bookid; 
                output.detail.name = rows[0].bookname; 
                output.detail.price = rows[0].price; 
            }
            else {
                console.log('no book');
            }
        }
        res.send(output);
    });
   
});




app.get("/updatebook", (req, res) => {
    console.log('after get')
    let id = req.query.id;
    let price = req.query.price;
    console.log(id)
    let output = {status : false, detail:{id:0,price:0}}

    conn.query('update book set price = ? where bookid = ?',[price,id],(error,rows)=>{
        if(error){
            console.log('error in query' + toString(error))
        }else{
            if(rows.affectedRows > 0){
                console.log('success');
                output.status = true; 
            }
            else {
                console.log('update unsuccesful');
            }
        }
        res.send(output);
    });



    
});

app.listen(500, function () {
    console.log('server listening at 500');
})