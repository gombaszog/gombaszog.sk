if ($("#sajto-hirek").length > 0) {
  var sajto_data = {};
  var sajto_data_rows = 0;
  var sajto_page_size = 9;

  function sajto_page(page_active) {
    $("#sajto-hirek").empty();
    for(var i=(page_active-1)*sajto_page_size+2; i < (page_active)*sajto_page_size+2 && i<=sajto_data_rows; i++)
      $("#sajto-hirek").append('<li><strong>'+sajto_data[i]['B']+'</strong>: <a href="'+sajto_data[i]['E']+'" target="_blank">'+sajto_data[i]['D']+'</a></li>');

    $("#sajto-pages").empty();
    /*for(var i=1; i < sajto_data_rows/sajto_page_size+1; i++)
        $("#sajto-pages").append('<li' + (i==page_active ? ' class="active"':'') + '><a href="javascript:sajto_page(' + i + ');">' + i + '</a></li>');*/
    if(page_active!=1)
      $("#sajto-pages").append('<li><a href="javascript:sajto_page(' + (-1+page_active) + ');">Újabbak</a></li>');
    if(page_active <= sajto_data_rows/sajto_page_size)
      $("#sajto-pages").append('<li><a href="javascript:sajto_page(' + (1+page_active) + ');">Régebbiek</a></li>');
  }

  $.getJSON("https://spreadsheets.google.com/feeds/cells/1PVopI292rFYQppL-LeMRec8RkAKuJBDBtWMxViIu5T0/od6/public/basic?alt=json").done(function (data) {
    data.feed.entry.forEach(function(e) {
        if ( e.title.$t.replace(/[0-9]+/, '')=='A' ) {
          sajto_data[++sajto_data_rows] = {};
        }
        sajto_data[sajto_data_rows][e.title.$t.replace(/[0-9]+/, '')] = e.content.$t;
        if( e.title.$t.replace(/[0-9]+/, '')=='F' && e.content.$t=='0' ){
          sajto_data_rows--;
        }
    });
    sajto_page(1);
  });

}

if ($("#stream1").length > 0) {
  var stream_data = {};
  var stream_data_rows = 0;
  var stream_page_size = 4;
  var on_stream = [0, 0, 0, 0];
  var vid_k = 1000;

  function stream_page(page_active) {
    var j=0;
    var new_on_stream = [];

    for(var i=2; i<=stream_data_rows; i++) {
        if(typeof(stream_data[i]['A']) != "undefined") sa = stream_data[i]['A']; else continue;
        new_on_stream.push(sa);
        j++;
        if(j >= stream_page_size) break;
    }

    if (on_stream[0] == new_on_stream[0] && on_stream[1] == new_on_stream[1] && on_stream[2] == new_on_stream[2] && on_stream[3] == new_on_stream[3])
        return;

    on_stream = new_on_stream;

    j = 0;
    s = "<ul id='stream1'>";
    for(var i=2; i<=stream_data_rows; i++) {
        if(typeof(stream_data[i]['A']) != "undefined") sa = stream_data[i]['A']; else continue;
        if(typeof(stream_data[i]['B']) != "undefined") sb = stream_data[i]['B']; else sb = '';
        if(typeof(stream_data[i]['C']) != "undefined") sc = stream_data[i]['C']; else sc = '';
        if(typeof(stream_data[i]['D']) != "undefined") sd = stream_data[i]['D']; else sd = '';
        if(typeof(stream_data[i]['E']) != "undefined") se = stream_data[i]['E']; else se = '';
        s += '<li><div class="streamhead"><div class="time pull-left">'+sb+'</div><div class="title">'+sc+'</div></div><div class="placc">'+sd+'</div><div class="desc">'+se+'</div></li>';
        j++;
        if(j >= stream_page_size) break;
    }
    s += '</ul><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>';
    $("#stream1").replaceWith(s);
  }

  setInterval(function() {
    vid_k += 1;
    if (vid_k > 20) vid_k = 0; else return;
    $.getJSON("https://spreadsheets.google.com/feeds/cells/17kEAvFhsO2V9IArCfsjqfrHmyqw3ZRKcXL_egH8j6qY/od6/public/basic?alt=json").done(function (data) {
      stream_data = {};
      data.feed.entry.forEach(function(e) {
          if (typeof(stream_data[parseInt(e.title.$t.replace(/[A-Z]+/, ''))]) == 'undefined') {
            stream_data[parseInt(e.title.$t.replace(/[A-Z]+/, ''))] = {};
            stream_data_rows += 1;
          }
          stream_data[parseInt(e.title.$t.replace(/[A-Z]+/, ''))][e.title.$t.replace(/[0-9]+/, '')] = e.content.$t;
      });

      stream_page(1);
    });
  },500);

}
