let express = require("express")();
const { request, response } = require("express");
let mysql = require("mysql");
const port = 8080;

// Node解决跨域问题
express.all("/*", function (req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})


// 规划mysql链接
let sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "stu",
    port: 3307
})

// 尝试链接
sql.connect();
// 获取商品信息数据
express.get("/infoTrip", (request, response) => {
    const id = request.query.id;
    let s = id ? `SELECT * FROM mobile WHERE id="${id}"` : `SELECT * FROM mobile ORDER BY id`;
    sql.query(s, (error, data) => {
        if (error) {
            console.log(error)
            response.end("error")
        }
        else {
            response.send(data)
        }
    })
})

// 监听在哪一个8080端口上
express.listen(port)
console.log("server is running at " + port)