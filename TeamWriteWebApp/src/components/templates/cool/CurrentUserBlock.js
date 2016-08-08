/**
 * Created by sabir on 27.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var UpdateUserWrapper = require('../../profile/panels/UpdateUserWrapper');

var CurrentUserBlock = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('UsersStore');
        return {
            loading: store.loading,
            user: store.getCurrentUser()
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
            minHeight: 120
        },

        avatarPlaceholder: {
            position: 'relative',
            width: 100,
            margin: '0 auto'
        },

        avatar: {
            width: 90,
            height: 90,
            borderRadius: 3000,
            margin: '0 auto'
            //border: '2px solid white'
        },

        settingsPlaceholder: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            padding: 5,
            paddingRight: 6,
            //backgroundColor: '#E9EBED',
            backgroundColor: 'rgb(46, 60, 84)',
            borderRadius: 1000,
            cursor: 'pointer',
            //border: '1px solid #2E3C54',
            border: '1px solid #E9EBED',
            color: '#E9EBED',
            zIndex: 10
        },

        namePlaceholder: {
            textAlign: 'center',
            fontSize: 16,
            marginTop: 10,
            color: 'white',
            opacity: 0.9
        }

    },

    render: function(){
        var user = this.state.user;

        var ava = (user == undefined) ? undefined : user.avatar;
        if (ava == undefined){
            ava = 'assets/images/noavatar.jpeg';
        }

        return (
            <div style={this.componentStyle.placeholder} >

                {user == undefined ?
                    <div style={{textAlign: 'center', padding: 10, color: 'white', opacity: 0.8}} >
                        Загрузка...
                    </div>
                    :
                    <div>
                        <div style={this.componentStyle.avatarPlaceholder}>

                            <div style={this.componentStyle.avatar}>
                                <BackgroundImageContainer
                                    image={ava}
                                    style={{borderRadius: 3000}} />
                            </div>

                            <div style={this.componentStyle.settingsPlaceholder}>
                                <div>
                                    <UpdateUserWrapper >
                                        <i className={'icon settings'} style={{marginRight: 0}} ></i>
                                    </UpdateUserWrapper>
                                </div>
                            </div>

                        </div>

                        <div style={this.componentStyle.namePlaceholder}>
                            {user.firstName} {user.lastName}
                        </div>
                    </div>
                }

            </div>
        );
    }

});

module.exports = CurrentUserBlock;