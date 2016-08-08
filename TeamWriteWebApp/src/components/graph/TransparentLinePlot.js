/**
 * Created by sabir on 04.08.16.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var assign = require('object-assign');

var TransparentLinePlot = React.createClass({
    getDefaultProps: function () {
        return {
            width: 800,
            height: 300,

            maxValue: 220,

            points: [{
                x: 0,
                y: 0
            }, {
                x: 100,
                y: 50
            }, {
                x: 244,
                y: 156
            },
                {
                    x: 280,
                    y: 166
                },
                {
                    x: 300,
                    y: 200
                },
                {
                    x: 350,
                    y: 220
                }
            ]

        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {
        var x = ReactDOM.findDOMNode(this.refs.canva);
        var context = x.getContext('2d');
        this.paint(context);
    },

    componentDidUpdate: function() {
        var x = ReactDOM.findDOMNode(this.refs.canva);
        var context = x.getContext('2d');
        context.clearRect(0, 0, this.props.width, this.props.height);
        this.paint(context);
    },

    componentStyle: {
        placeholder: {
            width: '100%',
            height: '100%'
        }
    },

    paint: function(context) {
        context.save();
        context.globalCompositeOperation = "xor";
        context = this.drawBackground(context);
        context = this.drawPoints(context);
        context.restore();
    },

    drawBackground: function(context){
        context.fillStyle = 'rgba(255, 255, 255, 0.9)';
        context.fillRect(0, 0, this.props.width, this.props.height);
        return context;
    },

    drawPoints: function(ctx){
        var points = this.getTransformedPoints();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;

        for (var i in points){
            var p = points[i];
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
        return ctx;
    },

    getTransformedPoints: function(){
        var points = this.props.points;
        if (points == undefined || points.length < 2){
            return [];
        }
        var x0 = points[0].x;
        var wq = 1.0 * this.props.width / ( points[points.length - 1].x - points[0].x ) ;
        var hq = 1.0 * this.props.height / ( points[points.length - 1].y - points[0].y );
        var arr = [];
        for (var i in points){
            var p = points[i];
            arr.push({
                x: Math.max((p.x - x0) * wq, 0),
                y: Math.max((this.props.maxValue - p.y) * hq, 0)
            });
        }
        return arr;
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>
                <canvas width={this.props.width} height={this.props.height} ref={'canva'} />
            </div>
        );
    }

});

module.exports = TransparentLinePlot;