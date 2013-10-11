'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('shri2013 app', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });

  it('should automatically redirect to /about when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe('/about');
  });


  describe('aboutCtrl', function() {

    beforeEach(function() {
      browser().navigateTo('#/about');
    });

    it('should render aboutCtrl when user navigates to /about', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch('Яндекс открывает набор во вторую Школу разработки интерфейсов в Москве.');
    });

  });

  describe('lectureCtrl', function() {

    describe('lectureIndexCtrl', function() {
      beforeEach(function(){
        browser().navigateTo('#/lectures');
      });

      it('should render lectureCtrl/index.html when user navigates to /lectures', function() {
        expect(element('[ng-view] h1:first').text()).toMatch('Список лекция ШРИ Москва 2013');
      });

    });

    describe('lectureViewCtrl', function() {
      beforeEach(function(){
        browser().navigateTo('#/lecture/Вводная по ШРИ');
      });

      it('should render lectureCtrl/view.html when user navigates to /lecture/Вводная по ШРИ', function() {
        expect(element('[ng-view] h1:first').text()).toMatch('Вводная по ШРИ');
      });
    });

    /*describe('lectureViewCtrl-Back-btn-click', function() {
      it('test Back-btn click', function(){
        element('[ng-click]').click();
      });

      it('should back to lectureCtrl/index.html', function(){
        expect(element('[ng-view] h1:first').text()).toMatch('Список лекция ШРИ Москва 2013');
      });
    });*/

  });


  describe('studentCtrl', function() {

    describe('studentIndexCtrl', function() {
      beforeEach(function() {
        browser().navigateTo('#/students');
      });

      it('should render studentCtrl/index.html when user navigates to /students', function() {
        expect(element('[ng-view] h1:first').text()).toMatch('Список студентов ШРИ Москва 2013');
      });

    });


    describe('studentViewCtrl', function() {

      beforeEach(function() {
        browser().navigateTo('#/student/Кондратов Алексей');
      });

      it('should render studentCtrl/view.html when user navigates to /students', function() {
        expect(element('[ng-view] h1:first').text()).toMatch('Кондратов Алексей');
      });

    });

  });
});
