/**
 * Created by sabir on 08.07.16.
 */
var React = require('react');
var assign = require('object-assign');
var ReactDOM = require('react-dom');


/*
 FLUX
 */
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
// stores
var UsersStore = require('../flux/stores/UsersStore');
// actions
var UsersActions = require('../flux/actions/UsersActions');

//api
var UserAPI = require('../api/UserAPI');

var DraftPanel = require('../components/editor/DraftPanel');

var EditPostForm = require('../components/posts/forms/EditPostForm');

var GraphicPanel = require('../components/graph/GraphicPanel');
var TransparentLinePlot = require('../components/graph/TransparentLinePlot');
var ColoredPlotPanel = require('../components/graph/ColoredPlotPanel');

var QuizCardsList = require('../components/english/belka/prepare/QuizCardsList');

var CoolTopTemplate = require('../components/templates/cool/CoolTopTemplate');

var DevApp = React.createClass({
    mixins: [FluxMixin],

    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentStyle: {
        placeholder: {

        }
    },


    render: function(){

        return (
            <div>

                <CoolTopTemplate />

            </div>
        );
    }

});

module.exports = DevApp;