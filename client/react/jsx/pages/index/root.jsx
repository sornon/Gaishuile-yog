var React = require('react')
var Router = require('react-router')
var RouteHandler = Router.RouteHandler
var mui = require('material-ui')
var ThemeManager = new mui.Styles.ThemeManager()
var {AppCanvas} = mui
class Root extends React.Component {

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

Root.childContextTypes = {
    muiTheme: React.PropTypes.object
}

module.exports = Root
