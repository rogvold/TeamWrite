/**
 * Created by sabir on 04.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var ColoredAreasPanel = React.createClass({
    getDefaultProps: function () {
        return {

            areas: [{
                from: 0,
                to: 50,
                color: 'blue'
            },
                {
                    from: 50,
                    to: 60,
                    color: 'yellow'
                },
                {
                    from: 60,
                    to: 70,
                    color: 'pink'
                },
                {
                    from: 100,
                    to: 150,
                    color: 'red'
                },
                {
                    from: 120,
                    to: 140,
                    color: 'brown'
                },
                {
                    from: 140,
                    to: 200,
                    color: 'firebrick'
                }
            ],

            maxValue: 200,

            height: 250,
            width: 800

        }
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        item: {
            width: '100%',
            display: 'block'
        }

    },

    render: function () {
        var list = this.props.areas;
        list.reverse();

        return (
            <div style={this.componentStyle.placeholder}>

                {list.map(function(line, k){
                    var key = 'line_' + k;
                    var max = this.props.maxValue;
                    var height = this.props.height;
                    var q = 1.0 * height / max;
                    var h = (line.to - line.from) * q;
                    var st = assign({}, this.componentStyle.item, {backgroundColor: line.color, height: h});
                    return (
                        <div style={st} key={key} >

                        </div>
                    );

                }, this)}

            </div>
        );
    }

});

module.exports = ColoredAreasPanel;