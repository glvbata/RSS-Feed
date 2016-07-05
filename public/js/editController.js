bfamRssApp.controller("editController", ["$scope", "$http", function ($scope, $http) {
    function setIsEditingFeed() {
        for (var i = 0; i < $scope.feedList.length; i++) {
            $scope.feedList[i].isEditing = false;
        }
    }

    $scope.getAllFeeds = function () {
        $http.get("/api/feedsService").success(function (data, status) {
            $scope.feedList = data;
            setIsEditingFeed();
        }).error(function (data, status) {

        });
    }

    $scope.toggleEdit = function (feed) {
        feed.isEditing = !feed.isEditing;

        if (feed.isEditing) {
            $scope.temporaryFeed = angular.copy(feed);
        }
    }

    $scope.toggleAdd = function () {
        $scope.isAdding = !$scope.isAdding;

        if ($scope.isAdding) {
            $scope.addButton = "Cancel";
        } else {
            $scope.addButton = "Add";
        }
    }

    $scope.updateFeed = function (feed) {
        if ($scope.temporaryFeed.sourceName === feed.sourceName && $scope.temporaryFeed.sourceFeedUrl === feed.sourceFeedUrl) {
            // Did not edit, no need to update. 
        } else {
            $http.put("/api/feedsService", feed).success(function (data, status) {
                console.log(status);
            }).error(function (data, status) {
                console.log(status);
            });
        }

        feed.isEditing = false;
    }

    $scope.insertFeed = function (feed) {
        $http.post("api/feedsService", feed).success(function (data, status) {
            console.log(status);
            $scope.toggleAdd();
            $scope.getAllFeeds();
        }).error(function (data, status) {
            console.log(status);
        });
    }

    $scope.deleteFeed = function (feedId) {
        $http.delete("/api/feedsService/" + feedId).success(function (data, status) {
            console.log(status);
            $scope.getAllFeeds();
        }).error(function (data, status) {

        });
    }
}]);