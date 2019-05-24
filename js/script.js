$('#playTrailer').on('click', function() {
  $('#myModal').css('display', 'block');
});

$('.close').first().on('click',  function() {
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