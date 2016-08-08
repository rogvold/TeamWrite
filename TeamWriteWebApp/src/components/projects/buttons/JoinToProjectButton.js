/**
 * Created by sabir on 29.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var JoinProjectPanel = require('../user/JoinProjectPanel');

var JoinToProjectButton = React.createClass({
    getDefaultProps: function () {
        return {

            buttonName: 'Присоединиться!',
            buttonClassName: 'ui patientPrimary circular button',
            icon: 'icon plus',

            style: {},

            level: 100,

            projectId: undefined

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
            width: 620,
            padding: 20
        }

    },

    getContent: function () {
        return (
            <div>
                <JoinProjectPanel projectId={this.props.projectId} onAdded={this.onClose} />
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

                <div style={st} onClick={this.show} className={this.props.buttonClassName}>
                    {(this.props.icon == undefined || this.props.icon == '') ? null :
                        <i className={this.props.icon}></i>
                    }

                    {this.props.buttonName}
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

module.exports = JoinToProjectButton;