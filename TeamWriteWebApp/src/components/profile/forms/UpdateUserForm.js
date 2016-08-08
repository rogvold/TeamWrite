/**
 * Created by sabir on 30.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var FileUploadButton = require('../../file/FileUploadButton');

var DeleteButton = require('../../button/DeleteButton');

var UpdateUserForm = React.createClass({
    getDefaultProps: function () {
        return {

            firstName: undefined,
            lastName: undefined,
            education: undefined,
            about: undefined,
            avatar: undefined,

            createMode: false,

            onSubmit: function(data){

            }

        }
    },

    getInitialState: function () {
        return {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            education: this.props.education,
            about: this.props.about,
            avatar: this.props.avatar,

            changed: false
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            firstName: nextProps.firstName,
            lastName: nextProps.lastName,
            education: nextProps.education,
            about: nextProps.about,
            avatar: nextProps.avatar,
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
            height: 245,
            border: '1px solid #EFF0F1'
        },

        changeAvatarButtonPlaceholder: {
            //paddingLeft: 5,
            paddingRight: 5
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 550
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
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            education: this.state.education,
            about: this.state.about,
            avatar: this.state.avatar
        }
    },

    onFirstNameChange: function(evt){
        this.setState({
            firstName: evt.target.value,
            changed: true
        });
    },

    onLastNameChange: function(evt){
        this.setState({
            lastName: evt.target.value,
            changed: true
        });
    },

    onAboutChange: function(evt){
        this.setState({
            about: evt.target.value,
            changed: true
        });
    },

    onEducationChange: function(evt){
        this.setState({
            education: evt.target.value,
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
        if (this.isEmpty(data.firstName) || this.isEmpty(data.lastName)){
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

    render: function () {
        var canSubmit = this.canSubmit() && this.state.changed;

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
                            buttonName={'Загрузить аватар'}
                            icon={'icon upload'}
                            onFileUploaded={this.onAvatarChange} />
                    </div>

                </div>

                <div style={this.componentStyle.right}>

                    <div style={this.componentStyle.formPlaceholder} className={'ui form'} >

                        <div className={'field'} style={{marginBottom: 5}} >
                            <label>
                                Имя
                            </label>
                            <input type={'text'} onChange={this.onFirstNameChange}
                                   placeholder={'Имя'} value={this.state.firstName} />
                        </div>

                        <div className={'field'} style={{marginBottom: 5}} >
                            <label>
                                Фамилия
                            </label>
                            <input type={'text'} onChange={this.onLastNameChange}
                                   placeholder={'Фамилия'} value={this.state.lastName} />
                        </div>

                        <div className={'field'} >
                            <label>
                                Образование
                            </label>
                            <textarea type={'text'}
                                      style={{height: 110, minHeight: 10}}
                                      onChange={this.onEducationChange}
                                      placeholder={'Образование'} value={this.state.education} ></textarea>
                        </div>

                    </div>

                </div>

                <div style={this.componentStyle.aboutPlaceholder}>
                    <div className={'ui form'} >
                        <div className={'field'} >
                            <label>
                                О себе
                            </label>
                            <textarea type={'text'} onChange={this.onAboutChange}
                                      placeholder={'О себе'} value={this.state.about} ></textarea>
                        </div>
                    </div>
                </div>

                <div style={this.componentStyle.buttonsPlaceholder}>

                    <button className={'ui primary button'} style={{marginRight: 0}}
                            disabled={!canSubmit} onClick={this.onSubmit} >
                        <i className={'icon save'} ></i> Сохранить
                    </button>

                </div>

            </div>
        );
    }

});

module.exports = UpdateUserForm;