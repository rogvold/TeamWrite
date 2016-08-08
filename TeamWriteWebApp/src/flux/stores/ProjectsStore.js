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
        this.postsMap = {};

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
            constants.LOAD_PROJECTS_FAIL, this.stopLoading,

            constants.LOAD_PROJECT, this.startLoading,
            constants.LOAD_PROJECT_SUCCESS, this.loadProjectSuccess,
            constants.LOAD_PROJECT_FAIL, this.stopLoading,

            constants.JOIN_PROJECT, this.startLoading,
            constants.JOIN_PROJECT_SUCCESS, this.joinProjectSuccess,
            constants.JOIN_PROJECT_FAIL, this.stopLoading,

            constants.LEAVE_PROJECT, this.startLoading,
            constants.LEAVE_PROJECT_SUCCESS, this.leaveProjectSuccess,
            constants.LEAVE_PROJECT_FAIL, this.stopLoading,

            constants.CREATE_POST, this.startLoading,
            constants.CREATE_POST_SUCCESS, this.createPostSuccess,
            constants.CREATE_POST_FAIL, this.stopLoading,

            constants.UPDATE_POST, this.startLoading,
            constants.UPDATE_POST_SUCCESS, this.updatePostSuccess,
            constants.UPDATE_POST_FAIL, this.stopLoading,

            constants.DELETE_POST, this.startLoading,
            constants.DELETE_POST_SUCCESS, this.deletePostSuccess,
            constants.DELETE_POST_FAIL, this.stopLoading


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

    loadProjectSuccess: function(payload){
        this.loading = false;
        var project = payload.project;
        this.projectsMap[project.id] = project;
        if (project.posts != undefined){
            this.consumePosts(project.posts);
        }
        this.emit('change');
    },

    loadProjectsSuccess: function(payload){
        this.loading = false;
        var projects = payload.projects;
        for (var i in projects){
            var p = projects[i];
            this.projectsMap[p.id] = p;
            if (p.posts != undefined){
                this.consumePosts(p.posts);
            }
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
            if (p == undefined){
                continue;
            }
            if (p.creatorId == userId){
                arr.push(p);
            }
        }
        arr.sort(function(a1, a2){
            return (a2.timestamp - a1.timestamp);
        });
        return arr;
    },

    getCurrentUser: function(userId){
        var store = this.flux.store('UsersStore');
        return store.getCurrentUser();
    },

    joinProjectSuccess: function(payload){
        this.loading = false;
        var projectId = payload.projectId;
        var link = payload.link;
        var user = this.getCurrentUser();
        link.user = user;
        var p = this.projectsMap[projectId];
        var links = (p.links == undefined) ? [] : p.links;
        links.push(link);
        this.projectsMap[projectId].links = links;
        console.log('joinProjectSuccess: so projectsMap is ', this.projectsMap);
        this.emit('change');
    },

    leaveProjectSuccess: function(payload){
        this.loading = false;
        var projectId = payload.projectId;
        var userId = payload.userId;
        var links = this.projectsMap[projectId].links;
        if (links == undefined){
            links = [];
        }
        var arr = [];
        for (var i in links){
            if (links[i].userId == userId){
                continue;
            }
            arr.push(links[i]);
        }
        this.projectsMap[projectId].links = arr;
        this.emit('change');
    },

    getAllProjects: function(){
        var map = this.projectsMap;
        var arr = [];
        for (var key in map){
            var p = map[key];
            if (p == undefined){
                continue;
            }
            arr.push(p);
        }
        arr.sort(function(a1, a2){
            return (a2.timestamp - a1.timestamp);
        });
        return arr;
    },

    isUserInProject: function(projectId, userId){
        console.log('isUserInProject: projectId, userId = ', projectId, userId);
        var p = this.projectsMap[projectId];
        var links = (p.links == undefined) ? [] : p.links;
        var f = false;
        for (var i in links){
            var uId = links[i].userId;
            if (uId == userId){
                f = true;
            }
        }
        console.log('returning ' + f);
        return f;
    },

    consumePosts: function(posts){
        for (var i in posts){
            this.postsMap[posts[i].id] = posts[i];
        }
    },

    createPostSuccess: function(payload){
        this.loading = false;
        this.consumePosts([payload.post]);
        this.emit('change');
    },

    updatePostSuccess: function(payload){
        this.loading = false;
        this.consumePosts([payload.post]);
        this.emit('change');
    },

    deletePostSuccess: function(payload){
        this.loading = false;
        this.postsMap[payload.id] = undefined;
        this.emit('change');
    },

    getProjectPosts: function(projectId){
        var arr = [];
        var map = this.postsMap;
        for (var key in map){
            var p = map[key];
            if (p.projectId == projectId){
                arr.push(p);
            }
        }
        arr.sort(function(a, b){
            return (a.timestamp - b.timestamp);
        });
        return arr;
    },

    getPost: function(postId){
        if (postId == undefined){
            return undefined;
        }
        return this.postsMap[postId];
    }

});

module.exports = ProjectsStore;