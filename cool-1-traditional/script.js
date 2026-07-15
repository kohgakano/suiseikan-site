$(function () {
  var $header = $('#site-header');
  var $hamburger = $('#hamburger');
  var $nav = $('#site-nav');
  var $brush = $('#brush-line');

  function updateHeader() {
    if ($(window).scrollTop() > 40) {
      $header.addClass('scrolled');
    } else {
      $header.removeClass('scrolled');
    }
  }
  updateHeader();
  $(window).on('scroll', updateHeader);

  $hamburger.on('click', function () {
    $(this).toggleClass('open');
    $nav.toggleClass('open');
    var expanded = $(this).attr('aria-expanded') === 'true';
    $(this).attr('aria-expanded', String(!expanded));
  });

  $nav.find('a').on('click', function () {
    $hamburger.removeClass('open').attr('aria-expanded', 'false');
    $nav.removeClass('open');
  });

  // Reveal-on-scroll for .reveal elements and the brush-stroke signature line
  var $revealTargets = $('.reveal');

  function revealInView() {
    var winBottom = $(window).scrollTop() + $(window).height() * 0.88;
    $revealTargets.each(function () {
      var $el = $(this);
      if ($el.hasClass('in-view')) return;
      if ($el.offset().top < winBottom) {
        $el.addClass('in-view');
      }
    });
    if (!$brush.hasClass('drawn') && $brush.offset().top < winBottom) {
      $brush.addClass('drawn');
    }
  }
  revealInView();
  $(window).on('scroll resize', revealInView);
  $(window).on('load', revealInView);
});
