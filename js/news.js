var apiKey = config.newskey;

function getNews() {
	var sources = localStorage.sourcelist;
	console.log("Sources: " + sources);
	$.getJSON( "https://newsapi.org/v2/top-headlines?sources=" + sources + "&apiKey=" + apiKey, function( data ) {
	  var items = [];
	  var i = 0;
	  var feed = data.articles;
	  feed = shuffle(feed);
	  $.each( data.articles, function( key, val ) {
		if (data.articles[i].urlToImage != null && data.articles[i].urlToImage != '') {
			var articleImg = data.articles[i].urlToImage;
		} else {
			var articleImg = 'img/news-icon.jpg';
		}
		items.push( '<div class="col-sm-12 col-md-4" style="padding-bottom: 30px;"><div class="card"><div class="view"><a class="external" href="' + data.articles[i].url + '" target="_blank"><img src="' + articleImg + '" style="width: 100%;" /></a></div><div class="card-body"><h4 class="card-title font-weight-bold">' + data.articles[i].title + '</h4><p class="card-text">' + data.articles[i].description + '</p><a class="external text-primary" href="' + data.articles[i].url + '" target="_blank">More on ' + data.articles[i].source.name + '<i class="mi mi-ChevronRight"></i></a></div></div></div>' );
		i++;
	  });
	 
	  $( "<div/>", {
		"class": "headlines row",
		html: items.join( "" )
	  }).appendTo( "#newslist" );
	  $('#loader').hide();
	});
}

var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

	for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
					return sParameterName[1] === undefined ? true : sParameterName[1];
			}
	}
}

function getCategory() {
	var category = getUrlParameter('category');
	$.getJSON( "https://newsapi.org/v2/top-headlines?country=us&category=" + category + "&apiKey=" + apiKey, function( data ) {
	  var items = [];
	  var i = 0;
	  var feed = data.articles;
	  feed = shuffle(feed);
	  $.each( data.articles, function( key, val ) {
		if (data.articles[i].urlToImage != null && data.articles[i].urlToImage != '') {
			var articleImg = data.articles[i].urlToImage;
		} else {
			var articleImg = 'img/news-icon.jpg';
		}
		items.push( '<div class="col-sm-12 col-md-4" style="padding-bottom: 30px;"><div class="card"><div class="view"><a class="external" href="' + data.articles[i].url + '" target="_blank"><img src="' + articleImg + '" style="width: 100%;" /></a></div><div class="card-body"><h4 class="card-title font-weight-bold">' + data.articles[i].title + '</h4><p class="card-text">' + data.articles[i].description + '</p><a class="external text-primary" href="' + data.articles[i].url + '" target="_blank">More on ' + data.articles[i].source.name + '<i class="mi mi-ChevronRight"></i></a></div></div></div>' );
		i++;
	  });
	  $( "<div/>", {
		"class": "headlines row",
		html: items.join( "" )
	  }).appendTo( "#newslist" );
	  $('#loader').hide();
	});
}

function getSearch(sortBy) {
	$("#newslist").html("");
	var search = getUrlParameter('search');
	var d = new Date();
	var f = d.toISOString();
	d.setDate(d.getDate() - 7);
	t = d.toISOString();
	$.getJSON( "https://newsapi.org/v2/everything?q=" + search + "&language=en&sortBy=" + sortBy + "&from=" + f + "&to=" + t + "&apiKey=" + apiKey, function( data ) {
	  var items = [];
	  var i = 0;
	  var feed = data.articles;
	  $.each( data.articles, function( key, val ) {
		if (data.articles[i].urlToImage != null && data.articles[i].urlToImage != '') {
			var articleImg = data.articles[i].urlToImage;
		} else {
			var articleImg = 'img/news-icon.jpg';
		}
		items.push( '<div class="col-sm-12 col-md-4" style="padding-bottom: 30px;"><div class="card"><div class="view"><a class="external" href="' + data.articles[i].url + '" target="_blank"><img src="' + articleImg + '" style="width: 100%;" /></a></div><div class="card-body"><h4 class="card-title font-weight-bold">' + data.articles[i].title + '</h4><p class="card-text">' + data.articles[i].description + '</p><a class="external text-primary" href="' + data.articles[i].url + '" target="_blank">More on ' + data.articles[i].source.name + '<i class="mi mi-ChevronRight"></i></a></div></div></div>' );
		i++;
	  });
	  $( "<div/>", {
		"class": "headlines row",
		html: items.join( "" )
	  }).appendTo( "#newslist" );
	  $('#loader').hide();
	});
}

$( "select" )
  .change(function() {
    var str = "";
    $( "select option:selected" ).each(function() {
      $( ".headlines" ).remove();
      getSearch($( this ).val());
    });
  })
  .trigger( "change" );

$('#searchsubmit').css('cursor','pointer');

$('#searchsubmit').click(function() {
	if($('#search').val()){
		var query = $('#search').val();
		window.location.replace("search.php?search=" + query);
	} else {
		$('#search').focus();
	}
})

$('#search').keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		var query = $('#search').val();
		window.location.replace("search.php?search=" + query);	
	}
});


$('#savesources').click(function() {
    var sel = $('input[type=checkbox]:checked').map(function(_, el) {
        return $(el).val();
    }).get();
    localStorage.setItem("sourcelist",sel);
})

function getSources() {
	$.getJSON( "https://newsapi.org/v2/sources?apiKey=" + apiKey, function( data ) {
	  var items = [];
	  var i = 0;
	  console.log(data.sources); 
	  $.each( data.sources, function( key, val ) {
		items.push( '<tr><td>' + data.sources[i].name + '</td><td><div class="form-check pl-0"><input class="checkbox form-check-input" type="checkbox" value="' + data.sources[i].id + '" id="' + data.sources[i].id + '" name="' + data.sources[i].id + '"><label class="form-check-label" for="' + data.sources[i].id + '"></label></div></td></tr>' );
		i++;
	  });
	 
	  $( "<tbody/>", {
		"class": "sources",
		html: items.join( "" )
	  }).appendTo( "#sourcelist" ); 
		var sourceArray = localStorage.sourcelist.split(',');
		$(".checkbox").each(function() { 
			if($.inArray($(this).val(), sourceArray) != -1) {
				$(this).attr('checked', true);
			} else {
				$(this).attr('checked', false);
			} 
		})
	});
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Listen for ALL links at the top level of the document. For
// testing purposes, we're not going to worry about LOCAL vs.
// EXTERNAL links - we'll just demonstrate the feature.
$(document).on(
	"click",
	"a",
	function(event){
		if(!$(this).hasClass("external")){
			event.preventDefault();
			if(!$(event.target).attr("href")){
				location.href = $(event.target).parent().attr("href");
			} else {
				location.href = $(event.target).attr("href");
			}
		} else {
		}
	}
);
