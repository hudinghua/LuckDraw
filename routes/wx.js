var express = require('express');
var router = express.Router();

const http = require('http');
var request = require('request');
var cfg = require('../config');

/* 签名验证 */
router.post('/getToken', function(req, res, next) {
	var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appId="+cfg.identity.appId+"&secret="+cfg.identity.secret;
	request(url,function(error, response, body){
		res.send(JSON.parse(body));
	});
});

router.post('/getTicket', function(req, res, next) {
	var token = req.body.token;
	var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token="+token;
	request(url,function(error, response, body){
		res.send(JSON.parse(body));
	});
});


/* 二维码 */
router.post('/getCodeTicket', function(req, res, next) {
	var token = req.body.token;
	var scene = req.body.scene;
	var url = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token="+token;
 	request.post({
 		url:url,
 		body:JSON.stringify(scene)
 	},function(error, response, body){
		res.send(JSON.parse(body));
	});
});
/* 获取所有关注用户的openid */
router.post('/getAllUserId', function(req, res, next) {
	var token = req.body.token;
	var next_openid = req.body.next_openid;
	var url = "https://api.weixin.qq.com/cgi-bin/user/get?access_token="+token+"&next_openid="+next_openid;
	request(url,function(error, response, body){
		res.send(JSON.parse(body));
	});
});
/* 获取关注用户的基本信息 */
router.post('/getUser', function(req, res, next) {
	var token = req.body.token;
	var openid = req.body.openid;
	var url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token="+token+"&openid="+openid+"&lang=zh_CN";
	request(url,function(error, response, body){
		res.send(JSON.parse(body));
	});
});

module.exports = router;