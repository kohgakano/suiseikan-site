$(function () {
  var $hamburger = $('#hamburger');
  var $nav = $('#site-nav');

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

  // FAQ accordion
  $('.faq-q').on('click', function () {
    var $item = $(this).closest('.faq-item');
    var $answer = $item.find('.faq-a');
    var isOpen = $item.hasClass('open');

    $('.faq-item.open').not($item).each(function () {
      $(this).removeClass('open').find('.faq-q').attr('aria-expanded', 'false');
      $(this).find('.faq-a').slideUp(250);
    });

    $item.toggleClass('open', !isOpen);
    $(this).attr('aria-expanded', String(!isOpen));
    $answer.slideToggle(250);
  });

  // Reveal-on-scroll
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
  }
  revealInView();
  $(window).on('scroll resize', revealInView);
  $(window).on('load', revealInView);
});
