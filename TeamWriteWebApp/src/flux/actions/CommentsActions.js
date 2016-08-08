/**
 * Created by sabir on 30.07.16.
 */

var constants = require('../FluxConstants');
var ParseAPI = require('../../api/ParseAPI');

var CommentsActions = {

    loadComments: function(parentId, callback){
        console.log('loadComments occured: parentId = ', parentId);
        if (parentId == undefined){
            console.log('loadComments: parentId is undefined');
            return;
        }
        this.dispatch(constants.LOAD_COMMENTS, {parentId: parentId});
        console.log('ready to fire loadComments function');
        var self = this;
        ParseAPI.runCloudFunction("loadComments", {parentId: parentId}, function(comments){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            var users = comments.map(function(r){return r.user});
            self.flux.store('UsersStore').silentlyConsumeUsers(users);
            self.dispatch(constants.LOAD_COMMENTS_SUCCESS, {comments: comments, parentId: parentId});
        }.bind(this), function(err){
            self.dispatch(constants.LOAD_COMMENTS_FAIL, {error: err});
        }.bind(this));
    },

    createComment: function(data, callback){
        if (data == undefined || data.parentId == undefined || data.content == undefined || data.content.trim() == ''){
            return;
        }
        var user = this.flux.store('UsersStore').getCurrentUser();
        data.userId = user.id;
        var self = this;
        this.dispatch(constants.CREATE_COMMENT, {data: data});
        ParseAPI.runCloudFunction("createComment", data, function(comment){
            console.log('createComment success: comment = ', comment);
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            self.dispatch(constants.CREATE_COMMENT_SUCCESS, {comment: comment, parentId: data.parentId});
        }.bind(this), function(err){
            this.dispatch(constants.CREATE_COMMENT_FAIL, {error: err});
        }.bind(this));
    },

    updateComment: function(data, callback){
        if (data == undefined || data.id == undefined){
            return;
        }
        this.dispatch(constants.UPDATE_COMMENT, {data: data});
        ParseAPI.runCloudFunction("updateComment", data, function(comment){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.UPDATE_COMMENT_SUCCESS, {comment: comment, parentId: parentId});
        }.bind(this), function(err){
            this.dispatch(constants.UPDATE_COMMENT_FAIL, {error: err});
        }.bind(this));
    },

    deleteComment: function(commentId, callback){
        if (commentId == undefined){
            return;
        }
        this.dispatch(constants.DELETE_COMMENT, {commentId: commentId});
        ParseAPI.runCloudFunction("deleteComment", {commentId: commentId}, function(){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.DELETE_COMMENT_SUCCESS, {id: commentId, commentId: commentId});
        }.bind(this), function(err){
            this.dispatch(constants.DELETE_COMMENT_FAIL, {error: err});
        }.bind(this));
    }

};

module.exports = CommentsActions;