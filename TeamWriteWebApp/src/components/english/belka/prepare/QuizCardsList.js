/**
 * Created by sabir on 04.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var QuizCardPanel = require('./QuizCardPanel');

var QuizCardsList = React.createClass({
    getDefaultProps: function () {
        return {
            cards: [
                {
                    vimeoId: '177573285',
                    imgUrl: 'https://www.englishpatientdrive.pw/dropzone/uploads/dber56JswoSa3di0UIfy.jpg',
                    transcript: 'We need to build a wall',
                    comment: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона,'
                },
                {
                    vimeoId: '177573575',
                    imgUrl: 'https://www.englishpatientdrive.pw/dropzone/uploads/tYUWLRCGWQQUjVGWznsM.jpg',
                    transcript: "I'll be back",
                    comment: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона,'
                },
                {
                    vimeoId: '177573708',
                    imgUrl: 'https://www.englishpatientdrive.pw/dropzone/uploads/PJ1XA6eb8ld06cCg8Lns.jpg',
                    transcript: "It's a girl",
                    comment: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона,'
                },
                {
                    vimeoId: '177573819',
                    imgUrl: 'https://www.englishpatientdrive.pw/dropzone/uploads/5jAg2HBBsuojrwoLICb7.jpg',
                    transcript: 'I am your voice',
                    comment: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона,'
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

    },

    componentStyle: {
        placeholder: {

        },

        listPlaceholder: {

        },

        item: {
            marginBottom: 15,
            marginTop: 15
        }
    },

    render: function () {
        var list = this.props.cards;

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.listPlaceholder}>

                    {list.map(function(card, k){
                        var key = 'card_' + k;

                        return (
                            <div style={this.componentStyle.item} key={key} >
                                <QuizCardPanel transcript={card.transcript} comment={card.comment}
                                               vimeoId={card.vimeoId} imgUrl={card.imgUrl} />
                            </div>
                        );

                    }, this)}

                </div>

            </div>
        );
    }

});

module.exports = QuizCardsList;