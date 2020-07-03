var express = require('express');
var router = express.Router();

//msyql数据库的链接配置
var mysql      = require('mysql');
var con = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'a_admin'
});
con.connect();

//cors跨域模块
var corsz=require("corsz");
corsz(router);
//公共模块
var path=require("path");

//网站设置接口:http://localhost:8081/api/getWebsite
router.get("/getWebsite",function(req,res){
	con.query("select * from website",function(e,r,f){
		if(r.length>0){
			let obj=r[0];
			obj.logo_mobile="http://"+path.join(req.headers.host,obj.logo_mobile.replace("public",""));
			obj.logo_pc="http://"+path.join(req.headers.host,obj.logo_pc.replace("public",""));
			res.send(obj);
		}else {
			res.send({error: "没有数据！"});
		}
	})
})
//网站顶级导航接口：http://localhost:8081/api/getTopNav
router.get("/getTopNav",function(req,res){
	con.query("select * from nav where pid=0",function(e,r,f){
		if(e) throw e;
		res.send(r);
	});
})
//获取文章列表的路由
//http://localhost:8081/api/getArticleList?id=xx&classType=xx
router.get("/getArticleList",function(req,res){
	//pid表示查某个栏目下的文章 需要栏目的id传进来
	//classType查文章 类型 是普通文章、缩略图文章、Baner图文章
	var sql="select * from article where pid=? and classType=?";
	var data=[req.query.id,req.query.classType];
	con.query(sql,data,function(e,r,f){
		if(e) throw e;
		if(r.length>0){
			r.forEach(function(v,i){
				if(v.img_path!=""&&v.img_path!=null) {
					v.img_path = "http://" + req.headers.host + v.img_path.replace("public", "")
				}
			})
		}
		res.send(r);
	})
})
//获取某一篇文章
//http://localhost:8081/api/getText?id=文章的id号
router.get("/getText",function(req,res){
	var sql="select * from article where id in("+req.query.id+")";
	con.query(sql,function(e,r,f){
		if(r.length>0){
			r.forEach(function(v,i){
				if(v.img_path!=""&&v.img_path!=null) {
					v.img_path = "http://" + req.headers.host + v.img_path.replace("public", "")
				}
			})
		}
		if(r.length>1){
			res.send(r);
		}else{
			res.send(r[0]);
		}

	})
})

//获取最新文章
//http://localhost:8081/api/getNewText
router.get("/getNewText",function(req,res){
	var sql="select * from article order by time desc where pid=?";
	con.query(sql,function(e,r,f){
		if(r.length>0){
			r.forEach(function(v,i){
				if(v.img_path!=""&&v.img_path!=null) {
					v.img_path = "http://" + req.headers.host + v.img_path.replace("public", "")
				}
			})
		}
		res.send(r);
	})
})

//获取子栏目
//http://localhost:8081/api/getChildNav?id=0
router.get("/getChildNav",function(req,res){
	con.query("select * from nav where pid=?",[req.query.id],function(e,r,f){
		if(e) throw e;
		res.send(r);
	});
})




    /*文  章  列  表  接   口*/

//获取CC路由的文章列表
//http://localhost:8081/api/getArticleList2?id=?
router.get("/getArticleList2",function(req,res){
	//pid表示查某个栏目下的文章 需要栏目的id传进来
	//classType查文章 类型 是普通文章、缩略图文章、Baner图文章
	var sql="select * from article where pid in("+req.query.id+")";
	con.query(sql,function(e,r,f){
		if(e) throw e;
		if(r.length>0){
			r.forEach(function(v,i){
				if(v.img_path!=""&&v.img_path!=null){
				v.img_path="http://"+req.headers.host+v.img_path.replace("public","")
				}
			})
		}
		res.send(r);
	})
})

//获取banner图类型的文章
//http://localhost:8081/api/getBanners?num=3
router.get("/getBanners",function(req,res){
	//limit 0,3 解释：0表示第一页，3表示取3条数据，完整表示从第一页取3条数据
	var num;
	if(req.query.num==""||isNaN(req.query.num)){
		res.status(400);
		res.send("num参数错误！");
	}else{
		con.query("select * from article where classType=2 order by time desc limit 0,"+req.query.num,function(e,r,f){
			if(e) throw e;
			if(r.length>0){
				r.forEach((v,i)=>{
					if(v.img_path!=""&&v.img_path!=null){
					   v.img_path="http://"+req.headers.host+v.img_path.replace("public","")
					}
				})
			}
			res.send(r);
		})
	}
})

/*获取广告位图片把导航id传进去就好*/
//http://localhost:8081/api/getBanners?id=?
router.get("/getBan",function(req,res){
		con.query("select * from article where classType=2 and pid=?",[req.query.id],function(e,r,f){
			if(e) throw e;
			if(r.length>0){
				r.forEach((v,i)=>{
					if(v.img_path!=""&&v.img_path!=null){
					   v.img_path="http://"+req.headers.host+v.img_path.replace("public","")
					}
				})
			}
			res.send(r);
		})
})

//获取最新图类型的文章
//http://localhost:8081/api/getNewArticle?num=3
router.get("/getNewArticle",function(req,res){
	//limit 0,3 解释：0表示第一页，3表示取3条数据，完整表示从第一页取3条数据
	var num;
	if(req.query.num==""||isNaN(req.query.num)){
		res.status(400);
		res.send("num参数错误！");
	}else{
		con.query("select * from article order by time desc limit 0,"+req.query.num,function(e,r,f){
			if(e) throw e;
			if(r.length>0){
				r.forEach((v,i)=>{
					if(v.img_path!=""&&v.img_path!=null){
					   v.img_path="http://"+req.headers.host+v.img_path.replace("public","")
					}
				})
			}
			res.send(r);
		})
	}
})
module.exports = router;





















