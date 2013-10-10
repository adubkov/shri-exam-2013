'use strict';

/* Controllers */

angular.module('shriApp.controllers', []).run(['$rootScope', '$http', function(rs, http){
  http.get('data/data.json').success(function(data) {
  	rs.data = data;
  	rs.menu = data.menu;
  	rs.title = data.title;
  	rs.students = data.students;
  	rs.speakers = data.speakers;
		for (var i = 0, len = rs.data.students.length; i < len; i++) {
			var student = rs.data.students[i];
			rs.data.students[i].full_name = student.last_name + ' ' + student.first_name;
			rs.data.students[i].style_photo = "background:url('https://i.embed.ly/1/display/resize?key=4f59029f4cd24722a3e3f7c399f665bd&url=" + student.uri_photo + "&height=300&errorUrl=http%3A%2F%2Fplacehold.it%2F300x300') no-repeat left;"
		}
		for (var i = 0, len = rs.data.lectures.length; i < len; i++) {
			rs.data.lectures[i].style_photo = "background:url('https://i.embed.ly/1/display/resize?key=4f59029f4cd24722a3e3f7c399f665bd&url=http://avatars.yandex.net/get-yaevents/" + rs.data.speakers[rs.data.lectures[i].speaker].uri_photo + "/365x365/&height=300&errorUrl=http%3A%2F%2Fplacehold.it%2F300x300') no-repeat left;"
		}

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

.controller('aboutCtrl', ['$scope', '$location', function(sc, lc) {
	var e = sc.data.menu[lc.path()];
	sc.title = e.title + ' - ' + sc.data.title;
	sc.caption = e.caption;
	sc.content = e.content;
}])

/*
	Students object CRUD
*/

.controller('studentIndexCtrl', ['$scope', '$routeParams', '$location', function(sc, rt, lc) {
	var title = sc.data.menu[lc.path()].title + ' - ' +	sc.data.title;
	sc.$emit('setTitle', title);

  sc.caption = sc.data.menu[lc.path()].caption;
  sc.studentId = rt.studentId;
}])

.controller('studentViewCtrl', ['$scope', '$routeParams', '$location', function(sc, rt, lc) {
	sc.studentId = rt.studentId;	
	sc.student = {};

	for (var i = 0, len = sc.data.students.length; i < len; i++) {
		if (sc.studentId == sc.data.students[i].full_name) {
			sc.student = sc.data.students[i];
			break;
		}
	}
	var title = sc.student.full_name + ' - ' +	sc.data.title;	
	sc.$emit('setTitle', title);	
}])

.controller('studentAddCtrl', ['$scope', '$location', function(sc, lc) {
	var title = 'Add - ' +	sc.data.title;	
	sc.$emit('setTitle', title);
}])

.controller('studentUpdateCtrl', ['$scope', '$location', function(sc) {
	var title = 'Update - ' + sc.data.title;	
	sc.$emit('setTitle', title);
}])

.controller('studentDeleteCtrl', ['$scope', '$location', function(sc) {
	var title = 'Delete - ' + sc.data.title;	
	sc.$emit('setTitle', title);
}])

/*
	Lectures object CRUD
*/

.controller('lectureIndexCtrl', ['$scope', '$routeParams', '$location', function(sc, rt, lc) {
	var title = sc.data.menu[lc.path()].title + ' - ' +	sc.data.title;	
	sc.$emit('setTitle', title);
  sc.lectureId = rt.lectureId;
	sc.caption = sc.data.menu[lc.path()].caption;  
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
	var title = sc.lecture.title + ' - ' +	sc.data.title;	
	sc.$emit('setTitle', title);

	angular.element(document.querySelector('#flash')).append('<param name="flashvars" value="login=ya-events&amp;storage_directory='+ sc.lecture.link_video +'&amp;autostart=no&amp;tnsCount=0&amp;is-hq=true&amp;has-hq=true&amp;show-info=false&amp;show-quality=true&amp;show-logo=false&amp;is-serp=true">');
}])

.controller('lectureAddCtrl', ['$scope', function(sc) {
	var title = 'Add - ' + sc.data.title;	
	sc.$emit('setTitle', title);	
}])

.controller('lectureUpdateCtrl', ['$scope', function(sc) {
	var title = 'Update - ' + sc.data.title;	
	sc.$emit('setTitle', title);	
}])

.controller('lectureDeleteCtrl', ['$scope', function(sc) {
	var title = 'Delete - ' + sc.data.title;	
	sc.$emit('setTitle', title);	
}])

;
