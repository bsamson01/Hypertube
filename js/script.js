$('#playTrailer').on('click', function() {
  $('#myModal').css('display', 'block');
});

$('.close').first().on('click',  function() {
    $('#myModal').css('display', 'none');
});