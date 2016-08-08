/**
 * Created by sabir on 05.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var AuthForm = require('../AuthForm');

var AuthWrapper = React.createClass({
    getDefaultProps: function () {
        return {


            style: {},

            level: 100

        }
    },

    getInitialState: function () {
        return {
            dialogVisible: false
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            display: 'inline-block'
        },

        buttonStyle: {
            display: 'inline-block'
        },

        dialogPanelStyle: {
            width: 520,
            padding: 10,
            lineHeight: '26px',
            paddingTop: 30
        }

    },

    onLogin: function(){
        window.location.reload();
    },

    getContent: function () {
        return (
            <div>
                <AuthForm
                    signUpEnabled={true}
                    facebookEnabled={false} roleSelectorEnabled={false}
                    onLogin={this.onLogin} />
            </div>
        );
    },

    onClose: function () {
        this.setState({
            dialogVisible: false
        });
    },

    show: function () {
        this.setState({
            dialogVisible: true
        });
    },

    render: function () {
        var st = assign({}, this.componentStyle.buttonStyle, this.props.style);
        var content = this.getContent();

        return (
            <div style={this.componentStyle.placeholder}>

                <div onClick={this.show}>
                    {this.props.children}
                </div>

                {this.state.dialogVisible == false ? null :
                    <Dialog content={content} level={this.props.level} onClose={this.onClose}
                            dialogPanelStyle={this.componentStyle.dialogPanelStyle}
                        />
                }

            </div>
        );
    }

});

module.exports = AuthWrapper;