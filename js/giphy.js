$(document).ready(init);

function init() {
  $('#search button').on('click', function(evt) {
    evt.preventDefault();
    $('#gif-container').empty();
    $(window).scrollTop(0);
    var searchTerm = $('#keyword').val();
    searchTerm = searchTerm.replace(" ", "+");
    var page = 0;
    var pageLength = 10;
    console.log('from click');
    giphyCall(searchTerm, page, pageLength);
    addScrollListener(searchTerm, page, pageLength);
  });
}

function giphyCall(keyword, page, pageLength){
  var url = 'http://api.giphy.com/v1/gifs/search?q=' + keyword + '&offset=' + page * pageLength + '&limit=' + pageLength + '&api_key=dc6zaTOxFJmzC';
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json'
  }).done(function(res){
    var gif = res.data[0].images.downsized.url || res.data[0].images.original.url;
    appendGifs(res);
    console.log(res);
  })
    .fail(function(){
      console.log('failure to launch');
    })
    .always();
}

function appendGifs(gifs){
  gifs.data.forEach(function(gif){
    var image = gif.images.downsized.url || gif.images.original.url;
    $('#gif-container').append('<img src="' + image + '" class="gif">');
  });
}

function addScrollListener(keyword, page, pageLength){
  $(window).off();
  var pageNum = page;
  $(window).on("scroll", function(){
    if($(window).scrollTop() !== 0 && $(window).scrollTop() + $(window).height() === $(document).height()){
      console.log('scrolltop', $(window).scrollTop());
      console.log('window height', $(window).height());
      console.log('doc height', $(document).height());
      pageNum++;
      console.log(pageNum);
      console.log(pageLength);
      console.log('from scroll');
      giphyCall(keyword, pageNum, pageLength);
    }
  });
}
