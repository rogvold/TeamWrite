/**
 * Created by sabir on 03.08.16.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var assign = require('object-assign');

var Graphic = React.createClass({
    getDefaultProps: function () {
        return {
            rotation: 0
        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentStyle: {
        placeholder: {}
    },

    componentDidMount: function() {
        //var dom = React.findDOMNode(this);
        //var context = dom.getContext('2d');
        //var context = this.refs.canva.getContext('2d');
        //var context = this.getDOMNode().getContext('2d');

        var x = ReactDOM.findDOMNode(this.refs.canva);
        var context = x.getContext('2d');


        this.paint(context);
    },

    componentDidUpdate: function() {
        //var dom = React.findDOMNode(this);

        //var context = this.getDOMNode().getContext('2d');
        //var context = dom.getContext('2d');
        //var context = this.refs.canva.getContext('2d');

        var x = ReactDOM.findDOMNode(this.refs.canva);
        var context = x.getContext('2d');

        context.clearRect(0, 0, 200, 200);
        this.paint(context);
    },



    paint: function(context) {
        context.globalCompositeOperation = "xor";

        context.save();

        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.fillRect(0, 0, 200, 200);

        context.translate(100, 100);
        context.rotate(this.props.rotation, 100, 100);
        //context.fillStyle = '#F00';
        //context.fillStyle = 'transparent';
        context.fillStyle = 'rgba(255, 0, 0, 0.5)';

        context.fillRect(-50, -50, 100, 100);
        context.restore();
    },

    render: function () {



        return (
            <div>
                <canvas width={200} height={200} ref={'canva'} />
            </div>
        );
    }

});

module.exports = Graphic;