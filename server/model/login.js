var lang = require('../lang')
var sms = require('./sms')
var passport = require('./passport')
var mongoose = require('mongoose')
var Account = require('./schema/account')

var checkPhone = function(phone){
    if(/^1[3|4|5|7|8][0-9]{9}$/.test(phone)){
        return true
    }
}

module.exports.quick = function(phone, next){
    var state
    if(!checkPhone(phone)) return next({state: 3002, msg:lang.login[0]})
    Account.findOne({phone: phone}, function(err, data){
        if(err){
            console.log(err)
            next({
                state: 5000,
                msg: lang.login[1] //数据异常
            })
        }else{
            if(!data){
                //新用户
                Account.createAccount({
                    phone: phone
                }, function(err, data){
                    sms.send(data, function(err, data){
                        next(data)
                    })
                })
            }else{
                sms.send(data, function(err, data){
                    next(data)
                })
            }
        }
    })
}

module.exports.checkSms = function(sms, phone, res, next){
    Account.findOne({phone: phone}, function(err, data){
        if(err){
            console.log(err)
            next({
                state: 5000,
                msg: lang.login[1] //数据异常
            })
        }else{
            if(!data){
                next({
                    state: 3003,
                    msg: lang.login[2] //没有这个手机号
                })
            }else{
                if(sms == data.sms){
                    var now = (new Date()).getTime()
                    var overChange = 300 - (now - data.smsChangeDate)/1000
                    if(overChange < 0){
                        next({
                            state: 3004,
                            msg: lang.sms[3] //验证码已过期
                        })
                    }else{
                        //登录成功
                        Account.active(data, function(){
                            passport.buildDNA(data, res, next)
                        })
                    }
                }else{
                    next({
                        state: 3006,
                        msg: lang.sms[5] //短信验证失败
                    })
                }
            }
        }
    })
}

module.exports.normal = function(phone, next){
    var state
    next && next({
        state: state
    })
}



