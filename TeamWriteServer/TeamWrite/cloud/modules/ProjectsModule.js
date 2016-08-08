/**
 * Created by sabir on 27.07.16.
 */

var ECR = require('cloud/helpers/ErrorCodesRegistry');
var CommonHelper = require('cloud/helpers/CommonHelper');
var UsersProjectsModule = require('cloud/modules/UsersProjectsModule');
var UsersModule = require('cloud/modules/UsersModule');
var PostsModule = require('cloud/modules/PostsModule');

var ProjectsModule = {

    transformProject: function(p){
        if (p == undefined){
            return undefined;
        }
        return {
            id: p.id,
            timestamp: (new Date(p.createdAt)).getTime(),
            creatorId: p.get('creatorId'),
            name: p.get('name'),
            description: p.get('description'),
            about: p.get('about'),
            avatar: p.get('avatar'),
            access: p.get('access'),
            status: p.get('status'),
            deleted: p.get('deleted'),
            tags: (p.get('tags') == undefined) ? [] : p.get('tags')
        }
    },

    loadAllProjects: function(callback){
        var q = new Parse.Query('Project');
        q.limit(1000);
        q.equalTo('deleted', false);
        q.addDescending('createdAt');
        var self = this;
        q.find(function(results){
            var arr = results.map(function(r){return self.transformProject(r)});
            callback(arr);
        });
    },

    loadUserProjects: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'userId is not defined'});
            return;
        }
        var userId = data.userId;
        var q = new Parse.Query('Project');
        q.limit(1000);
        q.equalTo('deleted', false);
        q.addDescending('createdAt');
        q.equalTo('creatorId', userId);
        var self = this;
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            var projects = results.map(function(r){return self.transformProject(r)});
            var ids = projects.map(function(r){return r.id});
            UsersProjectsModule.loadProjectsLinksMap(ids, function(map){
                for (var i in projects){
                    projects[i].links = map[projects[i].id];
                }
                success(projects);
            });

        });
    },

    loadProject: function(projectId, callback, shouldTransform){
        if (projectId == undefined){
            callback(undefined);
            return;
        }
        var q = new Parse.Query('Project');
        var self = this;
        q.get(projectId, {
            success: function(p){
                if (shouldTransform == true){
                    p = self.transformProject(p);
                }
                callback(p);
            }, error: function(){
                callback(undefined);
            }
        });
    },

    loadProjectAPISafe: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'id is not defined'});
            return;
        }
        var self = this;
        this.loadProject(data.id, function(p){
            UsersProjectsModule.loadProjectLinks(data.id, function(links){
                var usersIds = links.map(function(r){return r.userId});
                usersIds.push(p.creatorId);
                UsersModule.loadUsersMap(usersIds, function(usersMap){
                    p.creator = usersMap[p.creatorId];
                    var lnks = [];
                    for (var i in links){
                        var l = links[i];
                        l.user = usersMap[l.userId];
                        lnks.push(l);
                    }
                    p.links = lnks;
                    PostsModule.loadProjectPosts({projectId: p.id}, function(posts){
                        p.posts = posts;
                        success(p);
                    }, function(err){error(err)})

                }, function(err){
                    error(err);
                });
            }, true);
        }, true);
    },

    createProject: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.creatorId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'creatorId is not defined'});
            return;
        }
        if (data.name == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'name is not defined'});
            return;
        }
        if (data.description == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'description is not defined'});
            return;
        }

        var Project = Parse.Object.extend('Project');
        var p = new Project();
        p.set('creatorId', data.creatorId);
        p.set('name', data.name);
        p.set('description', data.description);
        p.set('deleted', false);
        p.set('status', 'new');

        if (data.avatar != undefined){
            p.set('avatar', data.avatar);
        }
        if (data.access != undefined){
            p.set('access', data.access);
        }
        if (data.tags != undefined){
            p.set('tags', data.tags);
        }
        if (data.about != undefined){
            p.set('about', data.about);
        }
        var self = this;
        p.save().then(function(savedProject){
            success(self.transformProject(savedProject));
        });
    },

    updateProject: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'id is not defined'});
            return;
        }
        var self = this;
        this.loadProject(data.id, function(p){
            if (p == undefined){
                error({code: ECR.UNKNOWN_ERROR, message: 'project is not found'});
                return;
            }
            for (var key in data){
                if (key == 'id'){
                    continue;
                }
                p.set(key, data[key]);
            }
            p.save().then(function(savedProject){
                success(self.transformProject(savedProject));
            });
        });
    },

    deleteProject: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'deleteProject: id is not defined'});
            return;
        }
        var self = this;
        this.loadProject(data.id, function(p){
            if (p == undefined){
                error({code: ECR.UNKNOWN_ERROR, message: 'project is not found'});
                return;
            }
            p.destroy({
                success: function(){
                    success();
                }
            });
        });
    }


};

module.exports = ProjectsModule;