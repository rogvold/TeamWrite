/**
 * Created by sabir on 27.07.16.
 */

var ECR = require('cloud/helpers/ErrorCodesRegistry');
var CommonHelper = require('cloud/helpers/CommonHelper');

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
            avatar: p.get('avatar'),
            access: p.get('access'),
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
            var arr = results.map(function(r){return self.transformProject(r)});
            success(arr);
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
        if (data.avatar != undefined){
            p.set('avatar', data.avatar);
        }
        if (data.access != undefined){
            p.set('access', data.access);
        }
        if (data.tags != undefined){
            p.set('tags', data.tags);
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