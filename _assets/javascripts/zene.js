if ($("#dalnap").length > 0) {

  window.fbAsyncInit = function () {
    FB.init({
      appId: '267323596708516',
      xfbml: true,
      status: true,
      version: 'v2.0'
    });
    if (window.location.hash == "#dalnap" && $("#dalnap").length > 0) {
      $('#dalnap').modal('show');
    }

    $("#dalnap .band").each(function (k, v) {
      $.getJSON("https://graph.facebook.com/" + $(v).data("photo") + "/likes?summary=1", function (r) {
        $(v).find(".likes-num").html(r.summary.total_count);
      });
      $(v).find(".like-button").click(function (e) {
        e.preventDefault();
        FB.login(function (response) {
          FB.api({
            method: 'fql.query',
            query: 'SELECT user_id FROM like WHERE object_id = ' + $(v).data("photo") + ' AND user_id = me()'
          }, function (result) {
            if (result.length == 0) {
              FB.api('/' + $(v).data("photo") + '/likes', 'post', function (result) {
                $(v).find(".likes-num").html(parseInt($(v).find(".likes-num").html()) + 1);
              });
            }
          });
        }, {
          scope: 'publish_actions,user_likes'
        });
      });
    });
  };

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

}
