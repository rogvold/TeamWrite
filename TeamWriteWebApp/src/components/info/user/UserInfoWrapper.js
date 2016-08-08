/**
 * Created by sabir on 30.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var UserInfoPanel = require('./UserInfoPanel');

var UserInfoWrapper = React.createClass({
    getDefaultProps: function () {
        return {

            userId: undefined,

            style: {

            },

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
            //display: 'inline-block'
        },

        dialogPanelStyle: {
            width: 620,
            padding: 10
        }

    },

    getContent: function () {
        return (
            <div>
                <UserInfoPanel userId={this.props.userId} />
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
        var st = assign({}, this.componentStyle.placeholder, this.props.style);
        var content = this.getContent();

        return (
            <div style={st}>

                <div onClick={this.show} style={{cursor: 'pointer'}} >
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

module.exports = UserInfoWrapper;