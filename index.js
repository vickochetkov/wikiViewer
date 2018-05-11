// makes focus is given to the search box (HTML DOM)
// window.onload = function() {
//  document.getElementById("searchForm").focus();
// };


// makes focus is given to the search box (jQuery)
$(document).ready(function() {
  $('#searchForm').focus();

  // Wiki Search
  $(".button").on("keydown", function() {
    $(".show-rslt").empty();
    var word = $("#searchForm").val();
    var searchURL = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=";
    var queryURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&origin=*&inprop=url&utf8=&format=json&srsearch=";
  
  // Display disambiguation search result   
    $.ajax({
        url: searchURL + word + '_(disambiguation)',
        dataType: 'json',      
        success: function(resp) {
          // console.log(resp);
          // console.log(word);
          var rsltLink = resp[3][0];
          var titleDisamb = resp[1][0];
          var quoteDisamb = resp[2][0];            
          if (resp[3][0]) {
            var rslt = "<div ><a target='_blank' href=" + rsltLink + "><i><h4>" + titleDisamb + "</h4><p>" + quoteDisamb + "</p></></a></div>";
            $(".show-disamb").html(rslt);
          }
        }
    });

  // Display search through titles result
    // $.ajax({
    //   url: searchURL + word,
    //   dataType: 'json',      
    //   success: function(data) {          
    //     for (var i = 0; i < 10; i++) {
    //       var rsltUrl = data[3][i];
    //       var title = data[1][i];
    //       var quote = data[2][i];

    //       if (rsltUrl) {
    //         var rsltStr = "<div ><a target='_blank' href=" + rsltUrl + "><h4>" + title + "</h4><p>" + quote + "</p></a></div>";
    //         $(".show-rslt").append(rsltStr);
    //       }  
    //     }
    //   }
    // });

  // Display query search result through entire text   
    $.ajax({
        url: queryURL + word,
        dataType: 'jsonp',
        type: 'POST',
        success: function shwRslt(queRslt) {
          var pages = queRslt["query"]["search"];
            console.log(pages[0]);
          
          //variables from JSON
          // var results = queRslt.query.search;          
          
            for (var i = 0; i < queRslt.length; i++) {
              //add to html
              var resultTitle = '<h3 class="title">' + queRslt[i].title + '</h3>';
              // var resultSnip = '<p class="snippet">' + queRslt[i].snippet + '</p>';
              // var resultList = "<a class='list-group-item' href='https://en.wikipedia.org/wiki/" + queRslt[i].title + "' target='_blank'>" + resultTitle + resultSnip + "</a>";
              // $("ul").append(resultList).addClass("article");
              $("ul").append(resultTitle);
            }
                  
          //console.log("Success block");
        },
        error: function(error) {
          console.log(error);
        }
      });

  });

});