/**
 * Created by sabir on 04.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var BackgroundImageContainer = require('../../../image/BackgroundImageContainer');

var QuizCardPanel = React.createClass({
    getDefaultProps: function () {
        return {
            vimeoId: '91673504',

            imgUrl: 'https://www.pf-roio.de/roio/roio-covers-small/echoes.jpg',
            transcript: 'Overhead the albatross hangs motionless upon the air',

            comment: '',

            autoplay: false


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
            width: 862,
            margin: '0 auto',
            minHeight: 470,
            padding: 10,
            backgroundColor: 'white',
            border: '1px solid #EFF0F1',
            borderRadius: 4
        },

        left: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 470,
            textAlign: 'center',
            padding: 10,
            paddingTop: 0,
            paddingLeft: 0,
            height: '100%'
        },

        right: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 370,
            height: '100%'
        },

        playerPlaceholder: {
            width: 460,
            height: 260,
            margin: '0 auto'
        },

        imagePlaceholder: {
            width: 360,
            height: 260
        },

        transcriptPlaceholder: {
            textAlign: 'center',
            padding: 10,
            paddingTop: 0,
            lineHeight: '42px',
            fontSize: 26,
            marginTop: 15
        },

        commentPlaceholder: {
            textAlign: 'center',
            padding: 10,
            paddingTop: 0,
            lineHeight: '36px',
            fontSize: 24,
            marginBottom: 15,
            opacity: 0.6,
            color: 'white'
        },

        topPlaceholder: {
            width: '100%'
        },

        bottomPlaceholder: {
            width: '100%'
        }

    },

    getPlayer: function(){
        var url = 'https://player.vimeo.com/video/' + this.props.vimeoId + '?title=0&byline=0&portrait=0';
        if (this.props.autoplay == true){
            url = url + '&autoplay=1';
        }

        return (
            <div>
                <iframe src={url} width="450" height="320" frameborder="0" style={{border: 'none'}}
                        webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </div>
        );
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>



                <div style={this.componentStyle.left}>
                    <div style={this.componentStyle.playerPlaceholder}>
                        {this.getPlayer()}
                    </div>
                </div>

                <div style={this.componentStyle.right}>

                    <div style={this.componentStyle.imagePlaceholder}>
                        <BackgroundImageContainer image={this.props.imgUrl} />
                    </div>


                    <div style={this.componentStyle.transcriptPlaceholder}>
                        {this.props.transcript}
                    </div>

                </div>


            </div>
        );
    }

});

module.exports = QuizCardPanel;