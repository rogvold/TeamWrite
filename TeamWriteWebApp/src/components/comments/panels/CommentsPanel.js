/**
 * Created by sabir on 30.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CommentsList = require('../list/CommentsList');
var CreateCommentPanel = require('./CreateCommentPanel');

var CommentsPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('CommentsStore')],
    getDefaultProps: function(){
        return {

            parentId: undefined

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('CommentsStore');
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
        setTimeout(function(){
            this.getFlux().actions.loadComments(this.props.parentId);
        }.bind(this), 10);
    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white'
        },

        listPlaceholder: {

        },

        createPanelPlaceholder: {

        }

    },

    render: function(){

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.listPlaceholder}>
                    <CommentsList parentId={this.props.parentId} />
                </div>

                <div style={this.componentStyle.createPanelPlaceholder}>
                    <CreateCommentPanel parentId={this.props.parentId} />
                </div>

            </div>
        );
    }

});

module.exports = CommentsPanel;