/**
 * Created by sabir on 03.08.16.
 */

var React = require('react');
var assign = require('object-assign');

var ProjectsList = require('./ProjectsList');

var SelectTagPanel = require('../tags/SelectTagPanel');

var FilterableProjectsList = React.createClass({
    getDefaultProps: function () {
        return {

            projects: []

        }
    },

    getInitialState: function () {
        return {
            selectedTagName: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        topPlaceholder: {

        },

        listPlaceholder: {

        }

    },

    onTagSelect: function(name){
        if (name == this.state.selectedTagName){
            this.setState({
                selectedTagName: undefined
            });
            return;
        }
        this.setState({
            selectedTagName: name
        });
    },

    getFilteredProjects: function(){
        var projects = this.props.projects;
        var arr = [];
        var selectedTagName = this.state.selectedTagName;
        if (selectedTagName == undefined || selectedTagName == ''){
            return projects;
        }
        for (var i in projects){
            var p = projects[i];
            var tags = p.tags;
            if (tags == undefined || tags.length == 0){
                continue;
            }
            if (tags[0] == selectedTagName){
                arr.push(p);
            }
        }
        return arr;
    },

    render: function () {
        var projects = this.getFilteredProjects();
        var projectsAreEmpty = (projects == undefined || projects.length == 0);

        return (
            <div style={this.componentStyle.placeholder}>

                <div style={this.componentStyle.topPlaceholder}>
                    <div style={{textAlign: 'center'}} >
                        <SelectTagPanel
                            onTagSelect={this.onTagSelect}
                            selectedName={this.state.selectedTagName}

                            />
                    </div>
                </div>

                {projectsAreEmpty == true ? null :
                    <div style={this.componentStyle.listPlaceholder}>
                        <ProjectsList projects={projects} />
                    </div>
                }

                {projectsAreEmpty == false ? null :
                    <div style={this.componentStyle.listPlaceholder}>
                        <div style={{textAlign: 'center', paddingTop: 15}} >
                            <img src={'assets/images/empty_result.png'} style={{display: 'inline-block', width: 300}} />
                        </div>
                    </div>
                }



            </div>
        );
    }

});

module.exports = FilterableProjectsList;