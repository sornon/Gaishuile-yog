var lang = require('../lang')
var moment = require('moment')
var crypto = require('crypto')
//发送短信验证码方法
var sendMS = function(phone, code){
    // return
    //云之讯参数
    var appId = 'a226d00ad00b4c8fae6955e6f9e5ca7c'
    var sid = '239efa53db848efa6acf82e4b2ca49ab'
    var token = 'f35ced5136c6499e770731b6775da756'
    var tid = 7953
    var time = moment().format('YYYYMMDDHHmmssSSS')
    var auth = sid + ':' + time
    var sig = sid + time + token
    var md5 = crypto.createHash('md5')
    sig = md5.update(sig).digest('hex')
    auth = new Buffer(auth).toString('base64')
    console.log('send')
    yog.ral('SMS', {
        data:{
            sid: sid,
            appId: appId,
            sign: sig,
            time: time,
            templateId: tid,
            to:phone,
            param: code,
            sig: sig
        }
    }).on('data', function(data){
        console.log(data)
    }).on('error', function(err){
        console.log(err)
    })
}

module.exports.send = function(user, next){
    var now = (new Date()).getTime()
    var overSend = Math.floor(60 - (now - user.smsSendDate)/1000)
    var overChange = 300 - (now - user.smsChangeDate)/1000
    var phone = user.phone
    //生成4位随机数
    var code = Math.random().toString().slice(2,6)
    if(!user.sms){
        //从没发过验证码
        sendMS(phone, code)
        user.sms = code
        user.smsSendDate = now
        user.smsChangeDate = now
    }else{
        //验证码发送不到1分钟，禁止发送
        if(overSend > 0){
            return next(null, {
                state: 3001,
                msg: lang.sms[0]+overSend+lang.sms[1], //还剩n秒才能再次发送验证码
                time: overSend
            })
        }else{
            //验证码发送不足5分钟，验证码不变
            if(overChange > 0){
                sendMS(phone, user.sms)
                user.smsSendDate = now
            }else{
                //超过5分钟，验证码变更
                sendMS(phone, code)
                user.sms = code
                user.smsSendDate = now
                user.smsChangeDate = now
            }
            
        }
    }
    user.save(function(){
        next(null, {
            state: 3000,
            msg: lang.sms[2] //验证码已成功发送
        })
    })
}