/**
 * Created by sabir on 01.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var EditPostForm = require('../forms/EditPostForm');

var CoolPreloader = require('../../preloader/CoolPreloader');

var CreatePostPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ProjectsStore')],
    getDefaultProps: function(){
        return {
            projectId: undefined,

            onPostCreated: function(){

            }

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
            position: 'relative'
        },

        formPlaceholder: {

        }

    },

    onSubmit: function(html){
        var data = {
            projectId: this.props.projectId,
            content: html
        };
        this.getFlux().actions.createPost(data, function(){
            this.props.onPostCreated();
        }.bind(this));
    },

    render: function(){

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.formPlaceholder}>
                    <EditPostForm onSubmit={this.onSubmit} />
                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = CreatePostPanel;