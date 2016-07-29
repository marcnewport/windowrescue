(function($) {

  'use strict';

  var $window = $(window);
  var $document = $(document);



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



    // Get the browser height
    var windowHeight = $window.height();
    // And on resize
    $window.on('resize', function() {
      windowHeight = $window.height();
    });


    // Add scroll listener
    $document.on('scroll', function(e) {

      var scrollTop = $document.scrollTop(),
          parallax = 0.3;

      // Add parallax effect to background images marked .parallax
      $('.parallax').each(function() {

        // Figure out there offset relative to the page scroll
        var $this = $(this),
            offsetTop = $this.position().top,
            $img = $this.find('.parallax-image'),
            diff = 0;

        if (scrollTop + windowHeight > offsetTop) {
          diff = (scrollTop + windowHeight) - offsetTop;
          $img.css({ top: '-'+ Math.round(diff * parallax) +'px' });
        }
      });
    })
    .trigger('scroll');


    // Reveal animation
    var sr = ScrollReveal();
    if (sr.isSupported()) {
      sr.reveal('.service, .contact-method', { duration: 1000 });
    }

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



   /**
    * Check if client supports CSS Transform and CSS Transition.
    * @return {boolean}
    */
    ScrollReveal.prototype.isSupported = function () {
      var style = document.documentElement.style;
      return 'WebkitTransition' in style && 'WebkitTransform' in style
        || 'transition' in style && 'transform' in style;
    }



  $document.ready(init);
}(jQuery));
