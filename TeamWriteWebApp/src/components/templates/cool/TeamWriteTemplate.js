/**
 * Created by sabir on 26.07.16.
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

var TeamWriteTemplate = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore'), History],
    getDefaultProps: function(){
        return {

            activeName: undefined,

            logo: 'assets/images/teamwrite_logo.png',
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
            loading: store.loading
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {
            width: window.innerWidth,
            height: window.innerHeight,
            maxWidth: window.innerWidth,
            maxHeight: window.innerHeight,
            overflowX: 'hidden',
            overflowY: 'hidden'
        },

        leftBarPlaceholder: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 250,
            height: '100%',
            //backgroundColor: '#FFFFFF'
            backgroundColor: '#2E3C54',
            position: 'relative'
        },

        contentPlaceholder: {
            width: window.innerWidth - 250,
            display: 'inline-block',
            verticalAlign: 'top',
            height: '100%',
            maxHeight: '100%',
            overflowY: 'auto',
            backgroundColor: '#F2F4F6'
        },

        bottomLeftPlaceholder: {
            position: 'absolute',
            zIndex: 0,
            bottom: 0,
            borderTop: '1px solid rgba(103, 109, 118, 0.18)',
            right: 0,
            left: 0
        },

        logoPlaceholder: {
            padding: 5
        },

        leftLinksPlaceholder: {
            marginTop: 20,
            borderTop: '1px solid rgba(103, 109, 118, 0.18)',
            paddingTop: 10
        },

        logo: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 38,
            height: 38
        },

        logoName: {
            display: 'inline-block',
            verticalAlign: 'top',
            fontSize: 24,
            lineHeight: '38px',
            marginLeft: 3
        },

        newProjectPlaceholder: {
            borderTop: '1px solid rgba(103, 109, 118, 0.18)',
            //textAlign: 'center',
            padding: 14,
            display: 'none'
        },

        leftLink: {
            padding: 10,
            paddingLeft: 14,
            fontSize: 16,
            borderLeft: '3px solid transparent',
            cursor: 'pointer',
            color: 'white',
            opacity: 0.8,
            //marginBottom: 5
            marginBottom: 0
        },

        userBlock: {
            marginTop: 15,
            marginBottom: 15
        },

        content: {

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
                        //icon: 'icon star',
                        icon: 'icon book',
                        url: '/'
                    }
                    //{
                    //    name: 'allProjects',
                    //    displayName: 'Все проекты',
                    //    icon: 'icon book',
                    //    url: '/projects'
                    //},
                    //{
                    //    name: 'messages',
                    //    displayName: 'Сообщения',
                    //    icon: 'icon mail outline',
                    //    url: '/messages'
                    //},
                    //{
                    //    name: 'notifications',
                    //    displayName: 'Уведомления',
                    //    icon: 'icon alarm outline',
                    //    url: '/notifications'
                    //}
        ];
        var res = links.map(function(l, k){
            var key = 'Left_link_' + k;
            var isActive = (l.name == this.props.activeName);
            var cl = (isActive == false) ? '  ' : ' active ';
            var onClick = this.onLinkClick.bind(this, l.url);

            return (
                <div key={key}
                     style={this.componentStyle.leftLink}
                     onClick={onClick}
                     className={'leftLink ' + cl} >

                    <i className={l.icon} ></i> {l.displayName}
                </div>
            );

        }, this);
        return res;
    },

    onLogoutClick: function(){
        UserAPI.logOut(function(){
            window.location.reload();
        });
    },


    render: function(){
        var contentStyle = assign({}, this.componentStyle.content);
        contentStyle = assign({}, contentStyle, this.props.contentStyle);

        return (
            <div style={this.componentStyle.placeholder} className={'teamWriteTemplate'} >

                <div style={this.componentStyle.leftBarPlaceholder} className={'leftSidebar'} >

                    <div style={this.componentStyle.logoPlaceholder}>

                        <div style={this.componentStyle.logo}>
                            <BackgroundImageContainer image={'assets/images/teamwrite_logo_thumb.png'} />
                        </div>

                        <div style={this.componentStyle.logoName}>
                            <span style={{color: '#939598'}} >Co</span>
                            <span style={{color: '#FF9F36'}} >Avtor</span>
                        </div>

                    </div>

                    <div style={this.componentStyle.userBlock}>
                        <CurrentUserBlock />
                    </div>


                    <div style={this.componentStyle.leftLinksPlaceholder}>
                        {this.getLinksContent()}
                    </div>

                    <div style={this.componentStyle.newProjectPlaceholder}>
                        <button className={'ui patientPrimary button circular'} >
                            <i className={'icon plus'} ></i> Создать проект
                        </button>
                    </div>

                    <div style={this.componentStyle.bottomLeftPlaceholder}>
                        <div style={assign({}, this.componentStyle.leftLink, {marginBottom: 0})}
                                onClick={this.onLogoutClick} >
                            <i className={'icon sign out'} ></i> Выход
                        </div>
                    </div>

                </div>

                <div style={this.componentStyle.contentPlaceholder}>

                    <div style={contentStyle}>
                        {this.props.content}
                    </div>

                </div>



            </div>
        );
    }

});

module.exports = TeamWriteTemplate;