/**
 * Created by sabir on 01.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var StyleButton = React.createClass({
    getDefaultProps: function () {
        return {

            active: false,
            label: '',
            onToggle: function(){

            },
            style: undefined,
            icon: ''

        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    onToggle: function(){
        this.props.onToggle(this.props.style);
    },

    render: function () {
        var className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.icon == undefined || this.props.icon.trim() == '' ? null :
                    <i className={this.props.icon} style={{marginRight: 0}} ></i>
                }

                {this.props.label}


            </span>
        );
    }

});

module.exports = StyleButton;