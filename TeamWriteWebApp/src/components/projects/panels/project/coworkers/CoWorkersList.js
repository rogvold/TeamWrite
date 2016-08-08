/**
 * Created by sabir on 29.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var CoWorkersItem = require('./CoWorkersItem');

var CoWorkersList = React.createClass({
    getDefaultProps: function () {
        return {
            links: [],

            onLinkClick: function(link){

            }

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
            verticalAlign: 'top',
            display: 'inline-block',
            margin: 5,
            padding: 5,
            borderRadius: 5,
            border: '1px solid rgb(239, 240, 241)'
            //cursor: 'pointer'
        },

        listPlaceholder: {

        }

    },

    onItemClick: function(link){
        this.props.onLinkClick(link);
    },

    render: function () {
        var list = this.props.links;
        if (list == undefined){
            list = [];
        }
        list.sort(function(a1, a2){
            return (a1.timestamp - a2.timestamp);
        });

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>

                    {list.map(function(link, k){
                        var key = 'link_' + k + '_' + link.id;
                        var onClick = this.onItemClick.bind(this, link);
                        var st = assign({}, this.componentStyle.item);
                        if (k == 0){
                            st = assign({}, st, {marginLeft: 0});
                        }

                        return (
                            <div style={st} key={key} onClick={onClick} >
                                <CoWorkersItem link={link} />
                            </div>
                        );

                    }, this)}

                </div>

            </div>
        );
    }

});

module.exports = CoWorkersList;