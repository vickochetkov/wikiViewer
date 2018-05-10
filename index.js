// window.onload = function() {
//  document.getElementById("searchForm").focus();
// };

$(document).ready(function() {
  $('#searchForm').focus();

  // Wiki Search

  $(".button").on("keypress", function() {
    $(".show-rslt").empty();
    var word = $("#searchForm").val();
    var uRL = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=";
    $.ajax({
        url: uRL + word,
        // data: word,
        dataType: 'json',      
        success: function(data) {
          console.log(data);
          console.log(word);
          // if () {

          // }
          for (var i = 0; i < 10; i++) {
            var searchUrl = data[3][i];
            var title = data[1][i];
            var quote = data[2][i];

           var html = "<div ><a target='_blank' href=" + searchUrl + "><h4>" + title + "</h4>" + quote + "</a></div>";
             $(".show-rslt").append(html);
           }
          // $('.show-rslt').html("<p>" + data + "</p>");
        }
    });
  });

});