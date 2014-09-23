$(function(){ //document ready

    $("#venmo").click(function(){
      variable="access_token"
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          token=pair[1]
          console.log(token)
          url="https://api.venmo.com/v1/me?access_token="+token;
          console.log(url);
           
          $.ajax({
             type: 'GET',
             url: url,
             crossDomain: true,
             dataType: "jsonp",
             success: function (data) {
            	console.log(data);
       		 },
       		 error: function(data){console.log("error...")},
             // json:'jsonp',
             // contentType: "text/plain"
		   });
          // return false;
        }
      }
	});

	function displayInfo(data){
		console.log(data);
	}
})


// // $(document).ready(function(){
// function getVenmo(){
// 	console.log("in get venmo")
// 	//$("#venmo").click(function(){
// 		$.ajax({
// 			type: 'POST',
// 			url: "https://api.venmo.com/v1/oauth/access_token",
// 			data : {
// 			    client_id: "1984",
// 			    client_secret: "ujK9d5ADHTtsAcVRYJxLENGsaGxVnku3"
// 			},
// 			dataType: "jsonp",
// 			crossDomain: true,
// 			// success: function(){alert("Success");},
// 			// error: function(){alert("Failed!");},
// 			//callback: function(){alert("callback")},
// 			//async: false,
// 			jsonpCallback: 'displayInfo',
// 			contentType: "text/html"
// 		});
// 	}
// // });
// function displayInfo(data){
// 	console.log(data)
// }

// // }); // end of document ready