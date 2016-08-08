/**
 * Created by sabir on 05.08.16.
 */
var React = require('react');
var assign = require('object-assign');

var Dialog = require('../../dialog/Dialog');

var CreateProjectPanel = require('../panels/CreateProjectPanel');

var CreateProjectWrapper = React.createClass({
    getDefaultProps: function () {
        return {

            style: {

            },

            level: 100,

            onProjectCreated: function(){

            }

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
            padding: 10
        }

    },

    onProjectCreated: function(){
        this.props.onProjectCreated();
        this.onClose();
    },

    getContent: function () {
        return (
            <div>

                <div style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 25}} >
                    Создание проекта
                </div>

                <CreateProjectPanel onProjectCreated={this.onProjectCreated} />

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

                <div onClick={this.show} >
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

module.exports = CreateProjectWrapper;