var UsersModule = require('cloud/modules/UsersModule');
var ProjectsModule = require('cloud/modules/ProjectsModule');
var UsersProjectsModule = require('cloud/modules/UsersProjectsModule');
var PostsModule = require('cloud/modules/PostsModule');
var CommentsModule = require('cloud/modules/CommentsModule');
var ECR = require('cloud/helpers/ErrorCodesRegistry');

//users

Parse.Cloud.define("loadUser", function(request, response) {
  var data = request.params.data;
  if (data == undefined || data.userId == undefined){
    response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'loadUser: data or userId is undefined'});
    return;
  }
  UsersModule.loadUser(data.userId, function(user){
    response.success(user);
  }, function(err){
    response.error(err);
  }, true);
});

Parse.Cloud.define("loadUsersByIds", function(request, response) {
    var data = request.params.data;
    UsersModule.loadUsersByIds(data, function(users){
        response.success(users);
    }, function(err){
        response.error(err);
    }, true);
});

Parse.Cloud.define("createUser", function(request, response) {
  var data = request.params.data;
  Parse.Cloud.useMasterKey();
  if (data == undefined){
    response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'createUser: data is undefined'});
    return;
  }
  //todo: check permission
  UsersModule.createUser(data, function(user){
    response.success(user);
  }, function(err){
    response.error(err);
  });
});

Parse.Cloud.define("updateUser", function(request, response) {
  var data = request.params.data;
  Parse.Cloud.useMasterKey();
  if (data == undefined){
    response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'updateUser: data is undefined'});
    return;
  }
  //todo: check permission
  UsersModule.updateUser(data, function(user){
    response.success(user);
  }, function(err){
    response.error(err);
  });
});


//projects

Parse.Cloud.define("loadAllProjects", function(request, response) {
    var data = request.params.data;
    ProjectsModule.loadAllProjects(function(projects){
        response.success(projects);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("loadUserProjects", function(request, response) {
    var data = request.params.data;
    ProjectsModule.loadUserProjects(data, function(projects){
        response.success(projects);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("createProject", function(request, response) {
    var data = request.params.data;
    ProjectsModule.createProject(data, function(project){
        response.success(project);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("updateProject", function(request, response) {
    var data = request.params.data;
    ProjectsModule.updateProject(data, function(project){
        response.success(project);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("deleteProject", function(request, response) {
    var data = request.params.data;
    ProjectsModule.deleteProject(data, function(){
        response.success(data);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("loadProject", function(request, response) {
    var data = request.params.data;
    ProjectsModule.loadProjectAPISafe(data, function(project){
        response.success(project);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("joinToProject", function(request, response) {
    var data = request.params.data;
    UsersProjectsModule.addUserToProject(data, function(link){
        response.success(link);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("leaveProject", function(request, response) {
    var data = request.params.data;
    UsersProjectsModule.leaveProject(data, function(){
        response.success({projectId: data.projectId, userId: data.userId});
    }, function(err){
        response.error(err);
    });
});


//posts

Parse.Cloud.define("loadProjectPosts", function(request, response) {
    var data = request.params.data;
    PostsModule.loadProjectPosts(data, function(posts){
        response.success(posts);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("createPost", function(request, response) {
    var data = request.params.data;
    PostsModule.createPost(data, function(post){
        response.success(post);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("updatePost", function(request, response) {
    var data = request.params.data;
    PostsModule.updatePost(data, function(post){
        response.success(post);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("deletePost", function(request, response) {
    var data = request.params.data;
    PostsModule.deletePost(data, function(){
        response.success(data);
    }, function(err){
        response.error(err);
    });
});

//comments

Parse.Cloud.define("loadComments", function(request, response) {
    var data = request.params.data;
    CommentsModule.loadParentComments(data, function(comments){
        response.success(comments);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("createComment", function(request, response) {
    var data = request.params.data;
    CommentsModule.createComment(data, function(comment){
        response.success(comment);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("updateComment", function(request, response) {
    var data = request.params.data;
    CommentsModule.updateComment(data, function(comment){
        response.success(comment);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("deleteComment", function(request, response) {
    var data = request.params.data;
    CommentsModule.deleteComment(data, function(){
        response.success(data);
    }, function(err){
        response.error(err);
    });
});