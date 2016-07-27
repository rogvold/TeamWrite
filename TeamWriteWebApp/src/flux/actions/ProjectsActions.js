/**
 * Created by sabir on 27.07.16.
 */

var constants = require('../FluxConstants');
var ParseAPI = require('../../api/ParseAPI');

var ProjectsActions = {

    createProject: function(data){
        if (data == undefined){
            return;
        }
        this.dispatch(constants.CREATE_PROJECT, {data: data});
        ParseAPI.runCloudFunction("createProject", {}, function(project){
            this.dispatch(constants.CREATE_PROJECT_SUCCESS, {project: project});
        }.bind(this), function(err){
            this.dispatch(constants.CREATE_PROJECT_FAIL, {error: err});
        }.bind(this));
    },

    updateProject: function(data){
        if (data == undefined){
            return;
        }
        this.dispatch(constants.UPDATE_PROJECT, {data: data});
        ParseAPI.runCloudFunction("updateProject", {}, function(project){
            this.dispatch(constants.UPDATE_PROJECT_SUCCESS, {project: project});
        }.bind(this), function(err){
            this.dispatch(constants.UPDATE_PROJECT_FAIL, {error: err});
        }.bind(this));
    },

    deleteProject: function(projectId){
        if (projectId == undefined){
            return;
        }
        this.dispatch(constants.DELETE_PROJECT, {id: projectId});
        ParseAPI.runCloudFunction("deleteProject", {}, function(){
            this.dispatch(constants.DELETE_PROJECT_SUCCESS, {id: projectId});
        }.bind(this), function(err){
            this.dispatch(constants.DELETE_PROJECT_FAIL, {id: projectId, error: err});
        }.bind(this));
    },

    loadAllProjects: function(callback){
        this.dispatch(constants.LOAD_PROJECTS, {});
        ParseAPI.runCloudFunction("loadAllProjects", {}, function(projects){
            this.dispatch(constants.LOAD_PROJECTS_SUCCESS, {projects: projects});
        }.bind(this), function(err){
            this.dispatch(constants.LOAD_PROJECTS_FAIL, {error: err});
        }.bind(this));
    },

    loadUserProjects: function(userId, callback){
        if (userId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_PROJECTS, {});
        ParseAPI.runCloudFunction("loadUserProjects", {userId: userId}, function(projects){
            this.dispatch(constants.LOAD_PROJECTS_SUCCESS, {projects: projects});
        }.bind(this), function(err){
            this.dispatch(constants.LOAD_PROJECTS_FAIL, {error: err});
        }.bind(this));

    }

};

module.exports = ProjectsActions;