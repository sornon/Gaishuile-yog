var React = require('react')
var Router = require('react-router')
var RouteHandler = Router.RouteHandler
var request = require('reqwest')
var mui = require('material-ui')
var lang = require('../lang.jsx')
var Colors = mui.Styles.Colors
//组件
var FullWidthSection = require('../../components/full-width-section.jsx')
var {TextField, Tabs, Tab, RaisedButton, Paper, Dialog, FlatButton, LinearProgress} = mui


var Start = React.createClass({
    getStyles: function(){
        return {
            tabs: {
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative'
            },
            tab: {
                textShadow: 'none',
                fontSize: '2em',
                lineHeight: '2'
            },
            inputin: {
                fontFamily: 'Roboto, sans-serif',
                color: '#333'
            },
            dialog:{
                maxWidth:'75%',
                width: '360px',
            }
        }
    },
    getInitialState: function(){
        return {
            smsDesc:'',
            smsErr:'',
            phoneErr:'',
            newPhoneLoad: false,
        }
    },
    render: function() {
        var styles = this.getStyles()
        var smsActions = [
            <FlatButton
                label={lang.btn[2]}
                secondary={true}
                onTouchTap={this._handleSmsDiaClose}
                className="btn" />,
            <FlatButton
                label={lang.btn[3]}
                primary={true}
                onTouchTap={this._handleSmsDiaSubmit}
                className="btn" />
        ]
        return (
            <div>
                <FullWidthSection className="index-top">
                    <div className="index-contain">
                        <div className="cloud1"/>
                        <div className="cloud2"/>
                        <div className="login-wrap">
                            <h2 className="index-h2">
                                <img className="index-logo1" src="/static/home/static/images/logo.png" width="42"/>
                                {lang.logo[0]}<br/>
                            </h2>
                            <p className="index-descript">
                                {lang.slogan[0]}
                            </p>
                            <Tabs style={styles.tabs} initialSelectedIndex={1}> 
                                <Tab label={lang.login[0]} style={styles.tab}> 
                                    <div className="login-tabin">
                                        <TextField
                                            hintText={lang.login[2]}
                                            floatingLabelText={lang.login[3]}
                                            inputStyle={styles.inputin} />
                                        <TextField
                                            className="login-input"
                                            type='password'
                                            hintText={lang.login[4]}
                                            floatingLabelText={lang.login[5]}
                                            inputStyle={styles.inputin} />

                                            <br /><br />

                                        <RaisedButton label={lang.btn[0]} className="btn" primary={true} />
                                    </div> 
                                </Tab> 
                                <Tab label={lang.login[1]} style={styles.tab}>
                                    {
                                        (function(){
                                            if(this.state.newPhoneLoad)
                                                return (<LinearProgress mode="indeterminate" style={{position:'absolute'}} />)
                                        }.bind(this))()
                                    }
                                    <div className="login-tabin">
                                        <TextField
                                            ref="newPhone"
                                            errorText={this.state.phoneErr}
                                            hintText={lang.login[6]}
                                            floatingLabelText={lang.login[7]}
                                            inputStyle={styles.inputin} 
                                            onChange={this._handlePhoneChange}
                                            onBlur={this._handlePhoneBlur} />

                                            <br /><br />

                                        <RaisedButton label={lang.btn[1]} onClick={this._handleQuickLogin} className="btn" primary={true} />      
                                        <Dialog
                                            contentStyle={styles.dialog}
                                            ref="smsCheck"
                                            title={this.state.smsDesc}
                                            actions={smsActions}>
                                            <TextField
                                                ref="sms"
                                                errorText={this.state.smsErr}
                                                hintText={lang.login[8]}
                                                floatingLabelText={lang.login[9]}
                                                inputStyle={styles.inputin} 
                                                onChange={this._handleSmsChange} />
                                        </Dialog>
                                    </div> 
                                </Tab> 
                            </Tabs> 
                        </div>
                    </div>
                </FullWidthSection>
                <FullWidthSection className="index-middle">
                    <h1 className="index-h1">
                        {lang.start[0]}
                    </h1>
                    <p className="index-h1des">
                        {lang.start[1]}
                    </p>
                    <div className="index-paper">
                        <Paper className="index-paper1" zDepth={0} circle={true}>
                            <h5 className="index-h5">{lang.start[2]}</h5>
                            <p>{lang.start[3]}<br/>{lang.start[4]}<br/>{lang.start[5]}</p>
                        </Paper>
                        <Paper className="index-paper2" zDepth={0} circle={true}>
                            <h5 className="index-h5">{lang.start[6]}</h5>
                            <p>{lang.start[7]}<br/>{lang.start[8]}<br/>{lang.start[9]}<br/>{lang.start[10]}</p>
                        </Paper>
                        <Paper className="index-paper3" zDepth={0} circle={true}>
                            <h5 className="index-h5">{lang.start[11]}</h5>
                            <p>{lang.start[12]}<br/>{lang.start[13]}<br/>{lang.start[14]}</p>
                        </Paper>
                        <Paper className="index-paper4" zDepth={0} circle={true}>
                            <h5 className="index-h5">{lang.start[15]}</h5>
                            <p>{lang.start[16]}<br/>{lang.start[17]}<br/>{lang.start[18]}</p>
                        </Paper>
                    </div>
                    <p className="index-h1des">
                        {lang.start[19]}
                    </p>
                </FullWidthSection>
                <FullWidthSection className="footer">
                    <p>{lang.footer[0]} <img style={styles.logo2} src="/static/home/static/images/logo.png" width="16"/></p>
                </FullWidthSection>
                <RouteHandler />
            </div>
        )
    },
    timer: null,
    phoneBlurErr: false,
    baseUrl:'http://127.0.0.1:8085',
    // baseUrl:'http://api.gaishuile.com',
    _handleQuickLogin: function(){
        var that = this
        if(!this._handlePhoneCheck()) return
        this.setState({
            newPhoneLoad: true
        })
        request({
            url:that.baseUrl+'/login/?callback=?',
            type: 'jsonp',
            data: {
                phone: this.refs.newPhone.getValue(),
                mode: 'quick'
            }

        })
        .then(function(data){
            if(data.state == 3001){
                that.nextSend(data.time)
            }
            that.setState({
                smsDesc: data.msg,
                newPhoneLoad: false
            })
            that.smsCheckShow()
            console.log(data)
        })
    },
    nextSend: function(time){
        clearTimeout(this.timer)
        this.timer = setTimeout(function(){
            time --
            if(time > 0){
                this.setState({
                    smsDesc: lang.login[11] +(time)+ lang.login[12]
                })
                return this.nextSend(time)
            }else{
                return this._handleQuickLogin()
            }
        }.bind(this), 1000);
    },
    smsCheckShow: function(){
        this.refs.sms.setValue('')
        this.setState({smsErr: ''})
        this.refs.smsCheck.show()
    },
    _handleSmsDiaClose: function(){
        clearTimeout(this.timer)
        this.refs.smsCheck.dismiss()
    },
    _handleSmsDiaSubmit: function(){
        if(this._handleSmsCheck()){
            clearTimeout(this.timer)
            this._handleSendSms()
        }
    },
    _handleSendSms: function(){
        var that = this
        request({
            url: that.baseUrl + '/login/?callback=?',
            type: 'jsonp',
            data: {
                phone: this.refs.newPhone.getValue(),
                sms: this.refs.sms.getValue(),
                mode: 'checkSms'
            }
        })
        .then(function(data){
            if(data.state == 3006){
                that.setState({smsDesc: '短信验证码不正确'})
                that.setState({smsErr: data.msg})
            }else if(data.state == 2000){
                that.setState({smsDesc: '登录成功'})
            }
            console.log(data)
        })
    },
    _handlePhoneCheck: function(){
        var value = this.refs.newPhone.getValue()
        if(/^1[3|4|5|7|8][0-9]{9}$/.test(value)){
            this.setState({
                phoneErr: ''
            })
            return true
        }else{
            this.setState({
                phoneErr: value.length ? lang.login[13] : ''
            })
            return false
        }
    },
    _handlePhoneBlur: function(){
        this.phoneBlurErr = !this._handlePhoneCheck()
    },
    _handlePhoneChange: function(){
        if(this.phoneBlurErr)
            this._handlePhoneCheck()
    },
    _handleSmsCheck: function(){
        var value = this.refs.sms.getValue()
        var isNumeric = !isNaN(parseFloat(value)) && isFinite(value)
        if(isNumeric && value.length == 4){
            this.setState({smsErr: ''})
            return true
        }else{
            this.setState({smsErr: lang.login[10]})
            return false
        }
    },
    _handleSmsChange: function(){
            this._handleSmsCheck()
    }

})

module.exports = Start

