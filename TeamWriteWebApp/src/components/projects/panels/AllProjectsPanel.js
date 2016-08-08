/**
 * Created by sabir on 27.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var FilterableProjectsList = require('../list/FilterableProjectsList');
var CoolPreloader = require('../../preloader/CoolPreloader');

var AllProjectsPanel = React.createClass({
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
        var projects = store.getAllProjects();

        return {
            loading: loading,
            projects: projects,
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
        var store = this.getFlux().store('ProjectsStore');
        var projects = store.getAllProjects();
        //if (projects == undefined || projects.length == 0){
        this.getFlux().actions.loadAllProjects();
        //}
    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            minHeight: 120,
            width: 820,
            margin: '0 auto',
            marginTop: 5
        },

        listPlaceholder: {
            //marginTop: 15
            marginTop: 0
        }
    },

    render: function(){
        var projects = this.state.projects;

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.listPlaceholder} >
                    <FilterableProjectsList projects={projects} />
                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = AllProjectsPanel;