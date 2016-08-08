/**
 * Created by sabir on 01.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var StyleButton = require('./StyleButton');

var BlockStyleControls = React.createClass({
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
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

        const BLOCK_TYPES = [
            {label: 'H1', style: 'header-one'},
            {label: 'H2', style: 'header-two'},
            {label: 'H3', style: 'header-three'},

            //{label: 'H4', style: 'header-four'},
            //{label: 'H5', style: 'header-five'},
            //{label: 'H6', style: 'header-six'},

            {label: '', style: 'unordered-list-item', icon: 'icon unordered list'},
            {label: '', style: 'ordered-list-item', icon: 'icon ordered list'},
            //{label: 'Цитата', style: 'blockquote'},
            {label: '', style: 'blockquote', icon: 'icon quote left'},

            //{label: 'Code Block', style: 'code-block'},
        ];

        return (
            <div style={this.componentStyle.placeholder} className="RichEditor-controls" >

                {BLOCK_TYPES.map(function(type, n){
                    var key = 'block_button_' + n;

                    return (
                        <StyleButton
                            key={key}
                            active={type.style === blockType}
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

module.exports = BlockStyleControls;