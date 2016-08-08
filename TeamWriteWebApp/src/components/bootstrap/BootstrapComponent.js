/**
 * Created by sabir on 27.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BootstrapComponent = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore', 'ProjectsStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ProjectsStore');
        var uStore = flux.store('UsersStore');
        var loading = store.loading || uStore.loading;
        return {
            loading: loading
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        var uStore = this.getFlux().store('UsersStore');
        var userId = uStore.getCurrentUserId();

        if (userId == undefined){
            return;
        }

        this.getFlux().actions.loadUser(userId);
        setTimeout(function(){

        }.bind(this), 10);
    },

    componentStyle: {
        placeholder: {

        }
    },

    render: function(){

        return (
            <div style={this.componentStyle.placeholder} >

            </div>
        );
    }

});

module.exports = BootstrapComponent;