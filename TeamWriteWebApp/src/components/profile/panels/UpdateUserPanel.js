/**
 * Created by sabir on 30.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var UpdateUserForm = require('../forms/UpdateUserForm');

var CoolPreloader = require('../../preloader/CoolPreloader');

var UpdateUserPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],
    getDefaultProps: function(){
        return {

            onUserUpdated: function(){

            }
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('UsersStore');
        var user = store.getCurrentUser();

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

        formPlaceholder: {

        }

    },

    onSubmit: function(data){
        this.getFlux().actions.updateUser(data, function(){
            this.props.onUserUpdated();
        }.bind(this));
    },

    render: function(){
        var u = this.state.user;
        if (u == undefined){
            return null;
        }

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.formPlaceholder}>
                    <UpdateUserForm
                        firstName={u.firstName} lastName={u.lastName} about={u.about}
                        avatar={u.avatar} education={u.education}
                        onSubmit={this.onSubmit} />
                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = UpdateUserPanel;