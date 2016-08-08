/**
 * Created by sabir on 30.07.16.
 */

var React = require('react');
var assign = require('object-assign');
var moment = require('moment');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var CommentItem = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('CommentsStore', 'UsersStore')],
    getDefaultProps: function(){
        return {
            commentId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('CommentsStore');
        var uStore = flux.store('UsersStore');
        var comment = store.getComment(this.props.commentId);
        var user = (comment == undefined) ? undefined : uStore.getUser(comment.userId);

        return {
            loading: store.loading,
            comment: comment,
            user: user
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

        left: {
            display: 'inline-block',
            verticalAlign: 'top',
            marginRight: 5
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top'
        },

        avatar: {
            //borderRadius: 5,
            borderRadius: 3,
            width: 48,
            height: 48
        },

        namePlaceholder: {
            fontSize: 14,
            fontWeight: 'bold'
        },

        contentPlaceholder: {
            fontSize: 14,
            lineHeight: '24px'
        },

        datePlaceholder: {
            opacity: 0.4,
            fontSize: 12,
            lineHeight: '16px'
        }


    },

    render: function(){
        var comment = this.state.comment;
        var user = this.state.user;
        if (comment == undefined || user == undefined){
            return;
        }

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.left}>
                    <div style={this.componentStyle.avatar}>
                        <BackgroundImageContainer image={user.avatar} style={{borderRadius: 3}} />
                    </div>
                </div>

                <div style={this.componentStyle.right}>

                    <div style={this.componentStyle.namePlaceholder}>
                        {user.firstName} {user.lastName}
                    </div>

                    <div style={this.componentStyle.contentPlaceholder}>
                        <div dangerouslySetInnerHTML={{__html: comment.content.replace(/\n/g, '<br/>')}}></div>
                    </div>

                    <div style={this.componentStyle.datePlaceholder}>
                        {moment(comment.timestamp).format('DD.MM в HH:mm:ss')}
                    </div>

                </div>

            </div>
        );
    }

});

module.exports = CommentItem;