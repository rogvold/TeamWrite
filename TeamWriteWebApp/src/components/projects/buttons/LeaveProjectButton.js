/**
 * Created by sabir on 29.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var LeaveProjectButton = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ProjectsStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ProjectsStore');
        var uStore = flux.store('UsersStore');
        return {
            loading: store.loading,
            currentUser: store.getCurrentUser()
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
            display: 'inline-block',
            position: 'relative'
        }
    },

    onClick: function(){
        this.getFlux().actions.leaveProject(this.props.projectId);
    },

    render: function(){

        return (
            <div style={this.componentStyle.placeholder} >

                <button disabled={this.state.loading}
                    className={'ui inverted red circular button'} onClick={this.onClick}  >

                    {this.state.loading == false ?
                        <span>
                            <i className={'icon remove'} ></i> Выйти из проекта
                        </span> :
                        <span>
                            <i className={'icon mixcloud'} ></i> выходим...
                        </span>
                    }

                </button>

            </div>
        );
    }

});

module.exports = LeaveProjectButton;