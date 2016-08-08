/**
 * Created by sabir on 03.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var Graphic = require('./Graphic');

var GraphicPanel = React.createClass({
    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {
            rotation: 0
        };
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function() {
        //requestAnimationFrame(this.tick);
        this.initTimer();
    },

    componentStyle: {
        placeholder: {
            width: 800,
            border: '1px solid lightgrey',
            padding: 10,
            backgroundColor: 'yellow'
        }
    },

    tick: function() {
        console.log('tick');
        this.setState({
            rotation: this.state.rotation + .01
        });
        //requestAnimationFrame(this.tick);
    },

    initTimer: function(){
        if (this.intervalId != undefined){
            return;
        }
        this.intervalId = setInterval(function(){
            this.tick();
        }.bind(this), 100);
    },

    componentWillUnmount: function(){
        if (this.intervalId != undefined){
            clearInterval(this.intervalId);
        }
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                shit
                <Graphic rotation={this.state.rotation} />

            </div>
        );
    }

});

module.exports = GraphicPanel;