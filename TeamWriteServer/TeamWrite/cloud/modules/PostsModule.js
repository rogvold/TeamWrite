/**
 * Created by sabir on 30.07.16.
 */

var ECR = require('cloud/helpers/ErrorCodesRegistry');
var CommonHelper = require('cloud/helpers/CommonHelper');
var UsersModule = require('cloud/modules/UsersModule');

var PostsModule = {

    transformPost: function(p){
        if (p == undefined){
            return undefined;
        }
        return {
            id: p.id,
            projectId: p.get('projectId'),
            timestamp: (new Date(p.createdAt)).getTime(),
            content: p.get('content'),
            userId: p.get('userId')
        }
    },

    createPost: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.userId == undefined || data.projectId == undefined || data.content == undefined || data.content.trim() == ''){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'userId or projectId or content is not defined'});
            return;
        }
        var ProjectPost = Parse.Object.extend('ProjectPost');
        var p = new ProjectPost();
        p.set('userId', data.userId);
        p.set('projectId', data.projectId);
        p.set('content', data.content);
        var self = this;
        p.save().then(function(savedPost){
            success(self.transformPost(savedPost));
        });
    },

    loadPostById: function(postId, callback, shouldTransform){
        if (postId == undefined){
            return;
        }
        var q = new Parse.Query('ProjectPost');
        var self = this;
        q.get(postId, {
            success: function(post){
                if (shouldTransform == true){
                    post = self.transformPost(post);
                }
                callback(post);
            }, error: function(){
                callback(undefined);
            }
        });
    },

    updatePost: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'id is not defined'});
            return;
        }
        var self = this;
        this.loadPostById(data.id, function(post){
            if (post == undefined){
                error({code: ECR.UNKNOWN_ERROR.code, message: 'post with specified id is not found'});
                return;
            }
            for (var key in data){
                if (key == 'id'){
                    continue;
                }
                post.set(key, data[key]);
            }
            post.save().then(function(savedPost){
                success(self.transformPost(savedPost));
            });
        });
    },

    deletePost: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'id is not defined'});
            return;
        }
        this.loadPostById(data.id, function(post){
            if (post == undefined){
                error({code: ECR.UNKNOWN_ERROR.code, message: 'post with specified id is not found'});
                return;
            }
            post.destroy({
                success: function(){
                    success();
                }
            });
        });
    },

    loadProjectPosts: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.projectId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'projectId is not defined'});
            return;
        }
        var q = new Parse.Query('ProjectPost');
        q.limit(1000);
        q.addAscending('createdAt');
        q.equalTo('projectId', data.projectId);
        var self = this;
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            results = results.map(function(r){return self.transformPost(r)});
            success(results);
        });
    }


};

module.exports = PostsModule;