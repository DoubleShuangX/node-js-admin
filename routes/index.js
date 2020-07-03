var express = require('express');
var router = express.Router();

var path=require("path");
//设置拼接地址的函数
var setPath=function(req,paths){
    return path.join(req.app.get("position"),"public","admin",paths);
}

/*//当进入amdin 及 admin/所有地址  都会被拦截 查看是否登录
router.all(["/admin","/admin/!*"],function(req,res,next){
    if(req.session.user==undefined){
        //没有登录就跳转到登录的页面
        res.redirect("/login");
    }else{
        next();//登录了就让其进入
    }

})*/

//导航路由：进入一些后台页面的路由
//1.后台首页
router.get("/admin",function(req,res){
    res.sendFile(setPath(req,"admin.html"));
})
//2.后台首页/主要区域页面
router.get("/admin/main",function(req,res){
    res.sendFile(setPath(req,"main.html"));
})
//3.后台首页/导航管理页面
router.get("/admin/nav",function(req,res){
    res.sendFile(setPath(req,"nav.html"));
})
//4.后台首页/导航添加与更新页面
router.get("/admin/navEdit",function(req,res){
    res.sendFile(setPath(req,"navEdit.html"));
});
//3.后台登录页面
router.get("/login",function(req,res){
    res.sendFile(setPath(req,"login.html"))
});
//4.后台登录页面
router.get("/admin/website",function(req,res){
    res.sendFile(setPath(req,"website.html"))
});
//5.友情链接页面
router.get("/admin/friendly_link",function(req,res){
    res.sendFile(setPath(req,"friendly_link.html"))
});
//5.友情链接页面
router.get("/admin/guestbook",function(req,res){
    res.sendFile(setPath(req,"guestbook.html"))
});

//6.留言页面
router.get("/admin/friendly_linkEdit",function(req,res){
    res.sendFile(setPath(req,"friendly_linkEdit.html"))
});

//公共使用的验证码：
//1.引入验证码模块
var svgCaptcha = require('svg-captcha');
//2.创建验证码路由
router.get('/captcha', function (req, res) {
    //3.创建验证码
    var captcha = svgCaptcha.create({
        size:4,//验证码字符个数
        noise:3,//干扰线
        color: true,//字符有随机的颜色
        // background: '#cc9966',//背景颜色
        width:100,//验证码宽度
        height:30,//验证码高度
        fontSize:35//验证码字符大小
    });
    //4.把验证码的生成字符串存到 session里面 这样以后可以对比前端数据字符 与
    //session里面验证码是否相等
    req.session.captcha = captcha.text;
    //5.验证码图片格式
    res.type('svg');
    //6.响应状态码200 并把生成的svg标签发送给前端
    res.status(200).send(captcha.data);
});

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


//导航添加去重操作中间件
router.use(["/admin/navAdd"],function(req,res,next){
    //把导航名 与 pid 发给数据查一下 如果有就说明有重复
    var sql="select * from nav where navName=? and pid=?";
    var getData=[req.body.navName,req.body.pid];
    con.query(sql,getData,function(e,r,f){
        if(r.length>0){
            //如果length大于0说明有这条数据 说明导航名称添加重复，就要提示重复
            res.send("repeat");
        }else{
            //说明length可能为0，说明没有重复，就通过这个中间件 继续到达目的地路由
            next();
        }
    });
})

//文件上传模块
//1.安装模块：npm install filese
//2.引用与配置模块
var uF=require("filese");
var uFobj=uF("public/uploads/")//设置上传的文件夹目录
//3.文件上传路由
router.post("/admin/upImg",uFobj.single('imgxx'),function(req,res){
    console.log(req.file)//file里面是当前上传文件的信息
    if(req.file){
        //把上传后的图片地址发送给前端
        res.send(req.file.rdestination)
    }else{
        res.send("");
    }
    //上传完以后 等2秒把图片删掉
    setTimeout(function(){
        //获取图片路径
        var tmpImg=path.join(req.app.get("position"),req.file.path);
        //删除它
        uFobj.deleteFile(tmpImg);
    },2000);
})



//导航操作数据的路由
router.post("/admin/navAdd",uFobj.single('img'),function(req,res){
    var sql="insert into nav set navName=?,navTitle=?,navKeywords=?,navDescription=?,navStatus=?,navSort=?,pid=?,img=?";
    var getData=[req.body.navName,req.body.navTitle,req.body.navKeywords,req.body.navDescription,req.body.navStatus,req.body.navSort,req.body.pid,req.file?req.file.path:""];
    con.query(sql,getData,function(e,r,f){
       console.log(r.affectedRows);//表示 当前操作数据的行数，如果插入1条这个地方就是1
       console.log(r.insertId);//表示 当前插入数据的id号
       res.send(r);//r里面记录当前插入数据的状态 所以把这个r发送给前端，让前端自己判断
    })
});
//获取导航数据 分层级并 生成option标签  需要用到navcm模块
//1.安装 npm install navcm
//2.引入模块
var nav=require("navcm");
nav=nav();
router.get("/admin/navSelect",function(req,res){
    con.query("select * from nav",function(e,r,f){
        if(e) throw e;
        //把导航数据分层级 并 生成option标签 :get_hierarchy_select(数据,id)
        //id不写的话表示查所有的导航，写了id表示查某个导航的全部导航层级
        res.send(nav.get_hierarchy_select(r));
    })
})

//获取导航数据 变成列表的形式
router.get("/admin/navList",function(req,res){
    con.query("select * from nav",function(e,r,f){
        if(e) throw  e;
        //把导航数据分层级 生成json 数据并响应给前端
        res.send(nav.get_hierarchy_json(r))
    })
})




//删除导航数据
router.get("/admin/navDel",function(req,res){
    con.query("select * from nav",function(e,r,f){
        /*要把删除那条数据的id取到,然后通过这个id
         来查找内部所有的 子级导航 或孙子级导航的id
         可以通过get_insertAll_id(所有导航数据,写要查的id)
         来写实现
         */
        //用来查询某个栏目下的所有子级导航id 并存到ids里面去
        var ids=nav.get_insertAll_id(r,req.query.id);
        con.query("select * from nav  where id in("+ids+")",function(e,r,f){
            if(r.length>0){
                r.forEach(function(v,i){
                    //做删图片的操作
                    if(v.img){
                        console.log(v)
                        //如果有图片 就需要把文件夹中的相对应图片删除掉
                        var imgP=path.join(req.app.get("position"),v.img);
                        uFobj.deleteFile(imgP);
                    }
                })
            }
        })
        con.query("delete from nav where id in("+ids+")",function(e,r,f){
            //导航删除以后 要把导航相关的文章进行删除,还有文件对应的图片进行删除
            //所以我们先要查找 要删除的文章 所携带的图片

            con.query("select * from article where pid in("+ids+")",function(e,r,f){
                if(r.length>0){
                    r.forEach(function(v,i){
                        //做删图片的操作
                        if(v.img_path){
                            //如果有图片 就需要把文件夹中的相对应图片删除掉
                            var imgP=path.join(req.app.get("position"),v.img_path);
                            uFobj.deleteFile(imgP);
                        }
                    })
                    //数据删除
                    var sql="delete from article where pid in("+ids+")";
                    con.query(sql);
                }
            })
            res.send(r);
        });
    })
})

//查询某一个导航的数据
router.get("/admin/getNav",function(req,res){
    var sql="select * from nav where id=?";
    var getData=[req.query.id];
    con.query(sql,getData,function(e,r,f){
        res.send(r[0]);
    });
})


//导航添加去重操作中间件
router.use(["/admin/navUpdate"],function(req,res,next){
    //把导航名 与 pid 发给数据查一下 如果有就说明有重复
    var sql="select * from nav where id<>? and navName=? and pid=?";
    var getData=[req.body.id,req.body.navName,req.body.pid];
    console.log(getData)
    con.query(sql,getData,function(e,r,f){
        if(r.length>0){
            //如果length大于0说明有这条数据 说明导航名称添加重复，就要提示重复
            res.send("repeat");
        }else{
            //说明length可能为0，说明没有重复，就通过这个中间件 继续到达目的地路由
            next();
        }
    });
})

router.post("/admin/navUpdate",uFobj.single('img'),function(req,res){
    console.log(req.body)
    if(req.file){
        if(req.body.oldimg){
            //如果有图片 就需要把文件夹中的相对应图片删除掉
            var imgP=path.join(req.app.get("position"),req.body.oldimg);
            uFobj.deleteFile(imgP);
        }
    }
    var sql="update nav set navName=?,navTitle=?,navKeywords=?,navDescription=?,navStatus=?,navSort=? ,img=? where id=?";
    var getData=[req.body.navName,req.body.navTitle,req.body.navKeywords,req.body.navDescription,req.body.navStatus,req.body.navSort,req.file?req.file.path:req.body.oldimg?req.body.oldimg:"",req.body.id];
    con.query(sql,getData,function(e,r,f){
        console.log(r.affectedRows);//表示 当前操作数据的行数，如果插入1条这个地方就是1
        console.log(r.insertId);//表示 当前插入数据的id号
        res.send(r);//r里面记录当前插入数据的状态 所以把这个r发送给前端，让前端自己判断
    })
});


//文章管理页面
router.get("/admin/article",function(req,res){
    res.sendFile(setPath(req,"article.html"))
})
//文章添加与更新页面
router.get("/admin/articleEdit",function(req,res){
    res.sendFile(setPath(req,"articleEdit.html"))
})


//ueditor配置路由
//配置ueditor模块
var bodyParser = require('body-parser')
var ueditor = require("ueditor")
var path = require("path")
router.use(bodyParser.urlencoded({
    extended: true
}))
router.use(bodyParser.json());
router.use("/ueditor/ue", ueditor(path.join(__dirname.replace("routes",""), 'public'), function(req, res, next) {
    var imgDir = '/img/' //默认上传地址为图片
    var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir;//默认上传地址为图片
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/file/ueditor/'; //附件保存地址
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/video/ueditor/'; //视频保存地址
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //客户端发起图片列表请求
    else if (ActionType === 'listimage'){
        res.ue_list(imgDir);  // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/ueditor.config.json')
    }})
);




//文章提交路由
router.post("/admin/addArticle",uFobj.single('img'),function(req,res){
    //处理文章重复
    con.query("select title from article where title=? and author=?",
        [req.body.id, req.body.pid],
        function(e,r,f){
          if(r.length>0){
              res.send("repeat");
          }else{
                var sql=`insert into article set
                    title=?,author=?,status=?,pid=?,
                    classType=?,source=?,keywords=?,
                    description=?,tag=?,content=?,img=?,
                    img_path=?`;
                var getData=[
                    req.body.title, req.body.author,
                    req.body.status, req.body.pid,
                    req.body.classType, req.body.source,
                    req.body.keywords, req.body.description,
                    req.body.tag, req.body.content,
                    req.file?req.file.rdestination:"",
                    req.file?req.file.path:""
                ];
                con.query(sql,getData,function(e,r,f){
                    res.send(r);
                })
          }
        }
    )
});

//文章列表路由
//1.需要装模块mpages 实现分页效果
//--1.安装:npm install mpages
//--2.引入var p=require("mpages");
//--3.在路由里面使用

var p=require("mpages");
router.get("/admin/articleList",function(req,res){
    //功能 可以通过搜索文章标题来查询，可以用栏目分类查询、可以用文章类型
    //全部的文章数据都拿出来
    var page=req.query.page?req.query.page:1;//如果点了分页按钮 就实现实现跳转，如果没有就是第一页
    if(req.query.select=="all"){
        //getPaging(mysql数据对象，sql语句,一页多少条数据，分页按钮的数量,显示第几页)
        //10表示一页显示多少条数据，4表示页码按钮最大的个数，1表示当前是第几页
        p.getPaging(con,"select * from article order by time desc",8,7,page,function(data){
            res.send(data);
        });
    }else if(req.query.select=="title_search"){
        var sql="select * from article where title like '%"+req.query.title+"%'  order by time desc";
        p.getPaging(con,sql,8,7,page,function(data){
            res.send(data);
        });
    }else if(req.query.select=="pid"){
        var sql="select * from article where pid="+req.query.pid+"  order by time desc";
        p.getPaging(con,sql,8,7,page,function(data){
            res.send(data);
        });
    }else if(req.query.select=="classType"){
        var sql="select * from article where classType="+req.query.classType+" order by time desc";
        p.getPaging(con,sql,8,7,page,function(data){
            res.send(data);
        });
    }
})

//删除文章路由
router.post("/admin/articleDel",function(req,res){
    var sql="delete from article where id=?";
    var getData=[req.body.id];
    con.query(sql,getData,function(e,r,f){
        if(req.body.img_path){
            //如果有图片 就需要把文件夹中的相对应图片删除掉
            var imgP=path.join(req.app.get("position"),req.body.img_path);
            uFobj.deleteFile(imgP);
        }
        res.send(r);
    })
})


//文章显示数据
router.get("/admin/articleGet",function(req,res){
    var sql="select * from article where id=?"
    var getData=[req.query.id];
    con.query(sql,getData,function(e,r,f){
        res.send(r[0]);
    })
})


//文章更新路由
router.post("/admin/updateArticle",uFobj.single('img'),function(req,res){
    //处理文章重复
    con.query("select * from article where id<>"+req.body.id+" and title=? and author=?",
        [req.body.title, req.body.author],
        function(e,r,f){
            if(req.file||req.body.classType==0){
                /*检测是否含有文件上传 如果有文件上传就要把上一次的图片给删除掉 或
                本来是缩略图或广告类型的文章 改成普通文章以后 这个时候 也要把图片删掉*/
                if(req.body.oldimg_path){//检测是否含有 更新之前的图片，如果有就进行删除
                    var oldImgs=path.join(req.app.get("position"),req.body.oldimg_path);
                    uFobj.deleteFile(oldImgs);
                }
            }
            if(r.length>0){
                res.send("repeat");
            }else{
                var sql=`update article set
                title=?,author=?,status=?,pid=?,
                    classType=?,source=?,keywords=?,
                    description=?,tag=?,content=?,img=?,
                    img_path=? where id=?`;
                //sql语句要加上where id 这样就可以更新你 要更新的那条数据
                var getData=[
                    req.body.title, req.body.author,
                    req.body.status, req.body.pid,
                    req.body.classType, req.body.source,
                    req.body.keywords, req.body.description,
                    req.body.tag, req.body.content,
                    /*如果为普通文章就不传图片 就传个空，如果有文件上传
                    或 就使用 req.file.rdestination 或req.file.path
                    如果图片没有更改就使用req.body.oldimg 或req.body.oldimg_path
                    */
                    req.body.classType==0?"":req.file?req.file.rdestination:req.body.oldimg,
                    req.body.classType==0?"":req.file?req.file.path:req.body.oldimg_path,
                    req.body.id
                ];
                con.query(sql,getData,function(e,r,f){
                    res.send(r);
                })
            }
        }
    )
});


//查询网站基本数据信息
router.get("/admin/websiteGet",function(req,res){
    con.query("select * from website",function(e,r,f){
        //查看是否有基本配置数据
        if(r.length>0){
            //有一条数据
            res.send(r[0]);
        }else{
            //没有基本数据 就像数据库插入一条基本的数据
            var sql="insert into website set title='    '";
            con.query(sql,function(e,r,f){
                res.send(r);
            })
        }
    })
})

var fup=uF("public/logo/");
var ups = fup.fields([
    { name: 'logo_pc', maxCount: 1 },
    { name: 'logo_mobile', maxCount: 1 }
])
//网站基本数据设置
router.post("/admin/websiteUpdate",ups,function(req,res){
    var sql=`update website set
        title=?,keywords=?,description=?,
        email=?,phone=?,address=?,qq=?,
        wechat=?,icps=?,logo_pc=?,logo_mobile=? where id=?`;

    if(req.files.logo_pc){
        //判断是否有上传，如果有上传就要把上一层的图片删除
        if(req.body.old_logo_pc){//如果删除还要判断上一次是否有图片，如果有就删除
            var oldImgs=path.join(req.app.get("position"),req.body.old_logo_pc);
            fup.deleteFile(oldImgs);
        }
    }
    if(req.files.logo_mobile){
        if(req.body.old_logo_mobile){
            var oldImgs=path.join(req.app.get("position"),req.body.old_logo_mobile);
            fup.deleteFile(oldImgs);
        }
    }

    var getData=[
        req.body.title,req.body.keywords,
        req.body.description,req.body.email,
        req.body.phone,req.body.address,
        req.body.qq,req.body.wechat,
        req.body.icps,
        req.files.logo_pc?req.files.logo_pc[0].path:req.body.old_logo_pc,
        req.files.logo_mobile?req.files.logo_mobile[0].path:req.body.old_logo_mobile,
        req.body.id
    ]
    con.query(sql,getData,function(e,r,f){
        res.send(r);
    })

})

//二维码
var qr = require('qr-image');
router.get("/kks",function(req,res){
    var qr_svg = qr.image(req.query.txt, { type: 'png',size:4,margin:2});
    res.type("image/png")
    qr_svg.pipe(res);
});
//在页面使用 <img src="/kks?txt=123">;



//友情链接
router.get("/admin/friendly_linkList",function(req,res){
    con.query("select * from friendly_link",function(e,r,f){
        if(e) throw e;
        res.send(r);
    })
})
router.get("/admin/friendly_linkDel",function(req,res){
    con.query("delete from friendly_link where id=?",[req.query.id],function(e,r,f){
        if(e) throw e;
        res.send(r);
    })
});
//导航添加去重操作中间件
router.use(["/admin/friendly_linkAdd"],function(req,res,next){
    //把导航名 与 pid 发给数据查一下 如果有就说明有重复
    var sql="select * from friendly_link where linktitle=?";
    var getData=[req.body.linktitle];
    con.query(sql,getData,function(e,r,f){
        if(r.length>0){
            //如果length大于0说明有这条数据 说明导航名称添加重复，就要提示重复
            res.send("repeat");
        }else{
            //说明length可能为0，说明没有重复，就通过这个中间件 继续到达目的地路由
            next();
        }
    });
})


//导航操作数据的路由
router.post("/admin/friendly_linkAdd",function(req,res){
    var sql="insert into friendly_link set linktitle=?,linkurl=?,status=?,sort=?";
    var getData=[req.body.linktitle,req.body.linkurl,req.body.status,req.body.sort];
    con.query(sql,getData,function(e,r,f){
        console.log(r.affectedRows);//表示 当前操作数据的行数，如果插入1条这个地方就是1
        console.log(r.insertId);//表示 当前插入数据的id号
        res.send(r);//r里面记录当前插入数据的状态 所以把这个r发送给前端，让前端自己判断
    })
});

//导航添加去重操作中间件
router.use(["/admin/friendly_linkpdate"],function(req,res,next){
    //把导航名 与 pid 发给数据查一下 如果有就说明有重复
    var sql="select * from friendly_link where id<>? and linktitle=?";
    var getData=[req.body.id,req.body.linktitle];
    console.log(getData)
    con.query(sql,getData,function(e,r,f){
        if(r.length>0){
            //如果length大于0说明有这条数据 说明导航名称添加重复，就要提示重复
            res.send("repeat");
        }else{
            //说明length可能为0，说明没有重复，就通过这个中间件 继续到达目的地路由
            next();
        }
    });
})

router.post("/admin/friendly_linkUpdate",function(req,res){
    var sql="update friendly_link set linktitle=?,linkurl=?,status=?,sort=? where id=?";
    var getData=[req.body.linktitle,req.body.linkurl,req.body.status,req.body.sort,req.body.id];
    con.query(sql,getData,function(e,r,f){
        console.log(r.affectedRows);//表示 当前操作数据的行数，如果插入1条这个地方就是1
        console.log(r.insertId);//表示 当前插入数据的id号
        res.send(r);//r里面记录当前插入数据的状态 所以把这个r发送给前端，让前端自己判断
    })
});

//查询某一个导航的数据
router.get("/admin/getFriendly_link",function(req,res){
    var sql="select * from friendly_link where id=?";
    var getData=[req.query.id];
    con.query(sql,getData,function(e,r,f){
        res.send(r[0]);
    });
})

//留言
router.get("/admin/guestbookList",function(req,res){
    con.query("select * from guestbook",function(e,r,f){
        if(e) throw e;
        res.send(r);
    })
})
router.get("/admin/guestbookListDel",function(req,res){
    con.query("delete from guestbook where id=?",[req.query.id],function(e,r,f){
        if(e) throw e;
        res.send(r);
    })
});

module.exports = router;














