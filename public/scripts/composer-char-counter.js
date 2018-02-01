
// Character Counter. Changes ".counter" class styling to red when
// numbers become negative

$("document").ready( function() {
  $("section form textarea").keyup( function() {
    $(".counter").text(140 - this.value.length);
    let count = $(".counter").text();
    if(count < "0") {
      $(".counter").css("color", "red");
      console.log(count);
    } else {
      $(".counter").css("color", "#244751");
    }
  });
});