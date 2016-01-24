(function($) {

  'use strict';



  /**
   * Scripts to run once the document has loaded
   */
  var init = function() {

    // Listen for when new sections scroll into view
    $('.navbar').on('activate.bs.scrollspy', function(e) {
      // Change navbar color outside of #home
      if (e.target.children[0].hash === '#home') {
        $(this).removeClass('navbar-solid');
      }
      else {
        $(this).addClass('navbar-solid');
      }
    })
    // Add smooth scrolling to all links inside a navbar
    .find('a').on('click', smoothScroll);

    // Smooth scrolling from main button
    $('#home').find('.btn-primary').on('click', smoothScroll);





    var $services = $('#services');
    var delay = 0;
    var animated = false;
    var threshold = Math.round($services.position().top - ($(window).height() / 2));

    // Make icons small so we can animate them to normal size
    $services.find('.service').css({
      transform: 'scale(0.5)'
    });

    // Add scroll listener
    $(document).on('scroll', function(e) {
      // Animate some elements inside a section
      if (document.body.scrollTop > threshold && ! animated) {
        $('#services').find('.service').each(function() {
          var $service = $(this);
          setTimeout(function() {
            $service.css({
              transform: 'scale(1)'
            });
          }, delay);
          delay += 200;
        });
      }

      // Add parallax effect to background images marked .parallax
      $('.parallax').each(function() {
        // Figure out there offset relative to the page scroll
        var $this = $(this),
            oTop = $this.position().top,
            sTop = document.body.scrollTop,
            parallax = 0.4,
            position = (sTop - oTop) * parallax;

        // Some images need a bigger offset
        switch ($this.attr('id')) {
          case 'img-break':
            position -= 180;
            break;
        }

        $this.css({ backgroundPosition: 'center '+ Math.round(position) +'px' });
      });
    });

    // Convert SVG images to inline SVG
    // $('img.svg').each(inlineSVG);
  };



  /**
   * Swaps out SVG images with inline SVG so we can style it with CSS
   */
  var inlineSVG = function() {

    var $img = $(this),
        imgID = $img.attr('id'),
        imgClass = $img.attr('class'),
        imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }

        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');
        // Replace image with new SVG
        $img.replaceWith($svg);
    }, 'xml');
  };



  /**
   * Animates the scroll when an an anchor is clicked
   */
   var smoothScroll = function(e) {

     var hash = this.hash;

     $('html, body').animate({
       scrollTop: $(hash).offset().top
     },
     800,
     function() {
       window.location.hash = hash;
     });

     e.preventDefault();
   };



  $(document).ready(init);
}(jQuery));
