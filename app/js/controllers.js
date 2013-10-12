'use strict';

/* Controllers */

angular.module('shriApp.controllers', []).run(['$rootScope', '$http', function(rs, http){
	/**
	* Initialize application
	**/
  http.get('data/data.json').success(function(data) {
  	// Load data from .json and initialize rootScope variables
  	rs.data = data;
  	rs.menu = data.menu;
  	rs.title = data.title;
  	rs.students = data.students;
  	rs.speakers = data.speakers;
  	rs.lectures = data.lectures;

  	// Preload speakers photo
		for (var i = 0, len = rs.data.lectures.length; i < len; i++) {
			var img = new Image();
			img.src = 'https://i.embed.ly/1/display/resize?key=4f59029f4cd24722a3e3f7c399f665bd&url=http://avatars.yandex.net/get-yaevents/' + rs.data.speakers[rs.data.lectures[i].speaker].uri_photo + '/365x365/&height=300&errorUrl=http%3A%2F%2Fplacehold.it%2F300x300';
			rs.data.lectures[i].style_photo =  {
				"background-image":"url('"+img.src+"')",
				"background-repeat":"no-repeat",
				"background-position":"left"
			}
		}

		// Preload students photo and compile Full Name property
		for (var i = 0, len = rs.data.students.length; i < len; i++) {
			// compile student.full_name
			var student = rs.data.students[i];
			rs.data.students[i].full_name = student.last_name + ' ' + student.first_name;
			/* Preload photos */
			var img = new Image();
			img.src = 'https://i.embed.ly/1/display/resize?key=4f59029f4cd24722a3e3f7c399f665bd&url=' + student.uri_photo + '&height=300&errorUrl=http%3A%2F%2Fplacehold.it%2F300x300';
			rs.data.students[i].style_photo = {
				"background-image":"url('"+img.src+"')",
				"background-repeat":"no-repeat",
				"background-position":"left"
			}
		}		

		// Send broadcast message when fully load data.json
		rs.$broadcast('dataIsLoaded');
	});

	/**
	* Declare function $back - step backward in history
	**/
	rs.$back = function() { 
		window.history.back();
  };

  /**
  * Catch 'setPageTitle' message
  **/
	rs.$on('setPageTitle', function(event, title){ rs.title = title; });  
}])


/**
*	Default function
**/
.controller('shriCtrl', ['$scope', function(sc) {}])


/**
*	function aboutCtrl
**/
.controller('aboutCtrl', ['$scope', '$location', function(sc, lc) {

	/**
	* Update View function
	**/
	var updateView = function(){
		// Initialize content
		var e = sc.data.menu[lc.path()];		
		sc.caption = e.caption;
		sc.content = e.content;

		// Set page title	
		sc.title = sc.data.title;
		sc.$emit('setPageTitle', sc.title);
	}
	updateView();

	// Do updateView when data.json is fully load
	sc.$on('dataIsLoaded', updateView());
}])


/**
*	function studentIndexCtrl
**/
.controller('studentIndexCtrl', ['$scope', '$routeParams', '$location', function(sc, rt, lc) {
	/**
	* Update View function
	**/
	var updateView = function(){
		// Set page title
		var title = sc.data.menu[lc.path()].title + ' - ' +	sc.data.title;
		sc.$emit('setPageTitle', title);
	  
	  // Initialize content
	  sc.caption = sc.data.menu[lc.path()].caption;
	  sc.studentId = rt.studentId;
	}
	updateView();

	// Do updateView when data.json is fully load
	sc.$on('dataIsLoaded', updateView());
}])


/**
*	function studentViewCtrl
**/
.controller('studentViewCtrl', ['$scope', '$routeParams', '$location', function(sc, rt, lc) {
	/**
	* Update View function
	**/
	var updateView = function(){
		// Initialize content
		sc.studentId = rt.studentId;	
		sc.student = {};

		// Find student object by full_name
		for (var i = 0, len = sc.data.students.length; i < len; i++) {
			if (sc.studentId == sc.data.students[i].full_name) {
				sc.student = sc.data.students[i];
				break;
			}
		}

		// Set page title
		var title = sc.student.full_name + ' - ' +	sc.data.title;	
		sc.$emit('setPageTitle', title);	
	}
	updateView();

	// Do updateView when data.json is fully load
	sc.$on('dataIsLoaded', updateView());
}])


/**
*	function lectureIndexCtrl
**/
.controller('lectureIndexCtrl', ['$scope', '$routeParams', '$location', function(sc, rt, lc) {
	/**
	* Update View function
	**/
	var updateView = function(){
		// Set page title
		var title = sc.data.menu[lc.path()].title + ' - ' +	sc.data.title;	
		sc.$emit('setPageTitle', title);

		// Initialize content
		sc.caption = sc.data.menu[lc.path()].caption;  
		sc.lectureId = rt.lectureId;
	}
	updateView();

	// Do updateView when data.json is fully load
	sc.$on('dataIsLoaded', updateView());
}])


/**
*	function lectureViewCtrl
**/
.controller('lectureViewCtrl', ['$scope', '$routeParams', '$location',  function(sc, rt, lc) {
	/**
	* Update View function
	**/
	var updateView = function(){
		// Initialize content
	  sc.lectureId = rt.lectureId;
	  sc.lecture = {};
		sc.path = lc.path();  

		// Get lecture object by lectureId
		for (var i = 0, len = sc.data.lectures.length; i < len; i++) {
			var lecture = sc.data.lectures[i].title;
			if (lecture == sc.lectureId) {
				sc.lecture = sc.data.lectures[i];
				break;
			}
		} 

		// Set page title
		var title = sc.lecture.title + ' - ' +	sc.data.title;	
		sc.$emit('setPageTitle', title);

		// Compile video object
		sc.video_param = '<param name="scale" value="scale"><param name="quality" value="high"><param name="bgcolor" value="#FFFFFF"><param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="always"><param name="wmode" value="opaque"><param name="flashvars" value="login=ya-events&amp;storage_directory='+ sc.lecture.link_video +'&amp;autostart=no&amp;tnsCount=0&amp;is-hq=true&amp;has-hq=true&amp;show-info=false&amp;show-quality=true&amp;show-logo=false&amp;is-serp=true">';
	}
	updateView();

	// Do updateView when data.json is fully load
	sc.$on('dataIsLoaded', updateView());
}]);
