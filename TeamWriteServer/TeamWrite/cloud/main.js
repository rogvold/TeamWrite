var UsersModule = require('cloud/modules/UsersModule');
var ProjectsModule = require('cloud/modules/ProjectsModule');
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