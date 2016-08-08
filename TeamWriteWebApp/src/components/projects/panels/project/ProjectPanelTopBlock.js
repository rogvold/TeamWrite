/**
 * Created by sabir on 27.07.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var BackgroundImageContainer = require('../../../image/BackgroundImageContainer');

var ProjectPanelTopBlock = React.createClass({
    mixins: [FluxMixin],
    getDefaultProps: function(){
        return {
            projectId: undefined
        }
    },


    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {
            height: '100%',
            textAlign: 'center',
            width: '100%',
            position: 'relative'
        },

        floorLayer: {
            position: 'absolute',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 0
        },

        mainLayer: {
            position: 'absolute',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            background: 'rgba(46, 60, 84, 0.92)'
            //background: 'rgba(147, 149, 152, 0.92)'
        },

        contentPlaceholder: {

        },

        avatarPlaceholder: {
            marginTop: 20
        },

        namePlaceholder: {
            width: 600,
            margin: '0 auto',
            fontWeight: 'bold',
            color: 'white',
            opacity: 0.9,
            fontSize: 32,
            lineHeight: '40px',
            textAlign: 'center',
            marginTop: 10,
            textShadow: '0px 1px 1px rgba(0, 0, 0, 0.07)',
            fontFamily: '"futura-pt", Lato, "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif'
        },

        descriptionPlaceholder: {
            color: 'white',
            opacity: 0.8,
            fontSize: 24,
            lineHeight: '30px',
            textAlign: 'center',
            margin: '0 auto',
            marginTop: 15,
            width: 700
        },

        avatar: {
            margin: '0 auto',
            width: 108,
            height: 108,
            borderRadius: 8,
            border: '4px solid white'
        }
    },

    getProject: function(){
        var project = this.getFlux().store('ProjectsStore').getProject(this.props.projectId);
        return project;
    },

    render: function(){
        var p = this.getProject();
        if (p == undefined){
            return null;
        }

        return (
            <div style={this.componentStyle.placeholder} >
                <div style={this.componentStyle.floorLayer}>
                    <BackgroundImageContainer image={p.avatar} />
                </div>

                <div style={this.componentStyle.mainLayer}>

                    <div style={{width: '100%', height: '100%', position: 'relative'}} >

                        <div style={this.componentStyle.avatarPlaceholder}>

                            <div style={this.componentStyle.avatar}>
                                <BackgroundImageContainer style={{borderRadius: 3}} image={p.avatar} />
                            </div>

                        </div>

                        <div style={this.componentStyle.namePlaceholder}>
                            {p.name}
                        </div>

                        <div style={this.componentStyle.descriptionPlaceholder}>
                            {p.description}
                        </div>

                        <div style={this.componentStyle.bottomPlaceholder}>

                        </div>


                    </div>

                </div>
            </div>
        );
    }

});

module.exports = ProjectPanelTopBlock;