var getSimilarArtist = function (result) {
  var url = "https://api.spotify.com/v1/artists/" + result + "/related-artists";
  $.getJSON(url, function (data) {
    showResults(data, "#template");
  });
};

var searchArtist = function (query) {
  var url = "https://api.spotify.com/v1/search?q=" + query + "+&type=artist";
  $.getJSON(url, function (data) {
    showResults(data, "#artist-template");
    $(".artist-info").click(function (e) {
      e.preventDefault();
      var id = $(this).data("id");
      getSimilarArtist(id);
    });
  });
};

var showResults = function (results, templateName) {

  var source = $(templateName).html();
  var template = Handlebars.compile(source);
  var html = template(results);
  $(".artist-results").html(html);
};

$(document).ready(function () {
  $("#submitBtn").click(function () {
    var query = $("#query").val();
    searchArtist(query);
  });

});