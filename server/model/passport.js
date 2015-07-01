var moment = require('moment')
var crypto = require('crypto')
var lang = require('../lang')
var Account = require('./schema/account')

module.exports = {
    getUser: function(GSLDNA, next){
        var err
        var data
        if(GSLDNA) {
            var decodeDNA = new Buffer(GSLDNA, 'base64').toString()
            var id = decodeDNA.slice(32, 56)
            Account.findById(id, function(err, user){
                if(user && user.DNA === GSLDNA){
                    next(err, {
                        state: 2000,
                        uid: user.uid
                    })
                }else{
                    next(err, {state: 0})
                }
            })
        }else{
            next(err, {state: 0})
        }
    },
    buildDNA: function(user, res, next){
        var now = (new Date()).getTime()
        user.lastLoginDate = now
        var time = crypto.createHash('md5').update(user.lastLoginDate.toString()).digest('hex')
        var password = user.password || user.phone
        var head = crypto.createHash('md5').update(password + time).digest('hex')
        var DNA = user.DNA = new Buffer(head+user._id+time).toString('base64')
        res.cookie('GSLDNA', DNA, {maxAge:600000, httpOnly:true, path:'/'})
        user.save(function(){
            next({
                state: 2000,
                msg: lang.login[5]
            })
        })
    }
}