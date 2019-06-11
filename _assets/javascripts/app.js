/*
 *= require vendor/bootstrap
 *= require vendor/jquery.fitvids
 *= require vendor/main
 *= require vendor/coundown-timer
 *= require vendor/jquery.flexslider
 *= require vendor/select2
 *= require vendor/select2_locale_hu
 *= require vendor/instafeed
 *= require jegyek.js
 *= require livecam.js
 *= require zene.js
 *= require sajto.js
 *= require terkep.js
 */
// require poll.js
// require christmas_ticket.js

String.prototype.hashCode = function () {
  var hash = 0,
    i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

jQuery(document).ready(function ($) {
  $(window).load(function () {

    // auto add target="_blank" for foreign links
    $(document.links).filter(function () {
      return this.hostname != window.location.hostname;
    }).attr('target', '_blank');

    // open modal if it is received in hash
    var target = document.location.hash.replace("#", "");
    if (target && target.length && /^modal-.+/gi.test(target)) {
      var realLink = target.replace(/^modal-/gi, "");
      $('#' + realLink).modal('show');
    }

    // The slider being synced must be initialized first
    $('#carousel').flexslider({
      animation: "slide",
      controlNav: false,
      animationLoop: false,
      slideshow: false,
      itemWidth: 41,
      itemMargin: 0,
      asNavFor: '#slider'
    });

    $('#slider').flexslider({
      directionNav: false,
      animation: "fade",
      controlNav: false,
      animationLoop: false,
      slideshow: false,
      sync: "#carousel"
    });
    $('.info-tooltip').tooltip(); // tooltips
    $('.select2').select2(); // select2

    //Gallery
    if ($('#instafeed').length > 0) new Instafeed({
      get: 'user',
      limit: 6,
      clientId: '4dab09420e6843b6a067bf29bdc07508',
      template: '<li style="background-image:url({' + '{image}' + '});"><a href="{' + '{link}' + '}" target=_blank>&nbsp;</a></li>',
      userId: 192561160
    }).run();

    // program filter
    $(".day-set a").click(function (e) {
      $('.program-pont').each(function () {
        $(this).show();
        $(this).addClass('two_active');
        $(this).removeClass('two_active');
      });
      $('.filter').each(function () {
        $(this).find("li").each(function () {
          $(this).addClass('active');
        });
      });
      is_all_active = true;
    });

    is_all_active = true;
    no_active_record = false;
    $(".program .filter li a").click(function (e) {
      e.preventDefault();
      li = $(this).parent();
      liattr = li.attr('data-toggle');
      liattr = $("." + liattr);
      if (li.hasClass("alltoggle")) {
        is_all_active = true;
        $('.programlist').find($('.program-pont')).each(function () {
          $(this).show();
          $(this).addClass('two_active');
        });
        $('.filter').find("li").each(function () {
          $(this).addClass('active');
        });
      } else {
        if (is_all_active) {
          $('.filter').find("li").each(function () {
            if ($(this).hasClass('active')) {
              if (!$(this).hasClass('alltoggle')) {
                $(this).removeClass('active');
              }
            }
          });
          li.addClass('active');
          is_all_active = false;
          $('.programlist').find($('.program-pont')).each(function () {
            $(this).hide();
            $(this).removeClass('two_active');
          });
          liattr.show();
          liattr.addClass("one_active");
        } else {
          if (li.hasClass('active')) {
            li.removeClass('active');
            if (liattr.hasClass('one_active')) {
              liattr.hide();
              liattr.removeClass('one_active');
            } else if (liattr.hasClass('two_active')) {
              liattr.removeClass('two_active');
              liattr.addClass('one_active');
            }
          } else {
            li.addClass('active');
            liattr.show();
            if (liattr.hasClass('one_active')) {
              liattr.addClass('two_active');
              liattr.removeClass('one_active');
            } else {
              liattr.addClass('one_active');
            }
          }
        }
      }
      $(li.parent()).find("li").each(function () {
        if (($(this).hasClass('active')) && (!$(this).hasClass('alltoggle'))) {
          no_active_record = false;
          return false;
        } else {
          no_active_record = true;

        }
      });
      if (no_active_record) {
        is_all_active = true;
        $('.programlist').find($('.program-pont')).each(function () {
          $(this).show();
          $(this).addClass('two_active');
        });
        $('.filter').find("li").each(function () {
          $(this).addClass('active');
        });
      }
    });


  });
});


// form serializer
$.fn.serializeObject = function () {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function () {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};


var isVisible = false;
$(window).scroll(function () {
  var shouldBeVisible = $(window).scrollTop() > 100;
  if (shouldBeVisible && !isVisible) {
    isVisible = true;
    $('#buy-ticket').css("visibility", "visible");
  } else if (isVisible && !shouldBeVisible) {
    isVisible = false;
    $('#buy-ticket').css("visibility", "hidden");
  }
});
