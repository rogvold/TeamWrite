/**
 * Created by sabir on 27.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var moment = require('moment');

var CoavtorHelper = require('../../../helpers/CoavtorHelper');

var ProjectItem = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ProjectsStore', 'UsersStore')],
    getDefaultProps: function(){
        return {
            projectId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ProjectsStore');
        var uStore = flux.store('UsersStore');
        var project = store.getProject(this.props.projectId);
        var user = uStore.getUser(project.creatorId);

        return {
            loading: store.loading,
            project: project,
            user: user
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
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 3,
            border: '1px solid #EAEEF0'
        },

        floorLayer: {
            position: 'absolute',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 0,
            borderRadius: 3
        },

        mainLayer: {
            position: 'absolute',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            borderRadius: 3,
            background: 'rgba(46, 60, 84, 0.91)'
        },

        topPlaceholder: {
            padding: 10,
            lineHeight: '28px',
            marginBottom: 35
        },

        bottomPlaceholder: {
            padding: 10,
            borderTop: '1px solid rgba(244, 244, 244, 0.1)',
            textAlign: 'center',
            color: 'white',
            opacity: 0.9,
            fontSize: 12,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0
        },

        avatarPlaceholder: {
            marginTop: 15
        },

        namePlaceholder: {
            width: 200,
            textOverflow: 'ellipsis',
            maxWidth: 200,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            margin: '0 auto',

            fontWeight: 'bold',
            color: 'white',
            opacity: 0.9,
            fontSize: 16,
            lineHeight: '16px',
            textAlign: 'center',
            marginTop: 10,
            textShadow: '0px 1px 1px rgba(0, 0, 0, 0.07)',
            fontFamily: '"futura-pt", Lato, "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif'
        },

        descriptionPlaceholder: {
            color: 'white',
            opacity: 0.8,
            fontSize: 12,
            lineHeight: '12px',
            textAlign: 'center',
            margin: '0 auto',
            marginTop: 5,
            width: 200,
            textOverflow: 'ellipsis',
            maxWidth: 200,
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },

        avatar: {
            margin: '0 auto',
            width: 108,
            height: 108,
            borderRadius: 8,
            border: '4px solid white'
        }

    },

    getTagName: function(){
        var p = this.state.project;
        if (p == undefined){
            return '';
        }
        var tags = p.tags;
        if (tags == undefined || tags.length == 0){
            return '';
        }
        var map = CoavtorHelper.TAGS_NAME_MAP;
        var name = map[tags[0]];
        return name;
    },

    render: function(){
        var p = this.state.project;
        var user = this.state.user;
        if (p == undefined){
            return null;
        }
        var tagName = this.getTagName();

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.floorLayer}>
                    <BackgroundImageContainer image={p.avatar} style={{borderRadius: 3}} />
                </div>

                <div style={this.componentStyle.mainLayer}>

                    <div style={{width: '100%', height: '100%', position: 'relative'}} >

                        <div style={this.componentStyle.topPlaceholder}>

                            <span style={{float: 'left'}} >
                                {user == undefined ? null :
                                    <div style={{width: 32, height: 32, borderRadius: 100, border: '2px solid white'}} >
                                        <BackgroundImageContainer image={user.avatar} style={{borderRadius: 300}} />
                                    </div>
                                }
                            </span>

                            <span style={{float: 'right', paddingLeft: 8,
                                            fontSize: 12, paddingRight: 8, borderRadius: 1000,
                                            color: 'white', background: 'rgba(46, 60, 84, 0.4'}} >
                                <i className={'icon tag'} ></i> {tagName}
                            </span>

                        </div>

                        <div style={this.componentStyle.avatarPlaceholder}>

                            <div style={this.componentStyle.avatar}>
                                <BackgroundImageContainer image={p.avatar} style={{borderRadius: 3}} />
                            </div>

                        </div>

                        <div style={this.componentStyle.namePlaceholder}>
                            {p.name}
                        </div>

                        <div style={this.componentStyle.descriptionPlaceholder}>
                            {p.description}
                        </div>

                        <div style={this.componentStyle.bottomPlaceholder}>

                            <span style={{marginRight: 15}} >
                                <i className={'icon calendar'} ></i> {moment(p.timestamp).format('DD.MM.YYYY')}
                            </span>

                            <span>
                                <span style={{color: 'rgb(255, 159, 54)', opacity: 0.8}} >
                                    <i className={'icon lightning'} ></i>
                                </span>
                                АКТИВНЫЙ
                            </span>

                        </div>


                    </div>

                </div>

            </div>
        );
    }

});

module.exports = ProjectItem;