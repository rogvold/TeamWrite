/**
 * Created by sabir on 28.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BackgroundImageContainer = require('../../../image/BackgroundImageContainer');

var moment = require('moment');

var UpdateProjectButton = require('../../buttons/UpdateProjectButton');

var JoinToProjectButton = require('../../buttons/JoinToProjectButton');
var LeaveProjectButton = require('../../buttons/LeaveProjectButton');

var AuthWrapper = require('../../../user/buttons/AuthWrapper');

var ProjectInfoThinPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ProjectsStore')],
    getDefaultProps: function(){
        return {
            projectId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ProjectsStore');
        var uStore = flux.store('UsersStore');

        var loading = store.loading || uStore.loading;
        var project = store.getProject(this.props.projectId);
        var user = (project == undefined) ? undefined : uStore.getUser(project.creatorId);
        var links = (project == undefined || project.links == undefined) ? [] : project.links;

        return {
            loading: loading,
            project: project,
            links: links,
            user: user,
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

    },

    componentStyle: {
        placeholder: {
            minHeight: 70,
            borderBottom: '1px solid #EFF0F1'
            //borderLeft: 'solid 1px #EAEEF0',
            //borderRight: 'solid 1px #EAEEF0'
        },

        avatar: {
            width: 60,
            height: 60,
            borderRadius: 1000,
            border: '2px solid white'
        },

        userInfoPlaceholder: {
            display: 'inline-block',
            height: '100%',
            verticalAlign: 'top',
            borderRight: 'solid 1px #EAEEF0',
            padding: 10,
            paddingRight: 20
        },

        namePlaceholder: {
            fontWeight: 'bold',
            fontSize: 18,
            lineHeight: '18px',
            paddingLeft: 5,
            marginTop: 8
        },

        datePlaceholder: {
            fontSize: 14,
            lineHeight: '14px',
            opacity: 0.6,
            marginTop: 7,
            paddingLeft: 5
        },

        participantsInfoPlaceholder: {
            display: 'inline-block',
            height: '100%',
            verticalAlign: 'top',
            borderRight: 'solid 1px #EAEEF0',
            padding: 10
        },

        editBlockPlaceholder: {
            display: 'inline-block',
            height: '100%',
            verticalAlign: 'top',
            //borderRight: 'solid 1px #EAEEF0',
            padding: 10,
            lineHeight: '60px',
            float: 'right'
        },

        coWorkersPlaceholder: {
            display: 'inline-block',
            height: '100%',
            verticalAlign: 'top',
            borderRight: 'solid 1px #EAEEF0',
            padding: 10,
            paddingTop: 13,
            paddingLeft: 20,
            paddingRight: 20
            //lineHeight: '60px'
        }
    },

    getInteractionContent: function(){
        var user = this.state.user;
        var project = this.state.project;
        var currentUser = this.state.currentUser;
        var isLoggedIn = (this.state.currentUser != undefined);
        if (project == undefined || user == undefined){
            return null;
        }
        var isCurrentUser = (user != undefined && currentUser != undefined && user.id == currentUser.id);
        var isInThisProject = this.getFlux().store('ProjectsStore').isUserInProject(project.id, currentUser.id);
        if (isCurrentUser == true){
            return (
                <UpdateProjectButton projectId={this.props.projectId} />
            );
        }

        if (project.status != 'new'){
            return (
                <div style={{display: 'inline-block'}} >
                    <i className={'icon checkmark'} ></i> заявка подана
                </div>
            );
        }

        if (isInThisProject == true){
            return (
                <div>
                    <LeaveProjectButton projectId={this.props.projectId} />
                </div>
            );
        } else {
            return (
                <div>
                    <JoinToProjectButton projectId={this.props.projectId} />
                </div>
            );
        }
    },

    canJoinTheProject: function(){
        var user = this.state.user;
        var project = this.state.project;
        var currentUser = this.state.currentUser;
        if (project == undefined || user == undefined){
            return false;
        }
        var isCurrentUser = (user != undefined && currentUser != undefined && user.id == currentUser.id);
        return ((isCurrentUser == false) && (project.status == 'new'));
    },

    render: function(){
        var p = this.state.project;
        var user = this.state.user;
        var currentUser = this.state.currentUser;
        var links = this.state.links;
        var isLoggedIn = (this.state.currentUser != undefined);

        if (p == undefined || user == undefined){
            return null;
        }
        var avatar = (user.avatar == undefined) ? 'https://s3.amazonaws.com/buildit-storage/webapp/interface/default-avatar.svg' : user.avatar;
        var isCurrentUser = (user != undefined && currentUser != undefined && user.id == currentUser.id);
        var canJoinTheProject = this.canJoinTheProject();

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.userInfoPlaceholder}>
                    <div style={{display: 'inline-block', verticalAlign: 'top'}}>
                        <div style={this.componentStyle.avatar}>
                            <BackgroundImageContainer image={avatar} style={{borderRadius: 1000}} />
                        </div>
                    </div>
                    <div style={{display: 'inline-block', verticalAlign: 'top'}}>
                        <div style={this.componentStyle.namePlaceholder}>
                            {user.firstName} {user.lastName}
                        </div>
                        <div style={this.componentStyle.datePlaceholder}>
                            <i className={'icon calendar'} ></i>
                            {moment(p.timestamp).format('DD.MM.YYYY')}
                        </div>
                    </div>
                </div>

                <div style={this.componentStyle.coWorkersPlaceholder}>
                    <div style={{fontSize: 30, fontWeight: 'bold'}} >
                        {links.length}
                    </div>
                    <div style={{fontSize: 14, opacity: 0.6, marginTop: 7, lineHeight: '22px', paddingBottom: 9}}>
                        соавторов
                    </div>
                </div>

                {isLoggedIn == false ? null :
                    <div style={this.componentStyle.editBlockPlaceholder}>
                        {this.getInteractionContent()}
                    </div>
                }

                {isLoggedIn == true ? null :
                    <div style={this.componentStyle.editBlockPlaceholder}>
                        <AuthWrapper >
                            <button className={'ui circular basic button'} >
                                <i className={'icon sign in'} ></i> Войти в систему
                            </button>
                        </AuthWrapper>
                    </div>
                }

            </div>
        );
    }

});

module.exports = ProjectInfoThinPanel;