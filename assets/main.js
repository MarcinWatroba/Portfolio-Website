$(".image-container").on("click", function() {
    let name = $(this).find("img").attr("src");
    
    $("#overlay").show();
    $(".overlay-image").show();
    $(".overlay-image").attr('src', name);
    console.log(name);
});

$("#overlay").on("click", function() {
    $(".overlay-image").hide();
    $("#overlay").hide();
});

$(document).keyup(function(e) {
  if (e.keyCode === 27) { 
    $(".overlay-image").hide();
    $("#overlay").hide();
  }
});

