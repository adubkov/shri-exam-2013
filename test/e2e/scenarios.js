'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('shri2013 app', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });

  it('should automatically redirect to /about when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/about");
  });


  describe('aboutCtrl', function() {

    beforeEach(function() {
      browser().navigateTo('#/about');
    });

    it('should render view1 when user navigates to /view1', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/Яндекс открывает набор/);
    });

  });


  describe('studentCtrl', function() {

    describe('studentIndexCtrl', function() {

      beforeEach(function() {
        browser().navigateTo('#/students');
      });

      it('should render studentCtrl/index.html when user navigates to /students', function() {
        expect(element('[ng-view] div:first').text()).
          toMatch(/Control: Index/);
      });

    });


    describe('studentViewCtrl', function() {

      beforeEach(function() {
        browser().navigateTo('#/student/Кондратов Алексей');
      });

      it('should render studentCtrl/view.html when user navigates to /students', function() {
        expect(element('[ng-view] div:first').text()).
          toMatch(/Back/);
      });

    });

  });
});
