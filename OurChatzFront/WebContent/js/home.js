var OurChatz=angular.module('OurChatz',['ngRoute']);
OurChatz.config(function($routeProvider){
	$routeProvider
	.when('/register',{
		templateUrl:'partials/register.html',
		controller:'registerController'
	}
			).when('/blog',{
				templateUrl:'partials/blog.html',
				controller:'blogController'
				
			})
			.when('/viewBlogs',{
				templateUrl:'partials/viewBlogs.html',
				controller:'viewBlogsController'
				
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
});
});

OurChatz.controller('registerController',function($scope,$http,$rootScope){
	console.log("in reg controller");
	$rootScope.register=false;
	$rootScope.logout=false;
	
	$scope.register=function()
	{ var user={
			username:$scope.username,
			password:$scope.password,
			dob:$scope.dob
			};
	var res=$http.post("http://localhost:8089/OurChatz/registerUser",user);
	res.success(function(data, status, headers, config) {
			console.log("status:"+status);
				});
	}
});
	OurChatz.controller('blogController',function($scope,$http){
		console.log("in blog controller");
		$scope.blog=function(){
			var blog={
					title:$scope.title,
					description:$scope.description
					};
			var res=$http.post("http://localhost:8089/OurChatz/createBlog",blog);
			res.success(function(data, status, headers, config) {
					console.log("status:"+status);
					});
			}
		});

	OurChatz.controller('jobsController',function($scope,$http){
		console.log("in job controller");
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
					$rootScope.viewJobs=false;
				
					
					$rootScope.login=false;
					$rootScope.register=false;
					$rootScope.logout=true;
					$rootScope.viewBlogs=true;
					console.log('logout:'+$rootScope.logout);
					console.log("logout.....:"+response.data);
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
		OurChatz.controller("viewBlogsController",function($scope,$http,$rootScope)	
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
				});
			