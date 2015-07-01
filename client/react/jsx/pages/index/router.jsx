var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;
var Master = require('./master.jsx');
var Start = require('./start.jsx');


var AppRoutes = (
    <Route name="root" path = "/" handler={Master}>
        <DefaultRoute handler={Start}/>
    </Route>
);

module.exports = AppRoutes;