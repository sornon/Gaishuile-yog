var login = require('../model/login')

module.exports = function(req, res){
    var phone = req.query.phone
    var mode = req.query.mode
    switch (mode){
        case 'quick' :
            login.quick(phone, function(data){
                /**
                 * data = {
                 *     state:200
                 *     msg:
                 *     data:
                 * }
                 ******* state *****
                 *  0:用户未登录
                 *  1000:请求成功
                 *  5000:发生错误
                 *  2000:用户登录成功
                 *  2001:新用户登录
                 *  2002:老用户登录
                 *  2003:账户已经激活过了
                 *  3000:手机验证码发送成功
                 *  3001:手机验证码发送不足1分钟，暂时不能发送
                 *  3002:手机号不正确
                 *  3003:没有这个手机号
                 *  3004:验证码已过期
                 *  3005:短信验证成功
                 *  3006:短信验证失败
                 */
                res.jsonp(data)
            })
            break
        case 'checkSms' :
            login.checkSms(req.query.sms, phone, res, function(data){
                res.jsonp(data)
            })
            break
        default:
            //res.json(login.normal(phone))
    }
}