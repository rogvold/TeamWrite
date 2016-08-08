/**
 * Created by sabir on 04.08.16.
 */
var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var UserNameSpan = require('../../profile/UserNameSpan');

var UserAPI = require('../../../api/UserAPI');

var History = require('react-router').History;

var CurrentUserBlock = require('./CurrentUserBlock');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var CreateProjectWrapper = require('../../projects/buttons/CreateProjectWrapper');

var UpdateUserWrapper = require('../../profile/panels/UpdateUserWrapper');

var CommonHelper = require('../../../helpers/CommonHelper');

var LoginWrapper = require('../../user/buttons/LoginWrapper');
var SignUpWrapper = require('../../user/buttons/SignUpWrapper');

var CoolTopTemplate = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore'), History],
    getDefaultProps: function(){
        return {

            activeName: undefined,

            //logo: 'assets/images/teamwrite_logo.png',
            logo: 'https://s3.amazonaws.com/buildit-storage/webapp/interface/logo.svg',
            content: undefined,
            contentStyle: {

            },

            centerLinksContent: null
        }
    },


    getInitialState: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var store = this.getFlux().store('UsersStore');
        return {
            loading: store.loading,
            user: store.getCurrentUser()
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        },

        headerPlaceholder: {
            height: 70,

            //lineHeight: '26px',
            //fontSize: 16,
            //paddingTop: 22,
            //paddingBottom: 22,

            backgroundColor: '#EAEEF0'
        },

        header: {
            width: 920,
            margin: '0 auto',
            position: 'relative'
        },

        logoPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            marginRight: 15
        },

        logo: {

        },

        logoImagePlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            marginRight: 5,
            width: 26,
            height: 26
        },

        logoText: {
            display: 'inline-block',
            verticalAlign: 'top',
        },

        contentPlaceholder: {

        },

        content: {
            width: 920,
            margin: '0 auto'
        },

        leftLinksPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top'
        },

        rightLinksPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            marginRight: 15
        },

        topLink: {
            marginLeft: 15,
            marginRight: 15,
            display: 'inline-block',
            cursor: 'pointer'
        },

        rightTopArea: {
            position: 'absolute',
            right: 0,
            top: 0
        },

        avatarPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top'
        },

        avatar: {
            borderRadius: 1000,
            width: 50,
            height: 50,
            display: 'inline-block',
            marginTop: -13
        },

        userNamePlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            marginRight: 10
        }


    },

    onLogoClick: function(){

    },

    onLogOutClick: function(){
        this.getFlux().actions.logOut();
    },


    getNameComponent: function(){
        var currentUser = UserAPI.getCurrentUser();
        return (
            <div style={{display: 'inline-block'}}>
                <span style={{opacity: 0.6}} >
                    <UserNameSpan />
                </span>
            </div>
        );
    },

    onLinkClick: function(url){
        if (url == undefined){
            return;
        }else{
            this.history.pushState(null, url);
        }
    },

    getLinksContent: function(){
        var links = [{
            name: 'myProjects',
            displayName: 'Проекты',
            url: '/'
        }
        //    {
        //    name: 'newProject',
        //    displayName: '+ Новый проект',
        //    url: '/newProject',
        //    icon: ''
        //}
        ];
        var res = links.map(function(l, k){
            var key = 'Top_link_' + k;
            var isActive = (l.name == this.props.activeName);
            var cl = (isActive == false) ? '  ' : ' active ';
            var onClick = this.onLinkClick.bind(this, l.url);

            return (
                <div key={key}
                     style={this.componentStyle.topLink}
                     onClick={onClick}
                     className={'normalPadding topLink ' + cl} >
                    <i className={l.icon} ></i> {l.displayName}
                </div>
            );

        }, this);
        return res;
    },

    onLogoutClick: function(){
        UserAPI.logOut(function(){
            CommonHelper.forceTransitionTo('/');
            window.location.reload();
        });
    },

    getName: function(){
        var user = this.state.user;
        var userName = (user == undefined) ? undefined : (user.firstName + ' ' + user.lastName[0] + '.');
        return userName;
    },

    render: function(){
        var contentStyle = assign({}, this.componentStyle.content);
        contentStyle = assign({}, contentStyle, this.props.contentStyle);
        var user = this.state.user;
        var avatar = (user == undefined) ? undefined : user.avatar;
        var userName = this.getName();
        var isLoggedIn = (this.getFlux().store('UsersStore').getCurrentUserId() != undefined);

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.headerPlaceholder} className={'coolHeaderPlaceholder'} >

                    <div style={this.componentStyle.header}>

                        <div style={this.componentStyle.logoPlaceholder} className={'normalPadding'} >
                            <div style={this.componentStyle.logo}>
                                <div style={this.componentStyle.logoImagePlaceholder}>
                                    <BackgroundImageContainer image={this.props.logo} />
                                </div>
                                <div style={this.componentStyle.logoText}>
                                    CoAvtor
                                </div>
                            </div>
                        </div>

                        <div style={this.componentStyle.leftLinksPlaceholder}>
                            {this.getLinksContent()}

                            {isLoggedIn == false ? null :
                                <CreateProjectWrapper >
                                    <div className={'normalPadding topLink'} style={this.componentStyle.topLink} >
                                        + Новый проект
                                    </div>
                                </CreateProjectWrapper>
                            }

                        </div>

                        <div style={this.componentStyle.rightTopArea}>

                            {user == undefined ? null :
                                <div style={this.componentStyle.rightLinksPlaceholder} className={'normalPadding'}>

                                    <span className={'normalPadding'}>
                                        <UpdateUserWrapper>
                                            <i className={'icon setting iconButton'}
                                               style={{cursor: 'pointer', marginRight: 15}}></i>
                                        </UpdateUserWrapper>
                                    </span>

                                    <span className={'normalPadding'} onClick={this.onLogoutClick}>
                                        <i className={'icon sign out iconButton'}
                                           label={'Выход'}
                                           style={{cursor: 'pointer'}}></i>
                                    </span>

                                </div>
                            }

                            {user == undefined ? null :
                                <div style={this.componentStyle.avatarPlaceholder} className={'normalPadding'} >
                                    <div style={this.componentStyle.userNamePlaceholder}>
                                        {userName}
                                    </div>
                                    <div style={this.componentStyle.avatar}>
                                        <BackgroundImageContainer image={avatar} style={{borderRadius: 100}} />
                                    </div>
                                </div>
                            }


                            {user != undefined ? null :
                                <div style={this.componentStyle.rightLinksPlaceholder} className={'normalPadding'} >
                                    <SignUpWrapper >
                                        <span style={{cursor: 'pointer', marginRight: 15}} >
                                             Регистрация
                                        </span>
                                    </SignUpWrapper>
                                </div>
                            }

                            {user != undefined ? null :
                                <div style={this.componentStyle.rightLinksPlaceholder} className={'normalPadding'} >
                                    <LoginWrapper >
                                        <span style={{cursor: 'pointer'}}>
                                             Вход
                                        </span>
                                    </LoginWrapper>
                                </div>
                            }



                        </div>



                    </div>

                </div>

                <div style={this.componentStyle.contentPlaceholder}>
                    <div style={this.componentStyle.content}>
                        {this.props.content}
                    </div>
                </div>

            </div>
        );
    }

});

module.exports = CoolTopTemplate;