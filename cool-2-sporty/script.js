$(function () {
  var $hamburger = $('#hamburger');
  var $nav = $('#site-nav');

  // Impact-in sequence on the hero, staggered
  $('.impact').each(function (i) {
    var $el = $(this);
    setTimeout(function () { $el.addClass('impact-in'); }, 150 + i * 160);
  });

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

  var $revealTargets = $('.reveal');
  var countedStats = false;

  function countUpStats() {
    if (countedStats) return;
    countedStats = true;
    $('.stat-num').each(function () {
      var $el = $(this);
      var target = parseInt($el.data('count'), 10);
      $({ n: 0 }).animate({ n: target }, {
        duration: 1100,
        easing: 'swing',
        step: function (now) { $el.text(Math.ceil(now)); },
        complete: function () { $el.text(target); }
      });
    });
  }

  function revealInView() {
    var winBottom = $(window).scrollTop() + $(window).height() * 0.88;
    $revealTargets.each(function () {
      var $el = $(this);
      if ($el.hasClass('in-view')) return;
      if ($el.offset().top < winBottom) {
        $el.addClass('in-view');
        if ($el.find('.stat-num').length) countUpStats();
      }
    });
  }
  revealInView();
  $(window).on('scroll resize', revealInView);
  $(window).on('load', revealInView);
});
