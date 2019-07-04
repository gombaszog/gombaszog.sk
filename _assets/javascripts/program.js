$(window).load(function () {

  $(".day-set a").click(function (e) {
    $('.program-pont').each(function () {
      $(this).show();
      //$(this).addClass('two_active');
      $(this).removeClass('two_active');
    });
    $('.filter').each(function () {
      $(this).find("li").each(function () {
        $(this).addClass('active');
      });
    });
    is_all_active = true;
  });

  $(".programlist").touchwipe({
    wipeLeft: function () {
      console.log('left')
      if ($(".day-set.active").next())
        $(".day-set.active").next().find('a').click()
    },
    wipeRight: function () {
      if ($(".day-set.active").prev())
        $(".day-set.active").prev().find('a').click()
    },
    min_move_x: 20,
    min_move_y: 20,
    preventDefaultEvents: true
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
