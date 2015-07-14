var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;
var Root = require('./root');
var Start = require('./start');


var AppRoutes = (
    <Route name="root" path = "/" handler={Root}>
        <DefaultRoute handler={Start}/>
    </Route>
);

module.exports = AppRoutes;