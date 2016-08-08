/**
 * Created by sabir on 02.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var CoavtorHelper = require('../../../helpers/CoavtorHelper');

var SelectTagPanel = React.createClass({
    getDefaultProps: function () {
        return {
            selectedName: undefined,

            icon: 'icon tag',

            onTagSelect: function(name){

            }

        }
    },

    getInitialState: function () {
        return {
            selectedName: this.props.selectedName
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            selectedName: nextProps.selectedName
        });
    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        listPlaceholder: {

        },

        item: {
            display: 'inline-block',
            verticalAlign: 'top',
            margin: 3,
            lineHeight: '26px',
            fontSize: 16,
            textAlign: 'center',
            padding: 5,
            paddingLeft: 13,
            paddingRight: 13
        },

        active: {
            color: 'white !important',
            backgroundColor: '#2E3C54 !important',
            fontWeight: 'bold',
            textAlign: 'center'
        }

    },

    onItemClick: function(item){
        this.props.onTagSelect(item.name);
        this.setState({
            selectedName: item.name
        });
    },

    render: function () {
        var list = CoavtorHelper.getTagsList();

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>

                    {list.map(function(item, k){
                        var key = 'tag_' + item.name;
                        var st = assign({}, this.componentStyle.item);
                        if (k == 0){
                            st = assign({}, st, {marginLeft: 0});
                        }
                        var className = 'ui circular mini button ';
                        var onClick = this.onItemClick.bind(this, item);
                        if (this.state.selectedName == item.name){
                            className += ' patientPrimary ';
                        }else {
                            className += ' basic';
                        }

                        return (
                            <div style={st} key={key}
                                 onClick={onClick} className={className} >
                                {this.props.icon === undefined || this.props.icon.trim() == '' ? null :
                                    <i className={this.props.icon} ></i>
                                }
                                {item.displayName}
                            </div>
                        );
                    }, this)}

                </div>

            </div>
        );
    }

});

module.exports = SelectTagPanel;