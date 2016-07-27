/**
 * Created by sabir on 27.07.16.
 */

var Fluxxor = require('fluxxor');
var constants = require('../FluxConstants');

var ProjectsStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.loading = false;
        this.projectsMap = {};

        this.bindActions(
            constants.CREATE_PROJECT, this.startLoading,
            constants.CREATE_PROJECT_SUCCESS, this.createProjectSuccess,
            constants.CREATE_PROJECT_FAIL, this.stopLoading,

            constants.UPDATE_PROJECT, this.startLoading,
            constants.UPDATE_PROJECT_SUCCESS, this.updateProjectSuccess,
            constants.UPDATE_PROJECT_FAIL, this.stopLoading,

            constants.DELETE_PROJECT, this.startLoading,
            constants.DELETE_PROJECT_SUCCESS, this.deleteProjectSuccess,
            constants.DELETE_PROJECT_FAIL, this.stopLoading,

            constants.LOAD_PROJECTS, this.startLoading,
            constants.LOAD_PROJECTS_SUCCESS, this.loadProjectsSuccess,
            constants.LOAD_PROJECTS_FAIL, this.stopLoading

        );
    },

    startLoading: function(){
        this.loading = true;
        this.emit('change');
    },

    stopLoading: function(){
        this.loading = false;
        this.emit('change');
    },

    createProjectSuccess: function(payload){
        this.loading = false;
        var project = payload.project;
        this.projectsMap[project.id] = project;
        this.emit('change');
    },

    updateProjectSuccess: function(payload){
        this.loading = false;
        var project = payload.project;
        this.projectsMap[project.id] = project;
        this.emit('change');
    },

    deleteProjectSuccess: function(payload){
        this.loading = false;
        var data = payload.data;
        this.projectsMap[data.id] = undefined;
        this.emit('change');
    },

    loadProjectsSuccess: function(payload){
        this.loading = false;
        var projects = payload.projects;
        for (var i in projects){
            var p = projects[i];
            this.projectsMap[p.id] = p;
        }
        this.emit('change');
    },

    getProject: function(id){
        if (id == undefined){
            return undefined;
        }
        return this.projectsMap[id];
    },

    getUserProjects: function(userId){
        var map = this.projectsMap;
        var arr = [];
        if (userId == undefined){
            return [];
        }
        for (var key in map){
            var p = map[key];
            if (p.creatorId == userId){
                arr.push(p);
            }
        }
        arr.sort(function(a1, a2){
            return (a1.timestamp - a2.timestamp);
        });
        return arr;
    }

});

module.exports = ProjectsStore;