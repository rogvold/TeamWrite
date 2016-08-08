/**
 * Created by sabir on 30.07.16.
 */

var Fluxxor = require('fluxxor');
var constants = require('../FluxConstants');

var CommentsStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.loading = false;
        this.commentsMap = {};

        this.bindActions(
            constants.LOAD_COMMENTS, this.startLoading,
            constants.LOAD_COMMENTS_SUCCESS, this.loadCommentsSuccess,
            constants.LOAD_COMMENTS_FAIL, this.stopLoading,

            constants.CREATE_COMMENT, this.startLoading,
            constants.CREATE_COMMENT_SUCCESS, this.createCommentSuccess,
            constants.CREATE_COMMENT_FAIL, this.stopLoading,

            constants.UPDATE_COMMENT, this.startLoading,
            constants.UPDATE_COMMENT_SUCCESS, this.updateCommentSuccess,
            constants.UPDATE_COMMENT_FAIL, this.stopLoading,

            constants.DELETE_COMMENT, this.startLoading,
            constants.DELETE_COMMENT_SUCCESS, this.deleteCommentSuccess,
            constants.DELETE_COMMENT_FAIL, this.stopLoading

        );
    },

    deleteCommentSuccess: function(payload){
        this.loading = false;
        this.commentsMap[payload.id] = undefined;
        this.emit('change');
    },

    updateCommentSuccess: function(payload){
        this.loading = false;
        this.consumeComments([payload.comment]);
        this.emit('change');
    },

    createCommentSuccess: function(payload){
        this.loading = false;
        this.consumeComments([payload.comment]);
        this.emit('change');
    },

    consumeComments: function(comments){
        if (comments == undefined){
            return;
        }
        for (var i in comments){
            this.commentsMap[comments[i].id] = comments[i];
        }
    },

    loadCommentsSuccess: function(payload){
        this.loading = false;
        this.consumeComments(payload.comments);
        this.emit('change');
    },

    startLoading: function(){
        this.loading = true;
        this.emit('change');
    },

    stopLoading: function(){
        this.loading = false;
        this.emit('change');
    },

    getParentComments: function(parentId){
        var arr = [];
        var map = this.commentsMap;
        for (var key in map){
            var c = map[key];
            if (c.parentId == parentId){
                arr.push(c);
            }
        }
        arr.sort(function(a, b){
            return (a.timestamp - b.timestamp);
        });
        return arr;
    },

    getComment: function(commentId){
        if (commentId == undefined){
            return undefined;
        }
        return this.commentsMap[commentId];
    }

});

module.exports = CommentsStore;