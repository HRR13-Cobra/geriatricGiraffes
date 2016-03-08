angular.module('hackoverflow.profile', [
    'hackoverflow.services',
    'ui.router'
  ])
  .config(function($stateProvider) {})

.controller('UserController', function($scope, TimeService, $state, Posts, Comments, $rootScope, Auth, $stateParams) {
  // Tim's Stuff
  $scope.user = Auth.returnUser();
  $scope.logout = function() {
    $state.go('signin', null, {
      reload: true
    });
  };

  //The rest is Steven's
  $scope.latest = true;
  $scope.toggleLatest = function() {
    $scope.latest = !$scope.latest;
  };
  $scope.TimeService = TimeService;
  $scope.username = '';
  $scope.userPosts = [];
  $scope.userComments = [];
  $scope.selectedUser = $stateParams.user;

  var dates;
  var canvas = d3.select("#userPosts");
  var parseDate = d3.time.format("%Y-%m-%d");
  var padding = 2;

  Auth.getUser()
    .then(function(user) {
      $scope.username = user.data.displayName;
    });

  Posts.getPosts('')
    .then(function(posts) {
      posts.data.forEach(function(post) {
        if (post.author === $scope.username) $scope.userPosts.push(post);
        post.comments.forEach(function(comment) {
          if (comment.author === $scope.username) $scope.userComments.push(comment);
        });
      });
      $scope.userPosts = posts.data.filter(function(post) {
        return post.author === $scope.username;
      });
    })
    // .then(function() {
    //   // Generate a Bates distribution of 10 random variables.
    //   dates = _.pluck($scope.userPosts, 'created').map(function(date) {
    //     return Date.parse(date);
    //   });
    //
    //   var formatCount = d3.format(",.0f");
    //
    //   var margin = {
    //       top: 10,
    //       right: 30,
    //       bottom: 30,
    //       left: 30
    //     },
    //     width = 400,
    //     height = 500 - margin.top - margin.bottom;
    //
    //   var x = d3.time.scale()
    //     .domain([new Date('2016-03-01'), new Date('2016-03-10')])
    //     // .domain([0, 1])
    //     .range([0, width]);
    //
    //   // Generate a histogram using calendar spaced bins
    //   var data = d3.layout.histogram()
    //     .bins(x.ticks(d3.time.day, 1))
    //     (dates);
    //
    //   var y = d3.scale.linear()
    //     .domain([0, 5])
    //     .range([height, 0]);
    //
    //   var xAxis = d3.svg.axis()
    //     .scale(x)
    //     .orient("bottom");
    //
    //   var svg = canvas.append("svg")
    //     .attr("width", width)
    //     .attr("height", height + margin.top + margin.bottom)
    //     .append("g")
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //
    //   var bar = svg.selectAll(".bar")
    //     .data(data)
    //     .enter().append("g")
    //     .attr("class", "bar")
    //     .attr('x', function(d, i) {
    //       return i * 21;
    //     })
    //     .attr('y', function(d, i) {
    //       return i;
    //     })
    //     // return x(new Date(d.x)); })
    //     .attr("transform", function(d) {
    //       return "translate(" + x(d.x) + "," + y(d.y) + ")";
    //     });
    //
    //   bar.append("rect")
    //     // .attr("x", 1)
    //     .attr("width", width / data.length - padding)
    //     .attr("height", function(d, i) {
    //        return height - i;
    //     });
    //
    //   bar.append("text")
    //     .attr("dy", ".75em")
    //     .attr("y", 6)
    //     .attr("x", x(data[0].dx) / 2)
    //     .attr("text-anchor", "middle")
    //     .text(function(d) {
    //       return formatCount(d.y);
    //     });
    //
    //   svg.append("g")
    //     .attr("class", "x axis")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(xAxis);
    //
    // })
    .then(function() {
      var w = 340;
      var h = 340;
      var r = h / 2;
      var color = d3.scale.category20c();

      var data = [{
        "label": $scope.userPosts.length + " Posts",
        "value": $scope.userPosts.length
      }, {
        "label": $scope.userComments.length + " Comments",
        "value": $scope.userComments.length
      }];


      var vis = d3.select('#chart').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
      var pie = d3.layout.pie().value(function(d) {
        return d.value;
      });

      // declare an arc generator function
      var arc = d3.svg.arc().outerRadius(r);

      // select paths, use arc generator to draw
      var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
      arcs.append("svg:path")
        .attr("fill", function(d, i) {
          return color(i);
        })
        .attr("d", function(d) {
          // log the result of the arc generator to show how cool it is :)
          console.log(arc(d));
          return arc(d);
        });

      // add the text
      arcs.append("svg:text").attr("transform", function(d) {
        d.innerRadius = 0;
        d.outerRadius = r;
        return "translate(" + arc.centroid(d) + ")";
      }).attr("text-anchor", "middle").text(function(d, i) {
        return data[i].label;
      });
    })
    .catch(function(err) {
      console.error(err);
    });

});
