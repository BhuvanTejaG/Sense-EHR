$(function($) {
  $(".knob").knob({
    change: function(value) {
      //console.log("change : " + value);
    },
    release: function(value) {
      //console.log(this.$.attr('value'));
      console.log("release : " + value);
    },
    cancel: function() {
      console.log("cancel : ", this);
    },
  });
  // Example of infinite knob, iPod click wheel
  var v, up = 0,
    down = 0,
    i = 0,
    $idir = $("div.idir"),
    $ival = $("div.ival"),
    incr = function() {
      i++;
      $idir.show().html("+").fadeOut();
      $ival.html(i);
    },
    decr = function() {
      i--;
      $idir.show().html("-").fadeOut();
      $ival.html(i);
    };
  $("input.infinite").knob({
    min: 0,
    max: 20,
    stopper: false,
    change: function() {
      if (v > this.cv) {
        if (up) {
          decr();
          up = 0;
        } else {
          up = 1;
          down = 0;
        }
      } else {
        if (v < this.cv) {
          if (down) {
            incr();
            down = 0;
          } else {
            down = 1;
            up = 0;
          }
        }
      }
      v = this.cv;
    }
  });
});