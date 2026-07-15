$(function () {
  var $hamburger = $('#hamburger');
  var $nav = $('#site-nav');
  var $pathLine = $('.path-line');

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

  var $revealTargets = $('.reveal, .reveal-pop');

  function revealInView() {
    var winBottom = $(window).scrollTop() + $(window).height() * 0.88;
    $revealTargets.each(function (i) {
      var $el = $(this);
      if ($el.hasClass('in-view')) return;
      if ($el.offset().top < winBottom) {
        var delay = $el.closest('.level-path, .feature-chips').length ? i % 4 * 90 : 0;
        setTimeout(function () { $el.addClass('in-view'); }, delay);
      }
    });
    if (!$pathLine.hasClass('drawn') && $pathLine.offset().top < winBottom) {
      $pathLine.addClass('drawn');
    }
  }
  revealInView();
  $(window).on('scroll resize', revealInView);
  $(window).on('load', revealInView);
});
