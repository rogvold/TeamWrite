/**
 * Created by sabir on 01.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ProjectPostsList = require('../list/ProjectPostsList');

var CreatePostPanel= require('./CreatePostPanel');

var ProjectPostsPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ProjectsStore')],
    getDefaultProps: function(){
        return {
            projectId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ProjectsStore');
        return {
            loading: store.loading
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

        listPlaceholder: {
            marginBottom: 20
        },

        newPlaceholder: {

        }
    },

    render: function(){
        var isLoggedIn = (this.getFlux().store('UsersStore').getCurrentUserId() != undefined);

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.listPlaceholder}>
                    <ProjectPostsList projectId={this.props.projectId} />
                </div>

                {isLoggedIn == false ? null :
                    <div style={this.componentStyle.newPlaceholder}>
                        <CreatePostPanel projectId={this.props.projectId}  />
                    </div>
                }

            </div>
        );
    }

});

module.exports = ProjectPostsPanel;