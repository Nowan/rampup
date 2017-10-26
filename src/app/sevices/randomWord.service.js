(function() {
	'use strict';

	angular.module('rampup')
		.service('$randomWord', RandomWordService);

	function RandomWordService($http, $q, $timeout) {
    var httpServer = "http://setgetgo.com/";

    this.next = function(minLength, maxLength) {
      minLength = minLength ? Math.max(minLength, 3) : 3;
      maxLength = maxLength ? Math.min(maxLength, 8) : 8;
      var wordLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;

      var requestUrl = httpServer + "randomword/get.php?len=" + wordLength;

      return $http.get(requestUrl).then(
        function(response) { return response.data; },
        function() { return generateRandomWord(wordLength); }
      );
    }

    function generateRandomWord(wordLength) {
      return Math.random().toString(36).substring(wordLength);
    }
	}

})();
