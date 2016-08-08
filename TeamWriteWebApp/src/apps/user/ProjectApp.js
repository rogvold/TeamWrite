/**
 * Created by sabir on 27.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CoolPreloader = require('../../components/preloader/CoolPreloader');

var TeamWriteTemplate = require('../../components/templates/cool/TeamWriteTemplate');
var CoolTopTemplate = require('../../components/templates/cool/CoolTopTemplate');

var ProjectPanel = require('../../components/projects/panels/project/ProjectPanel');

var ProjectApp = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],

    getDefaultProps: function(){
        return {

        }
    },

    getInitialState: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('UsersStore');
        var loading = store.loading;
        var user = this.getFlux().store('UsersStore').getCurrentUser();
        return {
            loading: loading,
            user: user
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        }
    },

    getContent: function(){
        var user = this.state.user;
        var loading = this.state.loading;


        return (
            <div style={this.componentStyle.placeholder} >

                <div style={{marginTop: 0}} >
                    <ProjectPanel projectId={this.props.params.projectId} />
                </div>



            </div>
        );
    },

    render: function(){

        return (
            <div style={this.componentStyle.placeholder} >

                <CoolTopTemplate
                    content={this.getContent()}
                    />

            </div>
        );
    }

});

module.exports = ProjectApp;