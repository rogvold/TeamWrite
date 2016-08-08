/**
 * Created by sabir on 27.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ProjectsList = require('../list/ProjectsList');
var CoolPreloader = require('../../preloader/CoolPreloader');

var CreateProjectButton = require('../buttons/CreateProjectButton');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var UserProjectsPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore', 'ProjectsStore')],
    getDefaultProps: function(){
        return {
            userId: undefined,

            style: {

            }
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ProjectsStore');
        var uStore = flux.store('UsersStore');
        var loading = store.loading || uStore.loading;
        var userId = this.props.userId;
        if (userId == undefined){
            userId = uStore.getCurrentUserId();
        }
        var projects = store.getUserProjects(userId);

        return {
            loading: loading,
            projects: projects,
            user: uStore.getUser(userId),
            currentUser: uStore.getCurrentUser()
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        var store = this.getFlux().store('ProjectsStore');
        var userId = this.props.userId;
        if (userId == undefined){
            userId = this.getFlux().store('UsersStore').getCurrentUserId();
        }
        var projects = store.getUserProjects(userId);
        //if (projects == undefined || projects.length == 0){
        this.getFlux().actions.loadUserProjects(userId);
        //}
    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            minHeight: 120,
            width: 820,
            margin: '0 auto',
            marginTop: 15
        },

        listPlaceholder: {
            marginTop: 15
        },

        topPlaceholder: {

        }

    },

    render: function(){
        var user = this.state.user;
        var currentUser = this.state.currentUser;
        var isCurrentUser = (user != undefined && currentUser != undefined && user.id == currentUser.id);
        var projects = this.state.projects;
        var st = assign({}, this.componentStyle.placeholder, this.props.style);

        return (
            <div style={st} >

                {isCurrentUser == false ? null :
                    <div style={this.componentStyle.topPlaceholder}>

                        {projects.length == 0 ?
                            <div>
                                <div style={{textAlign: 'center'}} >
                                    <div>
                                        <img src={'assets/images/no_projects.png'} style={{width: 400, display: 'inline-block'}} />
                                    </div>
                                    <div style={{marginTop: 15, fontSize: 16, opacity: 0.5, textAlign: 'center'}} >
                                        У вас еще нет проектов...
                                    </div>
                                    <div style={{marginTop: 25, fontSize: 16, textAlign: 'center'}} >
                                        <CreateProjectButton />
                                    </div>
                                </div>
                            </div> :
                            <div style={{paddingLeft: 20, paddingRight: 20, marginTop: 10}}>
                                <div style={{paddingBottom: 15, borderBottom: '1px solid #EAEEF0', lineHeight: '30px'}} >
                                    <span style={{textTransform: 'uppercase', fontSize: 14, opacity: 0.8}} >
                                        Количество проектов: {projects.length}
                                    </span>
                                    <span style={{float: 'right'}} >
                                        <CreateProjectButton
                                            style={{fontSize: 14, fontWeight: 'normal', padding: '8px 16px'}}
                                            buttonName={'ДОБАВИТЬ ПРОЕКТ'}
                                            buttonClassName={'ui patientPrimary mini circular button'} />
                                    </span>
                                </div>
                            </div>
                        }

                    </div>
                }

                <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} >
                    <div style={this.componentStyle.listPlaceholder} >
                        <ProjectsList projects={projects} />
                    </div>
                </ReactCSSTransitionGroup>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = UserProjectsPanel;