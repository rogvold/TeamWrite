/**
 * Created by sabir on 27.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ProjectItem = require('./ProjectItem');

var History = require('react-router').History;

var ProjectsList = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ProjectsStore', 'UsersStore'), History],
    getDefaultProps: function(){
        return {
            projects: [],

            onProjectClick: function(project){

            }

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var uStore = flux.store('UsersStore');
        var store = flux.store('ProjectsStore');
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

    },

    componentStyle: {
        placeholder: {

        },

        listPlaceholder: {
            textAlign: 'left'
        },

        item: {
            width: 240,
            height: 300,
            margin: 15,
            display: 'inline-block',
            verticalAlign: 'top',
            cursor: 'pointer'
        }

    },

    onProjectClick: function(project){
        var url = '/project/' + project.id;

        this.history.pushState(null, url);

        this.props.onProjectClick(project);
    },

    render: function(){
        var list = this.props.projects;

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.listPlaceholder}>

                    {list.map(function(p, k){
                        var key = 'project_' + k + '_' + p.id;
                        var onClick = this.onProjectClick.bind(this, p);

                        return (
                            <div style={this.componentStyle.item} key={key} onClick={onClick} >
                                <ProjectItem projectId={p.id} />
                            </div>
                        );

                    }, this)}

                </div>

            </div>
        );
    }

});

module.exports = ProjectsList;