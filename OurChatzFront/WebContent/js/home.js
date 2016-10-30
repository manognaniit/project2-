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
			.when('/jobs',{
			templateUrl:'partials/jobs.html',
				controller:'jobsController'	
			});
});
OurChatz.controller('registerController',function($scope,$http){
	console.log("in reg controller");
	$scope.register=function()
	{ var user={
			username:$scope.username,
			password:$scope.password,
			dob:$scope.dob
	
			
	};
	var res=$http.post("http://localhost:8115/OurChatz/registerUser",user);
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
			var res=$http.post("http://localhost:8115/OurChatz/createBlog",blog);
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
			var res=$http.post("http://localhost:8115/OurChatz/createJobs",jobs);
			res.success(function(data, status, headers, config) {
					console.log("status:"+status);
					});
			}
		});

