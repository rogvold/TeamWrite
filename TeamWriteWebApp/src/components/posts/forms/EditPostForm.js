/**
 * Created by sabir on 01.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var Editor = require('draft-js').Editor;
var EditorState = require('draft-js').EditorState;
var ContentState = require('draft-js').ContentState;
var RichUtils = require('draft-js').RichUtils;
var AtomicBlockUtils = require('draft-js').AtomicBlockUtils;
var Entity = require('draft-js').Entity;

var stateToHTML = require('draft-js-export-html').stateToHTML;
var stateFromHTML = require('draft-js-import-html').stateFromHTML;

var BlockStyleControls = require('./editor/BlockStyleControls');
var InlineStyleControls = require('./editor/InlineStyleControls');

var EditPostForm = React.createClass({
    getDefaultProps: function () {
        return {

            content: undefined,

            placeholder: 'Начните писать...',

            onSubmit: function(html){

            }

        }
    },

    getInitialState: function () {
        var editorState = EditorState.createEmpty();
        var content = this.props.content;
        if (content != undefined){
            editorState = EditorState.createWithContent(stateFromHTML(content));
        }
        return {
            editorState: editorState,
            changed: false
        }
    },

    componentWillReceiveProps: function (nextProps) {
        var content = nextProps.content;
        if (content == undefined){
            return;
        }
        this.setState({
            editorState: EditorState.createWithContent(stateFromHTML(content))
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            backgroundColor: 'white'
        },

        editorPlaceholder: {
            position: 'relative',
            width: '100%'
        },

        controlsPlaceholder: {
            height: 50,
            padding: 10,
            paddingTop: 0,
            lineHeight: '40px',
            fontSize: 30,
            position: 'absolute',
            top: 0,
            width: '100%',
            border: '1px solid #EFF0F1',
            width: '100%',
            zIndex: 1
        },

        writingAreaPlaceholder: {
            paddingTop: 40,
            width: '100%',
            borderLeft: '1px solid #EFF0F1',
            borderRight: '1px solid #EFF0F1',
            borderBottom: '1px solid #EFF0F1',
            borderBottomLeftRadius: 3,
            borderBottomRightRadius: 3
        },

        innerEditorPlaceholder: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            padding: 10,
            lineHeight: '26px',
            fontSize: 16,
            minHeight: 90,
            //borderLeft: '3px solid #4E92DF',
            borderLeft: '3px solid #2E3C54',
            paddingTop: 0,
            paddingBottom: 20
        },

        saveButtonPlaceholder: {
            textAlign: 'right',
            padding: '5px 0px',
            borderLeft: '1px solid #EFF0F1',
            borderRight: '1px solid #EFF0F1',
            borderBottom: '1px solid #EFF0F1'
        }


    },

    onChange: function(editorState){

        this.setState({
            editorState: editorState,
            changed: true
        });
    },

    handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    },


    focus: function(){
        this.refs.editor.focus();
    },

    toggleBlockType: function(blockType){
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            ));
    },

    toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    },

    canSubmit: function(){
        if (this.state.changed == false){
            return false;
        }
        return true;
    },

    onSubmit: function(){
        var editorState = this.state.editorState;
        var html = stateToHTML(editorState.getCurrentContent());
        this.props.onSubmit(html);
    },

    render: function () {
        var editorState = this.state.editorState;
        var contentState = editorState.getCurrentContent();
        var className = 'RichEditor-editor ';
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }
        var canSubmit = this.canSubmit();

        return (
            <div style={this.componentStyle.placeholder}>


                <div style={this.componentStyle.editorPlaceholder}>

                    <div style={this.componentStyle.controlsPlaceholder}>
                        <div className={'RichEditor-root'} >
                            <span style={{marginRight: 15}}>
                                <InlineStyleControls
                                    editorState={editorState}
                                    onToggle={this.toggleInlineStyle}
                                    />
                            </span>

                            <BlockStyleControls
                                editorState={editorState}
                                onToggle={this.toggleBlockType}
                                />

                        </div>
                    </div>

                    <div style={this.componentStyle.writingAreaPlaceholder}>

                        <div style={this.componentStyle.innerEditorPlaceholder}>

                            <div className={'RichEditor-root'} >
                                <div className={className} onClick={this.focus} >
                                    <Editor
                                        editorState={this.state.editorState}
                                        handleKeyCommand={this.handleKeyCommand}
                                        onChange={this.onChange}
                                        placeholder={this.props.placeholder}
                                        ref={'editor'}
                                        />
                                </div>
                            </div>

                        </div>

                    </div>


                </div>

                <div style={this.componentStyle.saveButtonPlaceholder}>
                    <button className={'ui button patientPrimary'}
                            onClick={this.onSubmit}
                            style={{marginRight: 5}}
                        >
                        <i className={'icon save '} ></i> Сохранить
                    </button>
                </div>

            </div>
        );
    }

});

module.exports = EditPostForm;