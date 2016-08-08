/**
 * Created by sabir on 01.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var StyleButton = require('./StyleButton');

var InlineStyleControls = React.createClass({
    getDefaultProps: function () {
        return {
            editorState: undefined,
            onToggle: function(a){

            }
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
        placeholder: {
            display: 'inline-block'
        }
    },

    onToggle: function(a){
        this.props.onToggle(a);
    },

    render: function () {
        var editorState = this.props.editorState;
        if (editorState == undefined){
            return null;
        }
        var currentStyle = editorState.getCurrentInlineStyle();

        var INLINE_STYLES = [
            {label: '', style: 'BOLD', icon: 'icon bold'},
            {label: '', style: 'ITALIC', icon: 'icon italic'},
            {label: '', style: 'UNDERLINE', icon: 'icon underline'},
            //{label: 'Monospace', style: 'CODE'}
        ];

        return (
            <div style={this.componentStyle.placeholder} className="RichEditor-controls" >

                {INLINE_STYLES.map(function(type, n){
                    var key = 'inline_button_' + n;
                    return (
                        <StyleButton
                            key={key}
                            active={currentStyle.has(type.style)}
                            label={type.label}
                            onToggle={this.onToggle}
                            icon={type.icon}
                            style={type.style}
                            />
                    );
                }, this)}

            </div>
        );
    }

});

module.exports = InlineStyleControls;