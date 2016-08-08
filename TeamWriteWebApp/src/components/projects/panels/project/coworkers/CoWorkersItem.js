/**
 * Created by sabir on 29.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var moment = require('moment');

var BackgroundImageContainer = require('../../../../image/BackgroundImageContainer');

var UserInfoWrapper = require('../../../../info/user/UserInfoWrapper');

var CoWorkersItem = React.createClass({

    getDefaultProps: function(){
        return {
            link: undefined

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

    getShortName: function(u){
        var name = u.firstName + ' ';
        name = name + (u.lastName[0]) + '.';
        return name;
    },

    componentStyle: {
        placeholder: {
            //width: 140,
            //height: 190
            width: 100
        },

        avatarPlaceholder: {

        },

        avatar: {
            //borderRadius: 1000,
            margin: '0 auto',
            width: 48,
            height: 48
            //borderBottom: '1px solid rgb(239, 240, 241)'
        },

        namePlaceholder: {
            lineHeight: '18px',
            fontSize: 12,
            textAlign: 'center',
            fontWeight: 'bold',
            //opacity: 0.6,
            //marginTop: 10
            marginTop: 5
        },

        datePlaceholder: {
            opacity: 0.6,
            fontSize: 10,
            textAlign: 'center'
        }


    },

    render: function(){
        var link = this.props.link;
        if (link == undefined){
            return (<div></div>);
        }
        var u = link.user;
        if (u == undefined){
            return (<div></div>);
        }
        var avatar = u.avatar;
        if (avatar == undefined){
            avatar = 'assets/images/noavatar.jpeg';
        }

        return (
            <div style={this.componentStyle.placeholder} >

                <UserInfoWrapper userId={u.id}>

                    <div style={this.componentStyle.avatarPlaceholder}>
                        <div style={this.componentStyle.avatar}>
                            <BackgroundImageContainer image={avatar} style={{borderRadius: 1000}} />
                        </div>
                    </div>

                    <div style={this.componentStyle.namePlaceholder}>
                        {this.getShortName(u)}
                    </div>

                    <div style={this.componentStyle.datePlaceholder}>
                        {moment(link.timestamp).format('DD.MM.YYYY hh:mm')}
                    </div>

                </UserInfoWrapper>

            </div>
        );
    }

});

module.exports = CoWorkersItem;