/**
 * Created by sabir on 30.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');
var moment = require('moment');

var UserGeneralInfoPanel = require('./UserGeneralInfoPanel');

var UserInfoPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ProjectsStore', 'UsersStore')],
    getDefaultProps: function(){
        return {
            userId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ProjectsStore');
        var uStore = flux.store('UsersStore');
        var loading = store.loading || uStore.loading;
        var user = uStore.getUser(this.props.userId);

        return {
            loading: store.loading,
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

        },

        topPlaceholder: {
            paddingBottom: 10,
            borderBottom: '1px solid #EFF0F1'
        },

        avatarPlaceholder: {

        },

        avatar: {
            //borderRadius: 1000,
            margin: '0 auto',
            width: 80,
            height: 80
            //borderBottom: '1px solid rgb(239, 240, 241)'
        },

        namePlaceholder: {
            lineHeight: '26px',
            fontSize: 16,
            textAlign: 'center',
            fontWeight: 'bold',
            //opacity: 0.6,
            //marginTop: 10
            marginTop: 5
        },

        datePlaceholder: {
            opacity: 0.6,
            fontSize: 12,
            textAlign: 'center'
        },

        contentPlaceholder: {

        }

    },

    getShortName: function(u){
        var name = u.firstName + ' ';
        //name = name + (u.lastName[0]) + '.';
        name = name + u.lastName;
        return name;
    },

    render: function(){
        var user = this.state.user;
        if (user == undefined){
            return null;
        }
        var avatar = user.avatar;
        if (avatar == undefined){
            avatar = 'assets/images/noavatar.jpeg';
        }

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.topPlaceholder}>
                    <div style={this.componentStyle.avatarPlaceholder}>
                        <div style={this.componentStyle.avatar}>
                            <BackgroundImageContainer image={avatar} style={{borderRadius: 1000}} />
                        </div>
                    </div>

                    <div style={this.componentStyle.namePlaceholder}>
                        {this.getShortName(user)}
                    </div>

                    <div style={this.componentStyle.datePlaceholder}>
                        {moment(user.timestamp).format('DD.MM.YYYY hh:mm')}
                    </div>
                </div>


                <UserGeneralInfoPanel userId={this.props.userId} />

            </div>
        );
    }

});

module.exports = UserInfoPanel;