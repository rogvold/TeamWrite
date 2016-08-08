/**
 * Created by sabir on 29.07.16.
 */

var ECR = require('cloud/helpers/ErrorCodesRegistry');
var CommonHelper = require('cloud/helpers/CommonHelper');
var UsersModule = require('cloud/modules/UsersModule');

var UsersProjectsModule = {

    transformLink: function(l){
        if (l == undefined){
            return undefined;
        }
        return {
            id: l.id,
            timestamp: (new Date(l.createdAt)).getTime(),
            userId: l.get('userId'),
            projectId: l.get('projectId'),
            status: l.get('status')
        }
    },

    loadProjectLinks: function(projectId, callback, shouldTransform){
        if (projectId == undefined){
            return;
        }
        var q = new Parse.Query('UserProjectLink');
        q.limit(1000);
        q.equalTo('projectId', projectId);
        var self = this;
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            if (shouldTransform == true){
                results = results.map(function(r){return self.transformLink(r)});
            }
            callback(results);
        });
    },

    loadLinkByProjectIdAndUserId: function(projectId, userId, callback, shouldTransform){
        if (userId == undefined || projectId == undefined){
            return;
        }
        var q = new Parse.Query('UserProjectLink');
        q.equalTo('projectId', projectId);
        q.equalTo('userId', userId);
        var self = this;
        q.find(function(results){
            if (results == undefined || results.length == 0){
                callback(undefined);
                return;
            }
            var res = results[0];
            if (shouldTransform == true){
                res = self.transformLink(res);
            }
            callback(res);
        });
    },

    addUserToProject: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.userId == undefined || data.projectId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'addUserToProject: projectId or userId is not defined'});
            return;
        }
        var UserProjectLink = Parse.Object.extend('UserProjectLink');
        var self = this;
        this.loadLinkByProjectIdAndUserId(data.projectId, data.userId, function(link){
            if (link != undefined){
                success(link);
                return;
            }
            link = new UserProjectLink();
            link.set('userId', data.userId);
            link.set('projectId', data.projectId);
            link.set('status', 'new');
            if (data.reason != undefined){
                link.set('reason', data.reason);
            }
            link.save().then(function(savedLink){
                success(self.transformLink(savedLink));
            });
        }, true);
    },

    loadProjectUserLinks: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.projectId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'addUserToProject: projectId or userId is not defined'});
            return;
        }
        var self = this;
        this.loadProjectLinks(data.projectId, function(links){
            var usersIds = links.map(function(r){return r.userId});
            UsersModule.loadUsersByIds({usersIds: usersIds}, function(users){
                var map = {};
                for (var i in users){
                    var u = users[i];
                    map[u.id] = u;
                }
                var arr = [];
                for (var i in links){
                    var l = links[i];
                    var a = l;
                    a.user = map[l.userId];
                    arr.push(a);
                }
                success(arr);
            });
        }, true);
    },

    leaveProject: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.projectId == undefined || data.userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'leaveProject: projectId or userId is not defined'});
            return;
        }
        this.loadLinkByProjectIdAndUserId(data.projectId, data.userId, function(link){
            link.destroy({
                success: function(){
                    success();
                }
            });
        });
    },

    loadProjectsLinksMap: function(projectsIds, callback){
        if (projectsIds == undefined || projectsIds.length == 0){
            callback([]);
            return;
        }
        var q = new Parse.Query('UserProjectLink');
        q.limit(1000);
        q.containedIn('projectId', projectsIds);
        var self = this;
        q.find(function(links){
            if (links == undefined){
                links = [];
            }
            links = links.map(function(r){return self.transformLink(r)});
            var usersIds = links.map(function(r){return r.userId});
            var usersIdsMap = {};
            for (var i in usersIds){}
            usersIdsMap[usersIds[i]] = 1;
            usersIds = [];
            for (var key in usersIdsMap){
                usersIds.push(key);
            }
            UsersModule.loadUsersByIds({usersIds: usersIds}, function(users){
                var usersMap = {};
                for (var i in users){
                    var u = users[i];
                    usersMap[u.id] = u;
                }
                var projectsMap = {};
                for (var i in links){
                    links[i].user = usersMap[links[i].userId];
                    if (projectsMap[links[i].projectId] == undefined){
                        projectsMap[links[i].projectId] = [];
                    }
                    projectsMap[links[i].projectId].push(links[i]);
                }
                for (var i in projectsIds){
                    if (projectsMap[projectsIds[i]] == undefined){
                        projectsMap[projectsIds[i]] = [];
                    }
                }
                callback(projectsMap);
            });
        });
    }

};

module.exports = UsersProjectsModule;