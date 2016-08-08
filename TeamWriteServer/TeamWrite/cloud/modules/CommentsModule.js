/**
 * Created by sabir on 30.07.16.
 */

var ECR = require('cloud/helpers/ErrorCodesRegistry');
var CommonHelper = require('cloud/helpers/CommonHelper');
var UsersModule = require('cloud/modules/UsersModule');

var CommentsModule = {

    transformComment: function(p){
        if (p == undefined){
            return undefined;
        }
        return {
            id: p.id,
            parentId: p.get('parentId'),
            timestamp: (new Date(p.createdAt)).getTime(),
            content: p.get('content'),
            userId: p.get('userId')
        }
    },

    createComment: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.userId == undefined || data.parentId == undefined || data.content == undefined || data.content.trim() == ''){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'userId or parentId or content is not defined'});
            return;
        }
        var Comment = Parse.Object.extend('Comment');
        var p = new Comment();
        p.set('userId', data.userId);
        p.set('parentId', data.parentId);
        p.set('content', data.content);
        var self = this;
        p.save().then(function(savedComment){
            success(self.transformComment(savedComment));
        });
    },

    loadCommentById: function(commentId, callback, shouldTransform){
        if (commentId == undefined){
            return;
        }
        var q = new Parse.Query('Comment');
        var self = this;
        q.get(commentId, {
            success: function(comment){
                if (shouldTransform == true){
                    comment = self.transformComment(comment);
                }
                callback(comment);
            }, error: function(){
                callback(undefined);
            }
        });
    },

    updateComment: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'id is not defined'});
            return;
        }
        var self = this;
        this.loadCommentById(data.id, function(comment){
            if (comment == undefined){
                error({code: ECR.UNKNOWN_ERROR.code, message: 'comment with specified id is not found'});
                return;
            }
            for (var key in data){
                if (key == 'id'){
                    continue;
                }
                comment.set(key, data[key]);
            }
            comment.save().then(function(savedComment){
                success(self.transformComment(savedComment));
            });
        });
    },

    deleteComment: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'id is not defined'});
            return;
        }
        this.loadCommentById(data.id, function(comment){
            if (comment == undefined){
                error({code: ECR.UNKNOWN_ERROR.code, message: 'comment with specified id is not found'});
                return;
            }
            comment.destroy({
                success: function(){
                    success();
                }
            });
        });
    },

    loadParentComments: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.parentId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'parentId is not defined'});
            return;
        }
        var q = new Parse.Query('Comment');
        q.limit(1000);
        q.addAscending('createdAt');
        q.equalTo('parentId', data.parentId);
        var self = this;
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            results = results.map(function(r){return self.transformComment(r)});
            var usersIds = results.map(function(r){return r.userId});
            UsersModule.loadUsersMap(usersIds, function(usersMap){
                for (var i in results){
                    results[i].user = usersMap[results[i].userId];
                }
                success(results);
            });

        });
    }


};

module.exports = CommentsModule;