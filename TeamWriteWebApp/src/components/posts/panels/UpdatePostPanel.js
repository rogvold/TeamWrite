/**
 * Created by sabir on 02.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var EditPostForm = require('../forms/EditPostForm');

var CoolPreloader = require('../../preloader/CoolPreloader');

var UpdatePostPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ProjectsStore')],
    getDefaultProps: function(){
        return {
            postId: undefined,

            onPostUpdated: function(){

            }

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ProjectsStore');
        var post = store.getPost(this.props.postId);

        return {
            loading: store.loading,
            post: post
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
            id: this.props.postId,
            content: html
        };
        this.getFlux().actions.updatePost(data, function(){
            this.props.onPostUpdated();
        }.bind(this));
    },

    render: function(){
        var post = this.state.post;
        if (post == undefined){
            return;
        }

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.formPlaceholder}>
                    <EditPostForm onSubmit={this.onSubmit} content={post.content} />
                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = UpdatePostPanel;