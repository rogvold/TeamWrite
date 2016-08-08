/**
 * Created by sabir on 29.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../preloader/CoolPreloader');

var JoinProjectPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ProjectsStore')],
    getDefaultProps: function(){
        return {

            projectId: undefined,

            onAdded: function(){

            }

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ProjectsStore');
        var uStore = flux.store('UsersStore');
        var loading = store.loading || uStore.loading;
        return {
            loading: loading
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        },

        imagePlaceholder: {
            width: 340,
            margin: '0 auto',
            marginBottom: 15
            //display: 'none'
        },

        textPlaceholder: {
            lineHeight: '30px',
            fontSize: 20,
            opacity: 0.8,
            textAlign: 'center',
            marginBottom: 25
            //display: 'none'
        },

        buttonPlaceholder: {
            textAlign: 'center',
            marginTop: 10
            //padding: 10
        }

    },

    onReasonChange: function(evt){
        this.setState({
            reason: evt.target.value
        });
    },

    onSubmit: function(){
        this.getFlux().actions.joinToProject(this.props.projectId, this.state.reason, function(){
            this.props.onAdded();
        }.bind(this));
    },

    render: function(){

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.imagePlaceholder}>
                    <img src={'assets/images/rocket.jpg'} style={{width: '100%'}} />
                </div>

                <div style={this.componentStyle.textPlaceholder}>
                    Почему вы решили стать соавтором?
                    <br/>
                    Напишите сообщение для создателя проекта.
                </div>

                <div className={'ui form'} >

                    <textarea value={this.state.reason} autoFocus={true} style={{height: '8em'}}
                        placeholder={'Сообщение автору'} onChange={this.onReasonChange}
                        ></textarea>

                </div>

                <div style={this.componentStyle.buttonPlaceholder}>
                    <button className={'ui button fluid patientPrimary'}
                            style={{marginRight: 0}}
                            onClick={this.onSubmit}
                        >
                        <i className={'icon checkmark'} ></i>
                        Подать заявку!
                    </button>
                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = JoinProjectPanel;