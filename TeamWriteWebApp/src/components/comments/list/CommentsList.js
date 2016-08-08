/**
 * Created by sabir on 30.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CommentItem = require('./CommentItem');

var CommentsList = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('CommentsStore')],
    getDefaultProps: function(){
        return {
            parentId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('CommentsStore');
        var comments = store.getParentComments(this.props.parentId);
        return {
            loading: store.loading,
            comments: comments
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

        },

        item: {
            padding: 5,
            borderBottom: '1px solid rgb(239, 240, 241)'
        }

    },

    render: function(){
        var comments = this.state.comments;

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.listPlaceholder}>

                    {comments.map(function(c, k){
                        var key = 'comment_' + k + '_' + c.id;
                        return (
                            <div style={this.componentStyle.item} key={key} >
                                <CommentItem commentId={c.id} />
                            </div>
                        );

                    }, this)}

                </div>

            </div>
        );
    }

});

module.exports = CommentsList;