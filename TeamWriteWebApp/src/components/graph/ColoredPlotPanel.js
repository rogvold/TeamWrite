/**
 * Created by sabir on 04.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var ColoredAreasPanel = require('./ColoredAreasPanel');

var TransparentLinePlot = require('./TransparentLinePlot');

var ColoredPlotPanel = React.createClass({
    getDefaultProps: function () {
        return {

            points: [],
            areas: []

        }
    },

    getInitialState: function () {
        return {

        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {
            width: 800,
            height: 300,
            position: 'relative'
        },

        ground: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1
        },

        floor: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            background: 'rgba(255, 255, 255, 0.49)'
        }

    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.ground}>
                    <ColoredAreasPanel maxValue={200}
                                       width={this.componentStyle.placeholder.width}
                                       height={this.componentStyle.placeholder.height} />
                </div>

                <div style={this.componentStyle.floor}>
                    <div style={{width: ''}} >
                        <TransparentLinePlot width={this.componentStyle.placeholder.width}
                                             height={this.componentStyle.placeholder.height} />
                    </div>
                </div>

            </div>
        );
    }

});

module.exports = ColoredPlotPanel;