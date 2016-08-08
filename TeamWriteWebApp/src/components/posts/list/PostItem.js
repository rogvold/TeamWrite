/**
 * Created by sabir on 01.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var moment = require('moment');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var UpdatePostButton = require('../buttons/UpdatePostButton');

var PostItem = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ProjectsStore', 'UsersStore')],
    getDefaultProps: function(){
        return {
            postId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ProjectsStore');
        var uStore = flux.store('UsersStore');
        var post = store.getPost(this.props.postId);
        var user = uStore.getUser(post.userId);

        return {
            loading: store.loading,
            post: post,
            user: user,
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

    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white',
            paddingBottom: 15
        },

        contentPlaceholder: {

        },

        topPlaceholder: {
            padding: 5,
            borderBottom: '1px solid #EAEEF0',
            lineHeight: '6px'
        },

        left: {
            display: 'inline-block',
            verticalAlign: 'top'
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            paddingLeft: 5
        },

        userNamePlaceholder: {
            fontWeight: 'bold',
            lineHeight: '20px',
            fontSize: 16
        },

        datePlaceholder: {
            opacity: 0.4,
            fontSize: 14,
            lineHeight: '14px'
        },

        avatar: {
            width: 36,
            height: 36,
        }

    },

    render: function(){
        var user = this.state.user;
        var currentUser = this.state.currentUser;
        var post = this.state.post;
        if (post == undefined || user == undefined){
            return null;
        }
        var isCurrentUser = (user != undefined && currentUser != undefined && user.id == currentUser.id);

        return (
            <div style={this.componentStyle.placeholder} className={'coavtor-post'} >

                <div style={this.componentStyle.topPlaceholder} className={'postTopPanel'} >

                    <div style={this.componentStyle.left}>
                        <div style={this.componentStyle.avatar}>
                            <BackgroundImageContainer image={user.avatar} />
                        </div>
                    </div>

                    <div style={this.componentStyle.right}>
                        <div>
                            <div style={{display: 'inline-block', verticalAlign: 'top'}} >
                                <div style={this.componentStyle.userNamePlaceholder}>
                                    {user.firstName} {user.lastName}
                                </div>
                            </div>
                            {isCurrentUser == false ? null :
                                <div style={{display: 'inline-block', verticalAlign: 'top', textAlign: 'right', marginLeft: 15}} >
                                    <UpdatePostButton postId={this.props.postId} />
                                </div>
                            }
                        </div>

                        <div style={this.componentStyle.datePlaceholder}>
                            {moment(post.timestamp).format('DD.MM.YYYY в HH:mm')}
                        </div>

                    </div>

                </div>

                <div style={this.componentStyle.contentPlaceholder} className={'RichEditor-editor '} >
                    <div className={'public-DraftEditor-content'} contentEditable={false} >
                        <div contentEditable={false}  dangerouslySetInnerHTML={{__html: post.content}}></div>
                    </div>
                </div>

            </div>
        );
    }

});

module.exports = PostItem;