const express = require("express");
const app = express();
const db =require("./mysql.js")
const cors = require("cors");
app.use( express.json() );
app.use( express.urlencoded( {extended: true}) );
app.use(cors());

app.listen(3000,function(){
    console.log(123);
});
app.get("/", function(req,res) {
    res.send("Welcome");
})

app.get("/order/list", function (req, res) {
    db.connection.query("select * from orders", [],
        function (err, rows) {
            res.send( JSON.stringify(rows) );
        }
    )
})

app.get("/order/item/:id", function (req, res) {
    db.connection.query("select * from orders where member_id = ?", 
        [req.params.id],
        function (err, rows) {
            res.send( JSON.stringify(rows[0]) );
        }
    )
})

app.get('/orders/member/:memberId', (req, res) => {
    // 在數據庫中查詢指定會員的訂單信息
    db.connection.query("select * from orders where member_id = ?", 
        [req.params.memberId],
        function (err, rows) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else if (rows.length === 0) {
                res.status(404).send('Not Found');
            } else {
                res.send(JSON.stringify(rows));
            }
        }
    )
});
