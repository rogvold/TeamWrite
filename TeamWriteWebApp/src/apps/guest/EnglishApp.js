/**
 * Created by sabir on 03.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var UserAPI = require('../../api/UserAPI')

var CommonHelper = require('../../helpers/CommonHelper');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var EnglishApp = React.createClass({
    mixins: [FluxMixin],
    getDefaultProps: function () {
        return {
            onLogin: function(){

            }
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        document.title = 'TeamWrite';
    },

    componentStyle: {
        placeholder: {

        },

        topBlock: {
            margin: '0 auto',
            marginTop: 20,
            marginBottom: 20,
            width: 300,
            textAlign: 'center'
        },

        logo: {
            width: 130
        }

    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>



            </div>
        );
    }

});

module.exports = EnglishApp;