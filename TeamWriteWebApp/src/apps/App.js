/**
 * Created by sabir on 20.06.16.
 */

var React = require('react');
var assign = require('object-assign');
var ReactDOM = require('react-dom');

//router
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;
var createHashHistory = require('history').createHashHistory;


//apps
var LoginApp = require('./guest/LoginApp');

var UserIndexApp = require('./user/UserIndexApp');
var MessagesApp = require('./user/MessagesApp');
var NotificationsApp = require('./user/NotificationsApp');
var AllProjectsApp = require('./user/AllProjectsApp');

var DevApp = require('./DevApp');


/*
 FLUX
 */
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
// stores
var UsersStore = require('../flux/stores/UsersStore');
var ProjectsStore = require('../flux/stores/ProjectsStore');
// actions
var UsersActions = require('../flux/actions/UsersActions');
var ProjectsActions = require('../flux/actions/ProjectsActions');

var stores = {UsersStore: new UsersStore(), ProjectsStore: new ProjectsStore()};
var actions = assign({}, UsersActions, ProjectsActions);
var flux = new Fluxxor.Flux(stores, actions);

//api
var UserAPI = require('../api/UserAPI');

//components
//var AlertsComponent = require('../components/alert/AlertsComponent');

flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
        console.log("[Dispatch]", type, payload);
    }
});


var App = React.createClass({
    mixins: [FluxMixin],

    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentStyle: {
        placeholder: {}
    },

    createFluxComponent: function(Component, props){
        return (
            <Component {...props} flux={flux} />
    );
    },


    getLoginContent: function(){
        return (
            <LoginApp />
        );
    },

    getGuestRoute: function(){
        return (
            <Router createElement={this.createFluxComponent} history={createHashHistory({queryKey: false})}>
                <Route useAutoKeys={false} path="/" component={LoginApp} >
                    <IndexRoute component={LoginApp} />
                </Route>

                <Route path="/login" component={LoginApp}>
                    <IndexRoute component={LoginApp} />
                </Route>

                <Route path="/dev" component={DevApp}>
                    <IndexRoute component={DevApp} />
                </Route>

            </Router>
        );
    },

    getUserRoute: function(){

        return (
            <Router createElement={this.createFluxComponent} history={createHashHistory({queryKey: false})}>
                <Route useAutoKeys={false} path="/" component={UserIndexApp} >
                    <IndexRoute component={UserIndexApp} />
                </Route>

                <Route path="/messages" component={MessagesApp}>
                    <IndexRoute component={MessagesApp} />
                </Route>

                <Route path="/notifications" component={NotificationsApp}>
                    <IndexRoute component={NotificationsApp} />
                </Route>

                <Route path="/projects" component={AllProjectsApp}>
                    <IndexRoute component={AllProjectsApp} />
                </Route>


                <Route path="/dev" component={DevApp}>
                    <IndexRoute component={DevApp} />
                </Route>

            </Router>
        );
    },


    render: function(){
        var currentUser = UserAPI.getCurrentUser();
        var role = (currentUser == undefined) ? undefined : currentUser.userRole;
        var isLoggedIn = UserAPI.isLoggedIn();
        console.log('App: render: isLoggedIn = ', isLoggedIn);
        console.log('role = ', role);
        var content = null;

        if (isLoggedIn == true){
            //if (role == 'airfieldAdmin'){
            if (role == 'user'){
                content = this.getUserRoute();
            }
        }else {
            //content = this.getLoginContent();
            content = this.getGuestRoute();
        }

        return (
            <div>
                {content}
            </div>
        );
    }

});

ReactDOM.render(
    (<App flux={flux} />),
    document.getElementById('main')
);