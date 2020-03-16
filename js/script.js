$('.playVideo').each(function(){
  $(this).on('click', function() {
    $('#trailerFrame').attr("src", $(this).data("trailer"));
    $('#myModal').css('display', 'block');
  });
});

$('.close').first().on('click',  function() {
  $('#trailerFrame').attr("src", "");
    $('#myModal').css('display', 'none');
});

$("article.movie-poster").hover(function() {
  $(this).siblings("article.movie-details").css('display', 'block');
}, function() {
  $(this).siblings("article.movie-details").css('display', 'none');
});

$("article.movie-details").hover(function() {
  $(this).css('display', 'block');
}, function() {
  $(this).css('display', 'none');
});