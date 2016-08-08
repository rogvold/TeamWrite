/**
 * Created by sabir on 22.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var BackgroundImageContainer = React.createClass({
    getDefaultProps: function () {
        return {
            //image: undefined,
            image: 'https://www.englishpatientdrive.pw/dropzone/uploads/5b7RIQs8ETFfqOwAyb9G.jpg',
            //image: 'http://www.englishpatient.org/app/assets/images/new_course.png',
            //image: 'https://avatars2.githubusercontent.com/u/1834389?v=3&s=460',

            style: {

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
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
        }
    },

    render: function () {
        var st = assign({}, this.componentStyle.placeholder, {backgroundImage: 'url(\'' + this.props.image + '\')'});
        st = assign({}, st, this.props.style);

        return (
            <div style={st}>

            </div>
        );
    }

});

module.exports = BackgroundImageContainer;