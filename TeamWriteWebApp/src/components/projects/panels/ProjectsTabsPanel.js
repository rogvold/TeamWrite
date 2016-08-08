/**
 * Created by sabir on 27.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var UserProjectsPanel = require('./UserProjectsPanel');
var AllProjectsPanel = require('./AllProjectsPanel');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var ProjectsTabsPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore', 'ProjectsStore')],
    getDefaultProps: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ProjectsStore');
        var uStore = flux.store('UsersStore');
        var loading = store.loading || uStore.loading;
        return {
            loading: loading,
            currentUser: uStore.getCurrentUser()
        }
    },

    getInitialState: function(){
        return {
            mode: 'new'
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        },

        tabsPlaceholder: {
            width: 800,
            margin: '0 auto',
            marginTop: 15,
            //marginBottom: 35,
            marginBottom: 15,
            textAlign: 'center'
        },

        contentPlaceholder: {

        },

        tab: {
            cursor: 'pointer',
            marginLeft: 20,
            marginRight: 20,
            padding: 10,
            borderRadius: 4,
            display: 'inline-block',
            verticalAlign: 'top',
            fontWeight: 'bold'
            //opacity: 0.8
        },

        active: {
            //backgroundColor: 'rgb(255, 159, 54)',
            backgroundColor: '#5199FC',
            color: 'white'
        }

    },


    render: function(){
        var mode = this.state.mode;
        var isLoggedIn = (this.state.currentUser != undefined);

        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.tabsPlaceholder}>

                    {isLoggedIn == false ? null :
                        <div
                            style={assign({}, this.componentStyle.tab, (mode == 'new' ? this.componentStyle.active : {}) )}
                            onClick={this.setState.bind(this, {mode: 'new'})}>
                            <span style={{opacity: 0.9}}>
                                <i className={'icon wait'}></i>
                                НОВЫЕ ПРОЕКТЫ
                            </span>
                        </div>
                    }

                    {isLoggedIn == false ? null :
                        <div style={assign({}, this.componentStyle.tab, (mode == 'my' ? this.componentStyle.active : {}) )} onClick={this.setState.bind(this, {mode: 'my'})} >
                            <span style={{opacity: 0.9}} >
                                <i className={'icon heart'} ></i>
                                МОИ ПРОЕКТЫ
                            </span>
                        </div>
                    }

                </div>

                <div style={this.componentStyle.contentPlaceholder}>

                    {mode != 'my' ? null :
                        <div>
                            <UserProjectsPanel />
                        </div>
                    }

                    {mode != 'new' ? null :
                        <div>
                            <AllProjectsPanel />
                        </div>
                    }

                    {mode != 'popular' ? null :
                        <div>
                            популярныe проекты
                        </div>
                    }

                </div>

            </div>
        );
    }

});

module.exports = ProjectsTabsPanel;