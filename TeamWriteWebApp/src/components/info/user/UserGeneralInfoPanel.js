/**
 * Created by sabir on 30.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');
var moment = require('moment');

var UserGeneralInfoPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ProjectsStore', 'UsersStore')],
    getDefaultProps: function(){
        return {
            userId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ProjectsStore');
        var uStore = flux.store('UsersStore');
        var loading = store.loading || uStore.loading;
        var user = uStore.getUser(this.props.userId);

        return {
            loading: loading,
            user: user
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

        sectionName: {
            fontWeight: 'bold',
            fontSize: 16,
            lineHeight: '26px'
        },

        sectionContent: {
            fontSize: 14,
            lineHeight: '24px',
            opacity: 0.8
        }

    },

    render: function(){
        var user = this.state.user;
        if (user == undefined){
            return null;
        }
        var avatar = user.avatar;
        if (avatar == undefined){
            avatar = 'assets/images/noavatar.jpeg';
        }

        return (
            <div style={this.componentStyle.placeholder} >

                {user.about == undefined || user.about.trim() == '' ? null :
                    <div style={{borderBottom: 25}}>
                        <div style={this.componentStyle.sectionName}>
                            О себе
                        </div>

                        <div style={this.componentStyle.sectionContent}>
                            {user.about}
                        </div>
                    </div>
                }

                {user.education == undefined || user.education.trim() == '' ? null :
                    <div>
                        <div style={this.componentStyle.sectionName}>
                            Образование
                        </div>

                        <div style={this.componentStyle.sectionContent}>
                            {user.education}
                        </div>
                    </div>
                }

            </div>
        );
    }

});

module.exports = UserGeneralInfoPanel;