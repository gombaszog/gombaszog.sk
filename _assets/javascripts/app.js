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
 *= require poll.js
 *= require christmas_ticket.js
 */

String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

jQuery(document).ready(function($){
  $(window).load(function() {

    // auto add target="_blank" for foreign links
    $(document.links).filter(function() {
      return this.hostname != window.location.hostname;
    }).attr('target', '_blank');

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
        template: '<li style="background-image:url({'+'{image}'+'});"><a href="{'+'{link}'+'}" target=_blank>&nbsp;</a></li>',
        userId: 192561160
    }).run();

    // program filter
    $(".program .filter li a").click(function(e) {
      e.preventDefault();
      li = $(this).parent();
      if (li.hasClass("alltoggle")){
        $('.programlist').find("div").each(function(){
          $(this).removeClass('one_hide');
          $(this).removeClass('two_hide');
          $(this).show();
        });
        $('.filter').find("li").each(function(){
          $(this).addClass('active');
        });
      }
      else{
        liatr = $("."+li.attr('data-toggle'));
        li.toggleClass('active');
        if(!li.hasClass('active')){
          if(liatr.hasClass('one_hide')){
            liatr.removeClass('one_hide');
            liatr.addClass('two_hide');
          }
          else{
            liatr.hide();
            liatr.addClass("one_hide");
          }
        }
        else{
          if(liatr.hasClass('one_hide')){
            liatr.removeClass('one_hide');
            liatr.show();
          }
          else if(liatr.hasClass('two_hide')){
            liatr.addClass('one_hide');
            liatr.removeClass('two_hide');
          }
        }
      }
    });
    /*
    $(".program .filter li a").click(function(e) {
      e.preventDefault();
      li = $(this).parent();
      li.toggleClass('active');
      is_active = false;
      li.parent().find('li').each(function(f) {
        if ($(this).hasClass('active')) {
            is_active = true;
        }
      });

      if(is_active) {
        li.parent().find('li').each(function(f) {
          if ($(this).hasClass('active')) {
              $("."+$(this).data("toggle")).show();
          } else {
              $("."+$(this).data("toggle")).hide();
          }
        });
      } else {
        li.parent().find('li').each(function(f) {
          $("."+$(this).data("toggle")).show();
        });
      }
    });
*/
  });
});


// form serializer
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
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
$(window).scroll(function(){
     var shouldBeVisible = $(window).scrollTop()>100;
     if (shouldBeVisible && !isVisible) {
          isVisible = true;
          $('#buy-ticket').css( "visibility", "visible" );
     } else if (isVisible && !shouldBeVisible) {
          isVisible = false;
          $('#buy-ticket').css( "visibility", "hidden" );
    }
});
