(function($) {
  "use strict";

  $(document).ready(function() {

    // BS Caroussel
    $('.carousel').carousel({
      interval: 30000,
      pause: "hover"
    });


    // Parallax Effect
    function parallax() {
      var scrollPosition = $(window).scrollTop();
      $('#parallax').css('top', (50 - (scrollPosition * 0.5)) + 'px'); // bg image moves at 30% of scrolling speed
      $('#hero').css('opacity', ((200 - scrollPosition / 2) * 0.01));
    }

    $(window).on('scroll', function() {
        parallax();
    });


    //  Animation with Waypoints
    var animate_start = function($this) {
      $this.find('.animate').each(function(i) {
        var $item = jQuery(this);
        var animation = $item.data("animate");

        $item.waypoint(function() {
          $item.css({
            '-webkit-animation-delay': (i * 0.1) + "s",
            '-moz-animation-delay': (i * 0.1) + "s",
            '-ms-animation-delay': (i * 0.1) + "s",
            '-o-animation-delay': (i * 0.1) + "s",
            'animation-delay': (i * 0.1) + "s"
          });
          $item.removeClass('animate').addClass('animated ' + animation).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            jQuery(this).removeClass(animation + ' animated');
          });
        }, {
          offset: '80%',
          triggerOnce: true
        });
      });
    };

    jQuery(window).load(function() {
      $('.section').each(function() {
        animate_start($(this));
      });
    });


    // Open modal after submit
    $('#register_form').submit(function(e){
      e.preventDefault();
      $('#confirmModal').modal();
    });


    // Adds options date, month and year values to form.
    // function addOption(selectbox, text, value) {
    //   var optn = document.createElement("option");
    //   optn.text = text;
    //   optn.value = value;
    //   selectbox.options.add(optn);
    // }

    // function addOption_list() {
    //   for (var i_year=1998; i_year > 1908; --i_year) {
    //     addOption(document.register_form.year_list,i_year,i_year);
    //   }
    // }

    // addOption_list();

  });

})(jQuery);
