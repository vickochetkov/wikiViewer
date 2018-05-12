// makes focus is given to the search box (HTML DOM)
// window.onload = function() {
//  document.getElementById("searchForm").focus();
// };


// makes focus is given to the search box (jQuery)
$(document).ready(function() {
  $('#searchForm').focus();

  // Wiki Search
  $(".button").on("keydown", function() {
    $(".list-group").empty();
    var word = $("#searchForm").val();
    var searchURL = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=";
    var queryURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=";

    if (word.length !== 0) {
  
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
              var rslt = "<a class='list-group-item list-group-item-action list-group-item-warning' href='" + rsltLink + "' target='_blank'><i><h4 style='color: green'>" + titleDisamb + "</h4><p>" + quoteDisamb + "</p></a>";
              $("ul").html(rslt);
            }
          }
      });

      if (document.getElementById("titlesOnlySearchCheck").checked){

    // Display search through titles result
        $.ajax({
          url: searchURL + word,
          dataType: 'json',      
          success: function(data) {          
            for (var i = 0; i < 10; i++) {
              var rsltUrl = data[3][i];
              var title = data[1][i];
              var quote = data[2][i];

              if (rsltUrl) {                
                var rsltStr = "<a class='list-group-item list-group-item-action list-group-item-primary' href='" + rsltUrl + "' target='_blank'><h4>" + title + "</h4><p>" + quote + "</p></a>";
                $("ul").append(rsltStr);
              }  
            }
          }
        });
      } else {
    // Display query search result through the entire text   
        $.ajax({
          url: queryURL + word,
          dataType: 'json',
          success: function shwRslt(queRslt) {
            var pages = queRslt.query.search; // obj "search" in obj queRslt["query"]
            
            for (var i = 0; i < 10; i++) {
              if (pages) {
                var pageid = pages[i].pageid;
                var resultTitle = '<h3 class="title">' + pages[i].title + '</h3>';
                var resultSnip = '<p class="snippet">' + pages[i].snippet + '</p>';
                var resultList = "<a class='list-group-item list-group-item-action list-group-item-primary' href='https://en.wikipedia.org/?curid=" + pageid + "' target='_blank'>" + resultTitle + resultSnip + "</a>";
                $("ul").append(resultList);
              }
            }
          }        
        });
      }
    }  
  });

});