var OurChatz=angular.module('OurChatz',['ngRoute']);
OurChatz.config(function($routeProvider){
	$routeProvider
	.when('/register',{
		templateUrl:'partials/register.html',
		controller:'registerController'
	}
			).when('/blog',{
				templateUrl:'partials/viewBlogs.html',
				controller:'myBlogController'
				})
			.when('/viewBlogs',{
				templateUrl:'partials/viewBlogs.html',
				controller:'blogController'
				})
				.when('/jobs',{
			templateUrl:'partials/jobs.html',
				controller:'jobsController'	
			})
			.when('/login',{
			templateUrl:'partials/login.html',
				controller:'loginController'	
			}).when('/userHome',{
					templateUrl:'partials/userHome.html'
             }).when("/adminHome",
		      {
	         templateUrl:"partials/adminHome.html",
	        controller:'adminController'
           }).when('/logout',{
	        templateUrl:'partials/logOut.html',
	         controller:'logoutController'
	
             })
             .when('/forum',{
	         templateUrl:'partials/forum.html',
	          controller:'forumController'	
              }).when('/viewJobs',{
     	         templateUrl:'partials/adminJobs.html',
   	          controller:'jobController'	
                 }).when('/adminBlog',{
         	         templateUrl:'partials/adminBlog.html',
          	          controller:'adminBlogController'	
                        })
              });
OurChatz.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }]);
OurChatz.service('fileUpload', ['$http','$location', function ($http,$scope,$location) {
    this.uploadFileToUrl = function(file, uploadUrl,username,password,dob){
        var fd = new FormData();
        fd.append('file', file);
        fd.append('username',username);
        fd.append('password',password);
        fd.append('dob',dob);
     console.log("fd:"+fd)
        $http.post(uploadUrl, fd, {
           transformRequest: angular.identity,
           headers: {'Content-Type': undefined}
        })
         .success(function(){
     	   $scope.message="registered! you can login now!!";
     	    $scope.username="";
     	    $scope.password="";
     	   
        })
     
        .error(function(){
        });
     }
  }]);
OurChatz.controller('registerController',['$scope','fileUpload',function($scope,fileUpload){
	 $scope.register = function(){
	       var file = $scope.myFile;
	       var username=$scope.username;
	       var password=$scope.password;
	       var dob=$scope.dob;
	       console.log("username"+username);
	       console.log('file is ' );
	       console.dir(file);
	       var uploadUrl = "http://localhost:8089/OurChatz/fileUpload";
	       fileUpload.uploadFileToUrl(file,uploadUrl,username,password,dob);
	    };
	}]);



	OurChatz.controller('jobsController',function($scope,$http,$rootScope){
		console.log("in job controller");
		$rootScope.viewJobs=true;
		$scope.jobs=function(){
			var jobs={
					companyName:$scope.companyName,
					role:$scope.role,
					skillsRequired:$scope.skillsRequired,
					eligibility:$scope.eligibility,
					companyUrl:$scope.companyUrl,
					ctc:$scope.ctc,
					interviewDate:$scope.interviewDate,
					companyAddress:$scope.companyAddress
					};
			var res=$http.post("http://localhost:8089/OurChatz/createJobs",jobs);
			res.success(function(data, status, headers, config) {
					console.log("status:"+status);
					});
			}
		$scope.editJob=function(job)
		{
			console.log("inside editjob");
			console.log("job:"+job);
			$scope.jobDataToEdit=job;
		}
		$scope.saveEdit=function()
		{
			var dataObj = {
					company:$scope.jobDataToEdit.company,
					role:$scope.jobDataToEdit.role,
					skillsRequired:$scope.jobDataToEdit.skillsRequired,
					eligibilityCriteria:$scope.jobDataToEdit.eligibilityCriteria,
					ctc:$scope.jobDataToEdit.ctc,
					dateOfInterview:$scope.jobDataToEdit.dateOfInterview,
					addressOfTheCompany:$scope.jobDataToEdit.addressOfTheCompany,
					urlOfTheCompany:$scope.jobDataToEdit.urlOfTheCompany,
					
					jobId:$scope.jobDataToEdit.jobId
	 		};
			$http.put('http://localhost:8089/OurChatz/updateJob', dataObj);
			$http.get("http://localhost:8089/OurChatz/viewAllJobs")
	 	    .then(function (response) {$scope.jobs = response.data;});
		}
		$scope.deleteJob=function(jobDataToEdit)
		{
			console.log("delete job called");
			jobId:$scope.jobDataToEdit.jobId;
			console.log("jobId:"+jobDataToEdit.jobId);
			$http['delete']('http://localhost:8089/OurChatz/deleteJob/'+jobDataToEdit.jobId);
			 $http.get("http://localhost:8089/OurChatz/viewAllJobs")
		 	    .then(function (response) {$scope.jobs = response.data;});
		}
		});
	OurChatz.controller('loginController',['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope){
		console.log("in login()");
		$scope.login=function(){
			var logData={
				username:$scope.username,
				password:$scope.password
		}
			$http.post("http://localhost:8089/OurChatz/authenticate",logData).then(function(response){
				console.log("result   data:"+response.data);
				var r=response.data.toString();
				console.log("response:"+r);
			     
				if(r==1)
					{
					$rootScope.blog=true;
					$rootScope.forum=true;
					$rootScope.jobs=false;
					$rootScope.viewJobs=true;
				    $rootScope.login=false;
					$rootScope.register=false;
					$rootScope.logout=true;
					$rootScope.viewBlogs=true;
				    console.log('logout:'+$rootScope.logout);
					console.log("logout.....:"+response.data);
					console.log("uname from root scope:"+$rootScope.uname);
					$rootScope.uname=$scope.username;
					console.log("uname:"+$rootScope.uname);
					$location.path('/userHome');
					}
				if(r==0)
					{
					$scope.username="";
					$scope.password="";
					$scope.message="username/password incorrect";
					$location.path('/login');
					}
				if(r==2)
				{
					$rootScope.login=false;
					$rootScope.register=false;
					$rootScope.blog=true;
					$rootScope.forum=true;
					$rootScope.jobs=true;
					$rootScope.login=false;
					$rootScope.register=false;
					$rootScope.logout=true;
					$rootScope.adminBlog=true;
					
					$location.path('/adminHome');
				}
				});  
					 }
				}]
				);
				 
OurChatz.controller('logoutController',function($scope,$rootScope){
		console.log("logged out succesfully");
	});
	
OurChatz.controller('adminController',function($scope,$rootScope){
		console.log("in admin controller");
		$rootScope.viewBlogs=true;
		$rootScope.logout=true;
		});
		OurChatz.controller('forumController',function($scope,$rootScope,$http){
			console.log('in forum controller');
			
			$scope.forum=function(){
				var forum={
						questionTitle:$scope.questionTitle,
						questionDescription:$scope.questionDescription
						
						};
				var res=$http.post("http://localhost:8089/OurChatz/addQuestion",forum);
				res.success(function(data, status, headers, config) {
						console.log("status:"+status);
				});
				
			}
		
		});
		OurChatz.controller("blogController",function($scope,$http,$rootScope)	
				{	
			$rootScope.login=false;
			$rootScope.register=false;
			$rootScope.viewBlogs=false;
			
			console.log(" in view blogs controller");
			$http.get("http://localhost:8089/OurChatz/viewBlogs")
					    .then(function (response) {
					    	$scope.blogs = response.data;
	               console.log("data:"+response.data);
					    });
			$scope.newBlog={};
			console.log("In Controller");
			$scope.addBlog=function(newBlog)
			{
				var dataObj = {
		    		title:$scope.title,
		    			description:$scope.description
		 				
		 		};
				console.log("title:"+dataObj);
				 var res = $http.post('http://localhost:8089/OurChatz/createBlog',dataObj);
				 $http.get("http://localhost:8089/OurChatz/viewBlogs")
			 	    .then(function (response) {$scope.blogs = response.data;});
			 		res.success(function(data, status, headers, config) {
			 			$scope.message = data;
			 			console.log("status:"+status);
			 		});
			 		 
			};
			
			$scope.editBlog=function(blog)
			{
				console.log("inside editblog");
				console.log("blog:"+blog);
				$scope.blogDataToEdit=blog;
			}
			$scope.saveEdit=function()
			{
				var dataObj = {
		    			title:$scope.blogDataToEdit.title,
		    			description:$scope.blogDataToEdit.description,
		 				blogId:$scope.blogDataToEdit.blogId
		 		};
				$http.put('http://localhost:8089/OurChatz/updateBlog', dataObj);
				$http.get("http://localhost:8089/OurChatz/viewBlogs")
		 	    .then(function (response) {$scope.blog = response.data;});
			}
			$scope.deleteBlog=function(blogDataToEdit)
			{
				console.log("delete blog called");
				blogId:$scope.blogDataToEdit.blogId;
				console.log("blog_id:"+blogDataToEdit.blogId);
				$http['delete']('http://localhost:8089/OurChatz/deleteBlog/'+blogDataToEdit.blogId);
				 $http.get("http://localhost:8089/OurChatz/viewBlogs")
			 	    .then(function (response) {$scope.blogs = response.data;});
			}
			});
		OurChatz.controller("jobController",function($scope,$http,$rootScope)	
				{	
			$rootScope.login=false;
			$rootScope.register=false;
			$rootScope.viewBlogs=true;
			$rootScope.viewJobs=false;
			console.log(" in  job controller");
			$http.get("http://localhost:8089/OurChatz/viewJobs")
					    .then(function (response) {
					    	$scope.jobs = response.data;
	               console.log("data:"+response.data);
					    });
			
				});
		
		OurChatz.controller("adminBlogController",function($scope,$http,$rootScope)	
				{	
			$rootScope.login=false;
			$rootScope.register=false;
			
			$rootScope.home=false;
			
			
			console.log(" in adminblog controller");
			
					 $http.get("http://localhost:8089/OurChatz/viewBlogs")
					    .then(function (response) {
					    	
					    	$scope.blogs = response.data;
					    	
					    	console.log("data:"+response.data);
					    });
					
		$scope.appdisapp=function(adminblog)
		{
			console.log("inside appdisappblog");
			console.log("adminblog:"+adminblog);
			$scope.blogstatus=adminblog;
		}
		$scope.approveBlog=function()
		{
			console.log("in approveblog");
			var edit=
				{
					blogId:$scope.blogstatus.blogId,
			
					title:$scope.blogstatus.title,
					description:$scope.blogstatus.description,
					status:true
				}
			$http.put("http://localhost:8089/OurChatz/updateBlog",edit);
			 $http.get("http://localhost:8089/OurChatz/viewBlogs")
			    .then(function (response) {
			    	
			    	$scope.blogs = response.data;
			    	
			    	console.log("data:"+response.data);
			    });
		}
		$scope.disapproveBlog=function()
		{
			console.log("in disapproveblog");
			var edit=
				{
					blogId:$scope.blogstatus.blogId,
					
					title:$scope.blogstatus.title,
					description:$scope.blogstatus.description,
					status:false
				}
			$http.put("http://localhost:8089/OurChatz/updateBlog",edit);
			 $http.get("http://localhost:8089/OurChatz/viewBlogs")
			    .then(function (response) {
			    	$scope.blogs = response.data;
			        console.log("data:"+response.data);
			    });
			 }
	   });		
	
		
			