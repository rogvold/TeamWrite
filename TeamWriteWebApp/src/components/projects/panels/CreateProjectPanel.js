/**
 * Created by sabir on 27.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../preloader/CoolPreloader');

var UpdateProjectForm = require('../forms/UpdateProjectForm');

var CreateProjectPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ProjectsStore', 'UsersStore')],
    getDefaultProps: function(){
        return {

            onProjectCreated: function(){

            }

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ProjectsStore');
        var uStore = flux.store('UsersStore');
        var loading = uStore.loading || store.loading;
        return {
            loading: store.loading,
            user: uStore.getCurrentUser()
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
            backgroundColor: 'white'
        },

        formPlaceholder: {

        }

    },

    onSubmit: function(data){
        data.creatorId = this.state.user.id;
        this.getFlux().actions.createProject(data, function(){
            this.props.onProjectCreated();
        }.bind(this));
    },

    render: function(){

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.formPlaceholder}>
                    <UpdateProjectForm onSubmit={this.onSubmit} />
                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = CreateProjectPanel;