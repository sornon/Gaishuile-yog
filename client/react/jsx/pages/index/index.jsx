(function() {
    var React = require('react'),
        Router = require('react-router'),
        AppRoutes = require('./router.jsx'),
        injectTapEventPlugin = require("react-tap-event-plugin");

    injectTapEventPlugin();
    Router
        .create({
            routes: AppRoutes,
            // location: Router.HistoryLocation,
            scrollBehavior: Router.ScrollToTopBehavior
        })
        .run(function(Handler) {
            React.render(
                <Handler />,
                document.body
            );
        });
})();
