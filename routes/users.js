const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise')

/* GET users listing. */

const connection = mysql.createPool({
    host: 'localhost',
    port: '43306',
    database: 'db_name',
    user: 'root',
    password: 'rootpassword'
})

router.get("/", async (req, res) => {

    let query = `select 
                    user_uuid as id,
                    user_name as name,
                    user_created_date as createdDate,
                    user_mail as mail,
                    user_gender as gender,
                    user_age as age,
                    user_type as type
                    from user 
                    order by user_created_date desc`

    let users = await connection.execute(query)

    res.json({
        statusCode: 200,
        responseMessage: "회원이 정상적으로 조회되었습니다.",
        data: users[0]
    })
})

router.get("/:id", async (req, res) => {

    let query = `select
                     user_uuid as id,
                     user_name as name,
                     user_created_date as createdDate,
                     user_mail as mail,
                     user_gender as gender,
                     user_age as age,
                     user_type as type
                 from user
                 where user_uuid = ?`

    let user = await connection.execute(query, [req.params.id])

    res.json({
        statusCode: 200,
        responseMessage: "회원이 정상적으로 조회되었습니다.",
        data: user[0][0]
    })
})




module.exports = router;