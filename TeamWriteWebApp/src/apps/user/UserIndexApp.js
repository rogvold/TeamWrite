/**
 * Created by sabir on 20.06.16.
 */


var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../components/preloader/CoolPreloader');

var TeamWriteTemplate = require('../../components/templates/cool/TeamWriteTemplate');
var CoolTopTemplate = require('../../components/templates/cool/CoolTopTemplate');

var UserProjectsPanel = require('../../components/projects/panels/UserProjectsPanel');
var ProjectsTabsPanel = require('../../components/projects/panels/ProjectsTabsPanel');

var UserIndexApp = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],

    getDefaultProps: function(){
        return {

        }
    },

    getInitialState: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('UsersStore');
        var loading = store.loading;
        var user = this.getFlux().store('UsersStore').getCurrentUser();
        return {
            loading: loading,
            user: user
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        var user = this.getFlux().store('UsersStore').getCurrentUser();
        console.log('UserIndexApp: componentDidMount occured');
        if (this.getFlux().store('UsersStore').getCurrentUserId() == undefined){
            return;
        }
        if (user == undefined){
            try{
                this.getFlux().actions.loadUser(this.getFlux().store('UsersStore').getCurrentUserId());
            }catch(ee){
                setTimeout(function(){
                    this.getFlux().actions.loadUser(this.getFlux().store('UsersStore').getCurrentUserId());
                }.bind(this), 500);
            }
        }
    },

    componentStyle: {
        placeholder: {

        }
    },

    getContent: function(){
        var user = this.state.user;
        var loading = this.state.loading;

        return (
            <div style={this.componentStyle.placeholder} >

                <ProjectsTabsPanel />

            </div>
        );
    },


    render: function(){
        console.log('UserIndexApp: render: this.state.loading = ', this.state.loading);

        return (
            <div style={this.componentStyle.placeholder} >

                <CoolTopTemplate
                    content={this.getContent()}
                    activeName={'myProjects'} />

            </div>
        );
    }

});

module.exports = UserIndexApp;