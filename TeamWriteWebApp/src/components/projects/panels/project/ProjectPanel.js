/**
 * Created by sabir on 27.07.16.
 */


var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BackgroundImageContainer = require('../../../image/BackgroundImageContainer');

var ProjectPanelTopBlock = require('./ProjectPanelTopBlock');
var ProjectInfoThinPanel = require('./ProjectInfoThinPanel');

var CoWorkersList = require('./coworkers/CoWorkersList');

var CommentsPanel = require('../../../comments/panels/CommentsPanel');

var CreatePostButton = require('../../../posts/buttons/CreatePostButton');

var ProjectPostsPanel = require('../../../posts/panels/ProjectPostsPanel');

var CoolPreloader = require('../../../preloader/CoolPreloader');

var ProjectPanel = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('ProjectsStore', 'UsersStore')],
    getDefaultProps: function(){
        return {
            projectId: undefined
        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('ProjectsStore');
        var uStore = flux.store('UsersStore');
        var loading = store.loading || uStore.loading;
        var project = store.getProject(this.props.projectId);
        var user = (project == undefined) ? undefined : uStore.getUser(project.creatorId);
        var links = (project == undefined || project.links == undefined) ? [] : project.links;

        return {
            loading: loading,
            project: project,
            user: user,
            links: links
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){
        console.log('--->>>   ProjectPanel: componentDidMount occured!');
        this.getFlux().actions.loadProject(this.props.projectId);
    },

    componentStyle: {
        placeholder: {
            position: 'relative',
            minHeight: 300,
            width: 800,
            margin: '0 auto',
            backgroundColor: 'white',
            borderLeft: 'solid 1px #EAEEF0',
            borderRight: 'solid 1px #EAEEF0'
        },

        topPlaceholder: {
            height: 320,
            textAlign: 'center',
            width: '100%',
            position: 'relative'
        },

        contentPlaceholder: {
            padding: 20
        },

        authorInfoPlaceholder: {

        },

        aboutPlaceholder: {
            lineHeight: '26px',
            fontSize: 16,
            opacity: 0.8
        },

        statusPlaceholder: {
            marginTop: 25
        },

        coWorkersPlaceholder: {
            marginTop: 25
        },

        sectionName: {
            fontWeight: 'bold',
            marginBottom: 15,
            fontSize: 20,
            lineHeight: '30px'
        }

    },

    render: function(){
        var p = this.state.project;
        var user = this.state.user;
        var links = this.state.links;

        if (p == undefined){
            return null;
        }

        return (
            <div style={this.componentStyle.placeholder} >


                <div style={this.componentStyle.topPlaceholder}>

                    <ProjectPanelTopBlock projectId={p.id} />

                </div>

                {user == undefined ? null :
                    <div style={this.componentStyle.authorInfoPlaceholder}>
                        <ProjectInfoThinPanel projectId={p.id} />
                    </div>
                }


                <div style={this.componentStyle.contentPlaceholder}>

                    {p.about == undefined || p.about.trim() == '' ? null :
                        <div>
                            <div style={this.componentStyle.sectionName} >
                                О проекте
                            </div>
                            <div style={this.componentStyle.aboutPlaceholder}>
                                <div dangerouslySetInnerHTML={{__html: p.about.replace(/\n/g, '<br/>')}} ></div>
                            </div>
                        </div>
                    }

                    <div style={this.componentStyle.coWorkersPlaceholder}>
                        <div style={this.componentStyle.sectionName} >
                            Соавторы
                        </div>

                        <div>
                            <CoWorkersList links={links} />
                        </div>

                    </div>


                </div>


                <div style={this.componentStyle.contentPlaceholder}>
                    <div style={this.componentStyle.sectionName} >
                        Совместное творчество
                    </div>

                    <div>
                        <ProjectPostsPanel projectId={this.props.projectId} />
                    </div>

                </div>

                {this.state.loading == false ? null :
                    <CoolPreloader />
                }

            </div>
        );
    }

});

module.exports = ProjectPanel;