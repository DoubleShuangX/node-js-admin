var express = require('express');
var router = express.Router();

//1.引入mysql模块
var mysql      = require('mysql');
//2.连接mysql模块的配置
var con = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'a_admin'
});
//3.链接mysql
con.connect();

//登录
router.get('/login', function(req, res, next) {
  //先判断验证码是否正确
  //判断前端输入的验证码与后端生成的验证码是否相等
  if(req.query.captcha.toLowerCase==req.session.captcha.toLowerCase){
    //验证码是对的 就判断用户名与密码
    con.query('select * from users where name=? and pwd=?',[req.query.name,req.query.pwd], function (error, results, fields) {
      if (error) throw error; //如果有错误就抛出错误 到控制台
      /*error记录错误的信息，results 里面有从数据查询的数据，fields包含数据表的栏目名称*/
      if(results.length==1){
        //说明查到了一条数据，说明用户名与密码是正确的 我们就通过session把用户数据存起来
        req.session.user=results[0];
      }
      res.send(results);
    });
  }else{
    res.send("captcha error");
  }
});

//获取登录的用户数据
router.get("/getUser",function(req,res){
  res.send(req.session.user);
})

//退出登录状态
router.get("/delUser",function(req,res){
  req.session.destroy(function(err){
    res.send(true)
  })
})

module.exports = router;
