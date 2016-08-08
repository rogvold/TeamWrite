/**
 * Created by sabir on 27.07.16.
 */

var constants = require('../FluxConstants');
var ParseAPI = require('../../api/ParseAPI');

var ProjectsActions = {

    createProject: function(data, callback){
        if (data == undefined){
            return;
        }
        this.dispatch(constants.CREATE_PROJECT, {data: data});
        ParseAPI.runCloudFunction("createProject", data, function(project){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.CREATE_PROJECT_SUCCESS, {project: project});
        }.bind(this), function(err){
            this.dispatch(constants.CREATE_PROJECT_FAIL, {error: err});
        }.bind(this));
    },

    updateProject: function(data, callback){
        if (data == undefined){
            return;
        }
        this.dispatch(constants.UPDATE_PROJECT, {data: data});
        ParseAPI.runCloudFunction("updateProject", data, function(project){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
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
        ParseAPI.runCloudFunction("deleteProject", {id: projectId}, function(){
            this.dispatch(constants.DELETE_PROJECT_SUCCESS, {id: projectId});
        }.bind(this), function(err){
            this.dispatch(constants.DELETE_PROJECT_FAIL, {id: projectId, error: err});
        }.bind(this));
    },

    loadProject: function(projectId){
        if (projectId == undefined){
            return;
        }
        this.dispatch(constants.LOAD_PROJECT, {});
        ParseAPI.runCloudFunction("loadProject", {id: projectId}, function(project){
            var users = [];
            var links = (project.links == undefined) ? [] : project.links;
            users = users.concat(links.map(function(r){return r.user}));
            users.push(project.creator);
            this.flux.store('UsersStore').silentlyConsumeUsers(users);
            this.dispatch(constants.LOAD_PROJECT_SUCCESS, {project: project});
        }.bind(this), function(err){
            this.dispatch(constants.LOAD_PROJECT_FAIL, {error: err});
        }.bind(this));
    },

    loadAllProjects: function(callback){
        this.dispatch(constants.LOAD_PROJECTS, {});
        ParseAPI.runCloudFunction("loadAllProjects", {}, function(projects){
            setTimeout(function(){
                this.flux.actions.loadUsersByIds(projects.map(function(p){return p.creatorId}));
            }.bind(this), 10);
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
            var users = [];
            for (var i in projects){
                var links = (projects[i].links == undefined) ? [] : projects[i].links;
                users = users.concat(links.map(function(r){return r.user}));
            }
            this.flux.store('UsersStore').silentlyConsumeUsers(users);
            this.dispatch(constants.LOAD_PROJECTS_SUCCESS, {projects: projects});
        }.bind(this), function(err){
            this.dispatch(constants.LOAD_PROJECTS_FAIL, {error: err});
        }.bind(this));
    },

    joinToProject: function(projectId, reason, callback){
        var user = this.flux.store('UsersStore').getCurrentUser();
        if (user == undefined || projectId == undefined){
            return;
        }
        this.dispatch(constants.JOIN_PROJECT, {projectId: projectId});
        ParseAPI.runCloudFunction("joinToProject", {userId: user.id, projectId: projectId, reason: reason}, function(link){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.JOIN_PROJECT_SUCCESS, {userId: user.id, projectId: projectId, link: link});
        }.bind(this), function(err){
            this.dispatch(constants.JOIN_PROJECT_FAIL, {error: err});
        }.bind(this));
    },

    leaveProject: function(projectId, callback){
        var user = this.flux.store('UsersStore').getCurrentUser();
        if (user == undefined || projectId == undefined){
            return;
        }
        this.dispatch(constants.LEAVE_PROJECT, {projectId: projectId});
        ParseAPI.runCloudFunction("leaveProject", {userId: user.id, projectId: projectId}, function(link){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.LEAVE_PROJECT_SUCCESS, {userId: user.id, projectId: projectId});
        }.bind(this), function(err){
            this.dispatch(constants.LEAVE_PROJECT_FAIL, {error: err});
        }.bind(this));
    }

};

module.exports = ProjectsActions;