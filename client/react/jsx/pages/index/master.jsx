var React = require('react')
var Router = require('react-router')
var RouteHandler = Router.RouteHandler
var mui = require('material-ui')
var ThemeManager = new mui.Styles.ThemeManager()
var {AppCanvas} = mui
class Master extends React.Component {

    constructor() {
        super()
    }

    getChildContext() {
        //设置主题
        ThemeManager.setTheme(ThemeManager.types.PRETTY)
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        }
    }

    render() {
        return (
            <AppCanvas predefinedLayout={1}>
                <RouteHandler />
            </AppCanvas>
        )
    }
}

Master.childContextTypes = {
    muiTheme: React.PropTypes.object
}

module.exports = Master
