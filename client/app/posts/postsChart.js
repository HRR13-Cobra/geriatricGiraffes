angular.module('hackoverflow.postsChart', [
  'hackoverflow.posts'])
  .directive('postsChart', function($scope) {
    function link (scope, el, attr, contr) {
      console.log($scope);
      console.log(scope.$parent);
      var svgContainer = d3.select(el[0]).append('svg')
        .attr('width', 30)
        .attr('height', 30);
      var circle = svgContainer.append("circle")
          .attr("cx", 30)
          .attr("cy", 30)
          // increases size with more comments
          .attr("r", scope.post.comments.length*10);
    }
      return {
        link: link,
        restrict: 'E',
        controller: function($scope) {
          console.log('hello from the other side');
        }
      }
    });