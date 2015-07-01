var lang = require('../../lang')
var mongoose = require('mongoose')
var AccountSchema = mongoose.Schema({
    uid: Number,
    lastUid: Boolean,
    region: String,
    phone: String,
    password: String,
    sms: String,
    smsSendDate: Number,
    smsChangeDate: Number,
    createDate: Number,
    createIP: String,
    lastLoginDate: Number,
    lastLoginIP: String,
    DNA: String

})

//创建新用户
AccountSchema.statics.createAccount = function(obj, next){
    var now = (new Date()).getTime()//记录用户创建时间
    var user = new this(obj)
    user.region = '0086'
    user.createDate = now
    user.save(next)
}

//用户激活
AccountSchema.statics.active = function(user, next){
    user.sms = ''
    if(user.uid) return user.save(function(){
        next({
            state: 2003,
            msg: lang.login[3] //账户已经激活过了
        })
    })
    this.findOne({lastUid:true}, function(err, data){
        if(err){
            console.log(err)
        }else{
            var uid
            if(data){
                uid = data.uid + 1 //uid自增
                data.lastUid = false //将加入新uid，此uid不在为lastUid
                data.save()
            }else{
                //空表
                uid = 10000000 //uid初始值
            }
            user.uid = uid
            user.lastUid = true
            user.save(function(){
                next({
                    state: 3005,
                    msg: lang.sms[4] //激活并登录成功
                })
            })
        }
    }.bind(this))
}

var Account = mongoose.model('Account', AccountSchema, 'Account')

module.exports = Account