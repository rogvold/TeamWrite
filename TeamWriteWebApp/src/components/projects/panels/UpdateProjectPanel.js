/**
 * Created by sabir on 28.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var UpdateProjectForm = require('../forms/UpdateProjectForm');

var CoolPreloader = require('../../preloader/CoolPreloader');

var UpdateProjectPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ProjectsStore')],
    getDefaultProps: function(){
        return {
            projectId: undefined,

            onProjectUpdated: function(){

            }

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ProjectsStore');
        var project = store.getProject(this.props.projectId);
        return {
            project: project,
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
            position: 'relative'
        },

        formPlaceholder: {

        }

    },

    onSubmit: function(data){
        var p = this.state.project;
        if (p == undefined){
            return;
        }
        data.id = p.id;
        this.getFlux().actions.updateProject(data, function(){
            this.props.onProjectUpdated();
        }.bind(this));
    },

    render: function(){
        var p = this.state.project;

        return (
            <div style={this.componentStyle.placeholder} >

                {p == undefined ? null :
                    <div style={this.componentStyle.formPlaceholder}>
                        <UpdateProjectForm
                                    onSubmit={this.onSubmit}
                                    name={p.name}
                                    description={p.description}
                                    about={p.about}
                                    avatar={p.avatar}
                                    tags={p.tags}
                            />
                    </div>
                }

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = UpdateProjectPanel;