(function ($) {
  $.fn.countdown = function (milliseconds, callback) {
    var $el = this;
    var buffer = 200;
    var end, timer;

    // Defaults
    milliseconds = milliseconds || 15 * 60 * 1000; // 5 minutes
    end = new Date(Date.now() + milliseconds + buffer);

    // Start the counter
    tick();

    function setTime(time) {
      if (time.getMinutes() < 10) {
        minutes = '0' + time.getMinutes();
      } else {
        minutes = time.getMinutes();
      }

      if (time.getSeconds() < 10) {
        seconds = '0' + time.getSeconds();
      } else {
        seconds = time.getSeconds();
      }

      $el.find('.minutes').html(minutes)
      $el.find('.seconds').html(seconds)
    }

    function tick() {
      var remaining = new Date(end - Date.now());

      if (remaining > 0) {
        setTime(remaining);
        timer = setTimeout(tick, 1000);
      } else {
        clearInterval(timer);
        if (callback) callback.apply($el);
      }
    };
  };

  //var valueCounter = $('[data-countdown]').data('value')
  $('[data-countdown]').countdown(/*valueCounter, function () {
    //this.addClass('finished')
    //this.find('.countdown__message').html("Time's up!");

  }*/);
})(jQuery);

