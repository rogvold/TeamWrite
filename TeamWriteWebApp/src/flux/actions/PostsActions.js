/**
 * Created by sabir on 31.07.16.
 */

var constants = require('../FluxConstants');
var ParseAPI = require('../../api/ParseAPI');

var PostsActions = {

    createPost: function(data, callback){
        var user = this.flux.store('UsersStore').getCurrentUser();
        if (data == undefined || user == undefined){
            return;
        }
        data.userId = user.id;
        this.dispatch(constants.CREATE_POST, data);
        ParseAPI.runCloudFunction("createPost", data, function(post){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.CREATE_POST_SUCCESS, {post: post});
        }.bind(this), function(err){
            this.dispatch(constants.CREATE_POST_FAIL, {error: err});
        }.bind(this));
    },

    updatePost: function(data, callback){
        console.log('actions: updatePost');
        if (data == undefined || data.id == undefined){
            return;
        }
        this.dispatch(constants.UPDATE_POST, data);
        ParseAPI.runCloudFunction("updatePost", data, function(post){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.UPDATE_POST_SUCCESS, {post: post});
        }.bind(this), function(err){
            this.dispatch(constants.UPDATE_POST_FAIL, {error: err});
        }.bind(this));
    },

    deletePost: function(data, callback){
        if (data == undefined || data.id == undefined){
            return;
        }
        this.dispatch(constants.DELETE_POST, data);
        ParseAPI.runCloudFunction("deletePost", data, function(post){
            if (callback != undefined){
                setTimeout(function(){
                    callback();
                }, 10);
            }
            this.dispatch(constants.DELETE_POST_SUCCESS, {post: post});
        }.bind(this), function(err){
            this.dispatch(constants.DELETE_POST_FAIL, {error: err});
        }.bind(this));
    }

};

module.exports = PostsActions;