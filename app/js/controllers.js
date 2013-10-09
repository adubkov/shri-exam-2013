'use strict';

/* Controllers */

angular.module('shriApp.controllers', []).run(['$rootScope', '$http', function(rs, http){
  http.get('data/data.json').success(function(data) {
  	rs.data = data;
  	rs.menu = data.menu;
  	rs.title = data.title;
  	rs.students = data.students;
		for (var i = 0, len = rs.data.students.length; i < len; i++) 
			rs.data.students[i].full_name = rs.data.students[i].last_name + ' ' + rs.data.students[i].first_name;
  	rs.lectures = data.lectures;
  	rs.speakers = data.speakers;
  });
	rs.$back = function() { 
    window.history.back();
  };
	rs.$on('setTitle', function(event, title){ rs.title = title; });  
}])

.controller('shriCtrl', ['$scope', function(sc) {
	
}])

.controller('aboutCtrl', ['$scope', function(sc) {
	sc.title = sc.data.menu[0].caption + ' - ' + sc.data.title;
}])

/*
	Students object CRUD
*/

.controller('studentIndexCtrl', ['$scope', '$routeParams', '$location', function(sc, rt, lc) {
	var title = sc.data.menu[1].caption + ' - ' +	sc.data.title;
	sc.$emit('setTitle', title);

  sc.studentId = rt.studentId;
}])

.controller('studentViewCtrl', ['$scope', '$routeParams', function(sc, rt) {
	sc.studentId = rt.studentId;	
	sc.student = {};

	for (var i = 0, len = sc.data.students.length; i < len; i++) {
		if (sc.studentId == sc.data.students[i].full_name) {
			sc.student = sc.data.students[i];
			break;
		}
	}
	var title = sc.student.full_name + ' - ' + sc.data.menu[1].caption + ' - ' +	sc.data.title;	
	sc.$emit('setTitle', title);	
}])

.controller('studentAddCtrl', ['$scope', function(sc) {
	var title = 'Add' + ' - ' + sc.data.menu[1].caption + ' - ' +	sc.data.title;	
	sc.$emit('setTitle', title);
}])

.controller('studentUpdateCtrl', ['$scope', function(sc) {
	var title = 'Update' + ' - ' + sc.data.menu[1].caption + ' - ' +	sc.data.title;	
	sc.$emit('setTitle', title);
}])

.controller('studentDeleteCtrl', ['$scope', function(sc) {
	var title = 'Delete' + ' - ' + sc.data.menu[1].caption + ' - ' +	sc.data.title;	
	sc.$emit('setTitle', title);
}])

/*
	Lectures object CRUD
*/

.controller('lectureIndexCtrl', ['$scope', '$routeParams', function(sc, rt) {
	var title = sc.data.menu[2].caption + ' - ' +	sc.data.title;	
	sc.$emit('setTitle', title);
  sc.lectureId = rt.lectureId;
}])

.controller('lectureViewCtrl', ['$scope', '$routeParams', function(sc, rt) {
  sc.lectureId = rt.lectureId;
  sc.lecture = {};
	for (var i = 0, len = sc.data.lectures.length; i < len; i++) {
		var lecture = sc.data.lectures[i].title;
		if (lecture == sc.lectureId) {
			sc.lecture = sc.data.lectures[i];
			break;
		}
	}  
	var title = sc.lecture.title + ' - ' + sc.data.menu[2].caption + ' - ' +	sc.data.title;	
	sc.$emit('setTitle', title);

	angular.element(document.querySelector('#flash')).append('<param name="flashvars" value="login=ya-events&amp;storage_directory='+ sc.lecture.link_video +'&amp;autostart=no&amp;tnsCount=0&amp;is-hq=true&amp;has-hq=true&amp;show-info=false&amp;show-quality=true&amp;show-logo=false&amp;is-serp=true">');
}])

.controller('lectureAddCtrl', ['$scope', function(sc) {
	var title = 'Add' + ' - ' + sc.data.menu[2].caption + ' - ' +	sc.data.title;	
	sc.$emit('setTitle', title);	
}])

.controller('lectureUpdateCtrl', ['$scope', function(sc) {
	var title = 'Update' + ' - ' + sc.data.menu[2].caption + ' - ' +	sc.data.title;	
	sc.$emit('setTitle', title);	
}])

.controller('lectureDeleteCtrl', ['$scope', function(sc) {
	var title = 'Delete' + ' - ' + sc.data.menu[2].caption + ' - ' +	sc.data.title;	
	sc.$emit('setTitle', title);	
}])

;
