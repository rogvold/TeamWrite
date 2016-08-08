/**
 * Created by sabir on 27.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var FileUploadButton = require('../../file/FileUploadButton');

var DeleteButton = require('../../button/DeleteButton');

var SelectTagPanel = require('../../projects/tags/SelectTagPanel');

var UpdateProjectForm = React.createClass({
    getDefaultProps: function () {
        return {

            name: undefined,
            description: undefined,
            about: undefined,
            avatar: undefined,
            tags: [],

            createMode: true,

            onSubmit: function(data){

            },

            onDelete: function(){

            }

        }
    },

    getInitialState: function () {
        return {
            name: this.props.name,
            description: this.props.description,
            about: this.props.about,
            avatar: this.props.avatar,
            tags: this.props.tags,
            changed: false
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            name: nextProps.name,
            description: nextProps.description,
            about: nextProps.about,
            avatar: nextProps.avatar,
            tags: nextProps.tags,
            changed: false
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 800,
            margin: '0 auto',
            lineHeight: '30px'
        },

        left: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 250
        },

        avatarPlaceholder: {
            padding: 5,
            paddingLeft: 0
        },

        avatar: {
            borderRadius: 4,
            width: 245,
            height: 180,
            border: '1px solid #EFF0F1'
        },

        changeAvatarButtonPlaceholder: {
            //paddingLeft: 5,
            paddingRight: 5
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 550,
            paddingTop: 5
        },

        formPlaceholder: {

        },

        buttonsPlaceholder: {
            marginTop: 10,
            textAlign: 'right'
        },

        aboutPlaceholder: {
            marginTop: 10
        }

    },

    getData: function(){
        return {
            name: this.state.name,
            description: this.state.description,
            about: this.state.about,
            avatar: this.state.avatar,
            tags: this.state.tags
        }
    },

    onNameChange: function(evt){
        this.setState({
            name: evt.target.value,
            changed: true
        });
    },

    onDescriptionChange: function(evt){
        this.setState({
            description: evt.target.value,
            changed: true
        });
    },

    onAboutChange: function(evt){
        this.setState({
            about: evt.target.value,
            changed: true
        });
    },

    onAvatarChange: function(avatar){
        this.setState({
            avatar: avatar,
            changed: true
        });
    },

    isEmpty: function(s){
        return (s == undefined || s.trim() == '');
    },

    canSubmit: function(){
        var data = this.getData();
        var areEmptyTags = (this.state.tags == undefined || this.state.tags.length == 0);
        if (this.isEmpty(data.name) || this.isEmpty(data.description) || areEmptyTags){
            return false;
        }
        return true;
    },

    onSubmit: function(){
        if (this.canSubmit() == false){
            return;
        }
        var data = this.getData();
        this.props.onSubmit(data);
    },

    onTagSelect: function(tag){
        var tags = [tag];
        this.setState({
            tags: tags,
            changed: true
        });
    },

    render: function () {
        var canSubmit = this.canSubmit() && this.state.changed;
        var tag = (this.state.tags == undefined || this.state.tags.length == 0) ? undefined : this.state.tags[0];

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.left}>

                    <div style={this.componentStyle.avatarPlaceholder}>
                        <div style={this.componentStyle.avatar}>
                            <BackgroundImageContainer image={this.state.avatar} style={{borderRadius: 4}} />
                        </div>
                    </div>

                    <div style={this.componentStyle.changeAvatarButtonPlaceholder}>
                        <FileUploadButton
                            buttonName={'Загрузить картинку'}
                            icon={'icon upload'}
                            onFileUploaded={this.onAvatarChange} />
                    </div>

                </div>

                <div style={this.componentStyle.right}>

                    <div style={this.componentStyle.formPlaceholder} className={'ui form'} >

                        <div className={'field'} style={{marginBottom: 5}} >
                            <label>
                                Название проекта
                            </label>
                            <input type={'text'} onChange={this.onNameChange}
                                   placeholder={'Название проекта'} value={this.state.name} />
                        </div>

                        <div className={'field'} >
                            <label>
                                Краткое описание проекта (не более 200 символов)
                            </label>
                            <textarea type={'text'}
                                        style={{height: 110, minHeight: 10}}
                                        onChange={this.onDescriptionChange}
                                        placeholder={'Краткое описание проекта (не более 200 символов)'} value={this.state.description} ></textarea>
                        </div>

                    </div>

                </div>

                <div style={this.componentStyle.aboutPlaceholder}>
                    <div className={'ui form'} >
                        <div className={'field'} >
                            <label>
                                Тематика проекта
                            </label>
                            <SelectTagPanel
                                selectedName={tag}
                                onTagSelect={this.onTagSelect} />
                        </div>
                    </div>
                </div>

                <div style={this.componentStyle.aboutPlaceholder}>
                    <div className={'ui form'} >
                        <div className={'field'} >
                            <label>
                                Развернутое описание проекта
                            </label>
                            <textarea type={'text'} onChange={this.onAboutChange}
                                      style={{height: '10em'}}
                                      placeholder={'Развернутое описание проекта'} value={this.state.about} ></textarea>
                        </div>
                    </div>
                </div>


                <div style={this.componentStyle.buttonsPlaceholder}>

                    {this.props.createMode == true ? null :
                        <DeleteButton onDelete={this.props.onDelete} />
                    }

                    <button className={'ui primary button'} style={{marginRight: 0}}
                            disabled={!canSubmit} onClick={this.onSubmit} >
                        <i className={'icon save'} ></i> Сохранить
                    </button>

                </div>

            </div>
        );
    }

});

module.exports = UpdateProjectForm;