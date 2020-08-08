// 引入express模块
const express = require('express');
// 引入CORS模块
const cors = require('cors');
// 引入MySQL模块
const mysql = require('mysql');
// 引入body-parser模块
const bodyParser = require('body-parser');
// 创建mysql连接池
const pool = mysql.createPool({
  // 数据库端口号
  port: 3306,
  // 数据库用户名
  user: 'root',
  // 数据库名称
  database: 'xzqa',
  // 数据库用户密码
  password: '',
  // 数据库服务器地址
  host: '127.0.0.1',
  // 编码方式
  charset: 'utf8',
  // 连接池限制默认15可以不写
  connectionLimit:15
});
// 创建express实例
const server = express();
// 将cors作为server的中间件使用,解决跨域问题
server.use(cors({
  origin: ['http://127.0.0.1:8080', 'http://localhost:8080']
}));
// 将body-parser作为server中间件使用
server.use(bodyParser.urlencoded({
  extended:false
}))
// 获取所有文章分类信息的API
server.get('/category', (req, res) => {
  // sql 查询语句
  let sql = 'select id,category_name from xzqa_category';
  // 执行sql查询语句
  pool.query(sql, (err, result) => {
    if (err) throw err;
    // 响应到客户端的消息
    res.send({message:'查询成功',code:1,result:result});  
  });  
});
server.get('/article', (req, res) => {
  // 接收客户端URL地址栏的参数
  let cid = req.query.cid;
  let page = req.query.page;
  // 生明变量记录每页的数据
  let pageSize = 20;
  // 分页实质上利用了select语句的limit子句
  // 标准计算公式（页码-1）*每页记录数
  // 计算出offset的值
  let offset = (page - 1) * pageSize;
  // console.log(offset);
  // console.log(page);
  // 获取总记录数  聚合函数COUNT SUM AVG MAX MIN，返回结果只有一个 as count 是语句别名
  let sql = 'select count(id) as count from xzqa_article where category_id=?'
  pool.query(sql, [cid], (err, result) => {
    if (err) throw err;
    // res.send(result[0].count);
    // console.log(result[0].count);
    let rowCount = result[0].count;
    // console.log(rowCount);
    
    // 声明变量用于存储总页数
    let pageCount = Math.ceil(rowCount / pageSize);
    let sql = 'select id,subject,description,image from xzqa_article where category_id=? limit ' + offset + ',' + pageSize;
    // 连接池有好多连接，执行效率不一样，异步的
    // 用同一个连接
    pool.query(sql,[cid], (err, result) => {
     if (err) throw err;
     // res.send({result:result[0].image });
      res.send({result,pageCount});
   })
  })
  
});
server.get('/articledesc', (req, res) => {
   let id = req.query.id;
  let sql = 'select content,image,created_at,author_id from xzqa_article where id=?'
  pool.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({result:result[0]});
    // console.log(result[0]);
  })
})
server.post('/author', (req, res) => {
  // console.log(req.query);
   console.log(req.query);
  let uname = req.query.username;
  let upwd = req.query.password;
  console.log(uname);
  console.log(upwd);
  let sql = 'insert into xzqa_author (username,password) values (?,?)';
  pool.query(sql, [uname, upwd], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
  })
server.get('/author', (req, res) => {
  let uname = req.query.username;
  let sql = 'select username from xzqa_author where username=?'
  pool.query(sql, [uname], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send("用户名存在");
    }
    else {
      res.send("用户名不存在");
    }
  })
})
server.post('/author1', (req, res) => {
  // console.log(req.query);
  console.log(req.query);
  let uname = req.query.username;
  let upwd = req.query.password;
  console.log(uname);
  console.log(upwd);
  let sql = 'select password,username from xzqa_author where username=?';
  pool.query(sql, [uname], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
    console.log(result[0]);
  });
});
server.get('/view', (req, res) => {
  // 获取指定文章详细信息的接口
  let id = req.query.id;
  // 以id为条件进行文章相关信息
  let sql = 'SELECT a.id,subject,content,nickname,avatar,article_number,created_at FROM xzqa_article as a INNER JOIN xzqa_author AS u ON author_id=u.id WHERE a.id=?'
  pool.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({message:'查询成功',code:1,result:result[0]})
  });
})
// 用户注册的接口
server.post('/register', (req, res) => {
  // 1.获取用户提交的用户名等信息
  let uname = req.body.username;
  console.log(uname);
  // 以用户名为条件进行查找操作，若存在，产生合理错误信息
  let sql = 'select count(id) as count from xzqa_author where username=?';
  pool.query(sql, [uname], (err, result) => {
    if (err) throw err;
    if (result[0].count) {
      res.send({ message: '注册失败', code: 0 });
    } else {
      let password = req.body.password;
      // mysql提供的函数 MD5
      // 不写into也可以
      let sql = 'insert xzqa_author(username,password) values(?,MD5(?))'
      pool.query(sql, [uname, password], (err, result) => {
        if (err) throw err;
        res.send({message:'注册成功',code:1})
      })
    }
  })
  // 若不存在，将用户的相关信息写入数据表
})
server.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let sql = 'SELECT id,username,nickname FROM xzqa_author WHERE username=? AND password=MD5(?)';
  pool.query(sql, [username, password], (err, result) => {
    if (err) throw err;
    console.log(result);
    if (result.length) {
      // 登录成功
      res.send({message:'登录成功',code:1})
    } else {
      // 登录失败
      res.send({message:'登录失败',code:0})
    }
  })
})
// 指定服务器的监听端口号
server.listen(3000);