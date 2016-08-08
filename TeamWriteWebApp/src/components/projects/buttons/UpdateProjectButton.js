/**
 * Created by sabir on 28.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var UpdateProjectPanel = require('../panels/UpdateProjectPanel');

var UpdateProjectButton = React.createClass({
    getDefaultProps: function () {
        return {

            projectId: undefined,

            buttonName: 'Редактировать проект',
            buttonClassName: 'ui basic button',
            icon: 'icon pencil',

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
            display: 'inline-block'
        },

        buttonStyle: {
            display: 'inline-block'
        },

        dialogPanelStyle: {
            width: 820,
            padding: 10,
            lineHeight: '30px'
        }

    },

    getContent: function () {
        return (
            <div>

                <div style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 25}} >
                    Редактирование проекта
                </div>

                <UpdateProjectPanel projectId={this.props.projectId} onProjectUpdated={this.onClose} />
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

module.exports = UpdateProjectButton;