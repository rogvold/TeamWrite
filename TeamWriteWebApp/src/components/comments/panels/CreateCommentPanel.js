/**
 * Created by sabir on 30.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var TextareaAutosize = require('react-textarea-autosize');

var CreateCommentPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('CommentsStore', 'UsersStore')],
    getDefaultProps: function(){
        return {
            parentId: undefined,

            onCommentCreated: function(){

            },

            width: 800

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('CommentsStore');
        var uStore = flux.store('UsersStore');

        return {
            loading: store.loading,
            currentUser: uStore.getCurrentUser()
        }
    },

    getInitialState: function(){
        return {
            content: ''
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {
            backgroundColor: '#F1F1F1',
            padding: 5
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
            borderRadius: 3,
            width: 48,
            height: 48
        },

        textareaPlaceholder: {

        },

        textarea: {
            border: '1px solid rgb(239, 240, 241)',
            minHeight: 0,
            height: 48,
            fontSize: 14,
            lineHeight: '20px',
            paddingLeft: 5,
            width: '100%'
        },

        buttonPlaceholder: {
            marginTop: 5
        }


    },

    onContentChange: function(evt){
        this.setState({
            content: evt.target.value
        });
    },

    onSubmit: function(){
        var data = {
            content: this.state.content,
            parentId: this.props.parentId
        }
        this.getFlux().actions.createComment(data, function(){
            this.props.onCommentCreated();
            setTimeout(function(){
                this.setState({
                    content: ''
                });
            }.bind(this), 10);
        }.bind(this));
    },

    canSubmit: function(){
        if (this.state.loading == true){
            return false;
        }
        var content = this.state.content;
        if (content == undefined || content.trim() == ''){
            return false;
        }
        return true;
    },

    render: function(){
        var user = this.state.currentUser;
        var canSubmit = this.canSubmit();

        var textareaPlSt = assign({}, this.componentStyle.textareaPlaceholder, {width: this.props.width - 65});

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.left}>
                    <div style={this.componentStyle.avatar}>
                        <BackgroundImageContainer image={user.avatar} style={{borderRadius: 3}} />
                    </div>
                </div>

                <div style={this.componentStyle.right}>
                    <div style={textareaPlSt}>
                        <textarea
                                  minRows={2}
                                  maxRows={12}
                                  style={this.componentStyle.textarea}
                                  onChange={this.onContentChange}
                                  placeholder={'Комментировать...'}
                                  value={this.state.content} ></textarea>
                    </div>

                    <div style={this.componentStyle.buttonPlaceholder}>
                        <button className={'ui vk mini button'} onClick={this.onSubmit} disabled={!canSubmit} >
                            {this.state.loading == false ?
                                <span>
                                    Отправить
                                </span> :
                                <span>
                                    <i className={'icon spinner'} ></i> ...
                                </span>
                            }

                        </button>
                    </div>

                </div>

            </div>
        );
    }

});

module.exports = CreateCommentPanel;