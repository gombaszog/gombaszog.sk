if ($(".ticket-form").length > 0) {
  var freeCities = ["92401", "92501", "92502", "92503", "92504", "92505", "92506", "92507", "92508", "92509", "92521", "92522", "92523", "92527", "92528", "92532", "92541", "92542", "92545", "92551", "92552", "92553", "92554", "92555", "92562", "92563", "92571", "92572", "92581", "92582", "92583", "92584", "92585", "92591", "92592", "92601", "92701", "92705", "95131", "95132", "95133"];
  captcha_reload = function() { // reload captcha image
    $('#ticket_captcha').css('background-image', 'url(/api/captcha?'+Date.now()+')');
    $('#ticket_captcha').val("");
  }
  getUrlVars = function() { // get url variables
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }
  loadVars = function() {
    $.getJSON("/api/ticket/available").done(function (data) {
      $.each(data.bus, function(k,v) {
        $("#ticket_bus").append(
          $('<option value="'+v.id+'" data-price="'+v.price+'">'+v.name+' (még '+v.free+' hely) +'+parseInt(v.price)+'&euro;</option>')
        );
      });
      $.each(data.housing, function(k,v) {
        $("#ticket_housing").append(
          $('<option value="'+v.id+'" data-price="'+v.price+'">'+v.name+(v.capacity > 0 ? ' ('+v.capacity+' ágyas)' : '')+' +'+parseInt(v.price)+'&euro;</option>')
        );
      });
      $.each(data.food, function(k,v) {
        $("#ticket_food").append(
          $('<option value="'+v.id+'" data-price="'+v.price+'">'+v.name+' +'+parseInt(v.price)+'&euro;</option>')
        );
      });
      $('#hetijegy').data('price', data.ticketweek);
      $('#napijegy').data('price', data.ticketday);
      $('#price').html(data.ticketweek);
    });
  }
  mark = function (e) {
    captcha_reload();
    $.each(e, function(k,v) {
      $("#ticket_"+k).addClass("has-error").change(function() {
        $(this).removeClass("has-error");
      });
    });
    if (e.email == "used") {
      alert("A megadott e-mail címet már használták egy jegyelővételhez! Minden megvásárolt jegyhez egyedi e-mail címet kell megadni!");
    } else if (e.email == "retry") {
      $("#ticket_email").removeClass("has-error");
      alert("Valamikor az elmúlt három órában már próbálkoztál egy jegyelővétellel, de nem jártál sikerrel. Az egyes újrapróbálkozások között minimum három órának kell eltelnie, tehát arra kérünk várd ki ezt az időt és később próbálkozz újra!");
    } else if (e.buyweek) {
      alert("Vegyél inkább hetijegyet, mivel ingyen van.");
    } else if (e.price || e.empty) {
      alert("A fizetendő összeg nem lehet 0€!");
    } else if (e.noday){
      alert("Nincs kiválasztva nap")
    } else if (e.wrongtype){
      alert("Rossz jegytípus van kiválasztva")
    } else alert("Hoppá! Az űrlapot hibásan töltötted ki, a javítandó mezőket megjelöltük pirossal!");
  }

  var addLeadingZeros = function(toWhat) {
    if (typeof toWhat !== "string" || toWhat.length > 1) {
      return toWhat;
    }
    return ("0" + toWhat);
  }

  var handleStupidBirtDateFormats = function() {
    var actDateTxt = $("#ticket_birth").val();
    if (!actDateTxt) return; // not yet filled
    if (/^(19[0-9]{2}|20[01][0-9])-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(actDateTxt)) return; // actually, good
    if (/^[^0-9]*(19[0-9]{2}|20[01][0-9])[^0-9]+(0?[1-9]|1[012])[^0-9]+(0?[1-9]|[12][0-9]|3[01])[^0-9]*$/.test(actDateTxt)) {
      // actually, almost good, correct it
      actDateTxt = actDateTxt.replace(/^.*(19[0-9]{2}|20[01][0-9])[^0-9]+(0?[1-9]|1[012])[^0-9]+(0?[1-9]|[12][0-9]|3[01])[^0-9]*$/, function(match, p1, p2, p3) {
        return addLeadingZeros(p1) + "-" + addLeadingZeros(p2) + "-" + addLeadingZeros(p3);
      });
      $("#ticket_birth").val(actDateTxt);
      calculateTicketPrice();
      return;
    }
    alert("A megadott dátum nem megfelelő formátumú. Kérlek, az alábbi módon add meg: ÉÉÉÉ-HH-NN, például 1991-04-21")
    return;
  }

  var calculateTicketPrice = function() {
    price = 0;
    if($('#ticket_category').val() == 'hetijegy'){
      price = !$('#ticket_category').is(':disabled') ? parseFloat($('#hetijegy').data('price')) : 0;
    }
    else if($('#ticket_category').val() == 'napijegy'){
      var countDays = 0;
      var countAllDays = 0;
      $('.days input').each(function(){
        if($(this).is(':checked')){
          
          countAllDays += 1;
          if(!$(this).is(':disabled')){
            countDays += 1;
          }
        }
      });
      price = parseFloat($('#napijegy').data('price')) * countDays;
      if((parseFloat($('#napijegy').data('price')) * countAllDays) >= parseFloat($('#hetijegy').data('price'))){
        alert("Elérted a hetijegy árát, inkább vegyél azt");
      }
    }
    var originalPrice = price;
    tmp = !$("#ticket_housing").is(':disabled') ? $("#ticket_housing option:selected").data('price') : 0;
    if (tmp) price += parseFloat(tmp);
    tmp =  !$("#ticket_food").is(':disabled') ? $("#ticket_food option:selected").data('price') : 0;
    if (tmp) price += parseFloat(tmp);
    tmp =  !$("#ticket_bus").is(':disabled') ? $("#ticket_bus option:selected").data('price') : 0;
    if (tmp) price += parseFloat(tmp);
    tmp = !$("#ticket_beer").is(':disabled') ? $("#ticket_beer").data('price') * Math.abs($("#ticket_beer").val()) : 0;
    if (tmp) price += parseFloat(tmp);
    // we keep this line with empty array to have it in the future
    tmp = ($.inArray($("#ticket_zip").val(), freeCities) > -1 ? -originalPrice : 0);
    // free if the birth date is before 1990
    // tmp = (Date.parse($("#ticket_birth").val()) < 631148400000 ? -originalPrice : 0);
    if (tmp) price += parseFloat(tmp);
    $('#price').html(price);
  }

  window.fbAsyncInit = function() {
    // initialize facebook
    FB.init({
      appId: '267323596708516',
      xfbml: true,
      status: true,
      version: 'v2.9'
    });
    // scroller
    $('.btn-pricing').click(function() {
      $('body,html').animate({
        scrollTop: $('.roll-here').offset().top
      }, "slow");
    });
    $('#btn-dayticket').click(function() {
      $("#ticket_category").val("napijegy");
      $('#select_days').fadeIn(500);
    });
    $('#btn-weekticket').click(function() {
      $("#ticket_category").val("hetijegy");
      $('#select_days').hide();
    });
    // calculate price
    $('.influence').on("change", calculateTicketPrice);
    $('#ticket_birth').on("change", handleStupidBirtDateFormats);
    // autoload captcha
    $('.re-captcha').click(captcha_reload);
    // facebook
    $('.ticket-fb').click(function() {
      $('form')[0].reset();
      captcha_reload();
      FB.login(function(response) { // log in
        if (response.authResponse) { // logged in
          FB.api('/me', {
              fields: ['last_name', 'first_name', 'email', 'location', 'birthday']
            }, function(profile) { // get user data
            $('#ticket_fb_token').val(response.authResponse['accessToken']);
            $('#ticket_fbid').val(profile.id);
            $('#ticket_email').val(profile.email);
            $('#ticket_first_name').val(profile.first_name);
            $('#ticket_last_name').val(profile.last_name);
            //$('#ticket_city').val((profile.hometown ? profile.hometown.name : null));
            $('#ticket_where').val((profile.location ? profile.location.name : null));
            if (profile.birthday) {
              var date = profile.birthday.split("/").reverse(); // preparse date
              $('#ticket_birth').val([date[0],date[2],date[1]].join("-"));
            }
            // show the form
            alert("Betöltöttük a Facebook adataidat, de kérünk még ellenőrizd, hogy megfelelnek-e a a valóságnak!");
            setTimeout(calculateTicketPrice, 1000);
            $(".ticket-hidden").slideToggle("slow");
          });
        }
      }, {scope: 'user_likes,email,user_birthday,user_hometown,user_location,public_profile'});
    });
    //manual
    if ( $('.ticket-orig').length > 0 ){
      $('form')[0].reset();
      $('#ticket_voucher').val(getUrlVars().voucher);
      captcha_reload();
      loadVars();
    }
    // submit
    $('form.ticket-orig').submit(function (e) {
      if ($("#ticket_gift").prop("checked") && $('#ticket_from').val() == '') {
        e.preventDefault();
        return alert("A továbblépéshez kérünk, add meg az ajándékozott e-mail címét.");
      }
      if (!$("#ticket_confirm_aszf").prop("checked")) {
        e.preventDefault();
        return alert("A továbblépéshez kérünk, fogadd el az általános szerződési feltételeinket és adatvédelmi irányelveinket.");
      }
      $('#buybutton').html("&nbsp;<i class=\"fa fa-spinner fa-spin\"></i>&nbsp;");
      ret = false;
      console.log($("form#ticket").serializeObject());
      $.ajax({
        url: '/api/ticket',
        type: 'POST',
        timeout: 2000,
        async: false,
        data: $("form#ticket").serializeObject(),
        dataType: 'json'
      }).done(function (data) {
        if (data.ok) {
          $("form#ticket").attr("action", "/jegyek/sikeres");
          ret = data.ok;
        } else {
          mark(data);
          $('#buybutton').html("&nbsp;Tovább&nbsp;");
          e.preventDefault();
        }
      });
      return ret;
    });

    $('form#ticket-barcode-find').submit(function (e) {
      e.preventDefault();
      var barcode = $('#barcode_find').val();
      $.ajax({
        url: '/api/ticket/find/'+barcode,
        type: 'GET',
        timeout: 2000,
        async: false,
        dataType: 'json'
      }).done(function (data) {
        if (data.redirect) {
          window.location.href = data.redirect;
        } else {
          alert("Nincs ilyen jegy vagy még nem volt kifizetve.");
        }
      });
    });

    $('#ticket').bind("keyup keypress", function(e) {
      var code = e.keyCode || e.which;
      if (code == 13) {
        e.preventDefault();
        return false;
      }
    });
  };

  $('#ticket_category').on('change', function(){
    if($('#ticket_category').val() == 'napijegy'){
      $('#select_days').fadeIn(500);
    }
    else{
      $('#select_days').hide();
    }
    $(".days").prop( "checked", false );
  });

  $('#ticket_gift').on('change', function(){
    $('#ticket_from_box').slideToggle(500);
  });

  $('#ticket_city').on('keyup',function(){
    if(this.value.length >= 3 && $('#ticket_country').val() == 'SK'){
      try{
        $.getJSON("https://velemjaro.sk/api/settlementsearchpublic/"+this.value).done(function (data) {
          if(data.success == true){
            $('#settlement_fill').html('');
            $.each(data.result, function(key,value) {
              if(key >= 5){
                return 'five';
              }
              else{
                var setlRow = document.createElement('div');
                setlRow.className = 'setlRow';
                setlRow.setAttribute('id','setlRow_'+key);
                setlRow.setAttribute('onclick','fillSettlement("setlRow_'+key+'")');
                var setlDivOne = document.createElement('div');
                var setlDivTwo = document.createElement('div');
                var setlNameHU = document.createElement('strong');
                  setlNameHU.className = 'setlNameHU';
                  setlNameHU.innerHTML = value.magyarnev;
                var setlNameSK = document.createElement('strong');
                  setlNameSK.className = 'setlNameSK';
                  setlNameSK.innerHTML = ', '+value.szlovaknev;
                var setlPSC = document.createElement('small');
                  setlPSC.className = 'setlPSC';
                  setlPSC.innerHTML = value.iranyitoszam;
                var setlJaras = document.createElement('small');
                  setlJaras.innerHTML = ' - '+value.jarasmnevi;

                setlDivOne.appendChild(setlNameHU);
                setlDivOne.appendChild(setlNameSK);
                setlRow.appendChild(setlDivOne);

                setlDivTwo.appendChild(setlPSC);
                setlDivTwo.appendChild(setlJaras);
                setlRow.appendChild(setlDivTwo);

                document.getElementById('settlement_fill').appendChild(setlRow);
              }
            });
            $('#settlement_fill').slideDown(500);
          }
          else{
            $('#settlement_fill').html('');
            $('#settlement_fill').slideUp(500);
          }
        });
      }
      catch(err){
        $('#settlement_fill').html('');
        $('#settlement_fill').slideUp(500);
      }
    }
    else{
      $('#settlement_fill').html('');
      $('#settlement_fill').slideUp(500);
    }
  });

  $(document).click(function(){
    $('#settlement_fill').hide();
  });

  $('#ticket_country').on('change', function(){
    $('#settlement_fill').html('');
    $('#settlement_fill').hide();
  });

  function fillSettlement(value){
    $('#ticket_city').val( $('#'+value+' .setlNameHU').html() );
    $('#ticket_zip').val( $('#'+value+' .setlPSC').html() );
    $('#settlement_fill').hide();
    $('#settlement_fill').html('');
  }

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  } (document, 'script', 'facebook-jssdk'));
}

getUrlVars = function() { // get url variables
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

jQuery(document).ready(function($){
  $(window).load(function() {
    if ($('#pay-form').length > 0) {
      $.getJSON("/api/ticket/paynow/"+getParameterByName("q")).done(function (data) {
        var msg = "";
        if(data.status == "waiting") {
          msg = "Kedves "+data.last_name+" "+data.first_name+", <br />a megrendelt jegy ára: "+data.amount+"&euro;";
          $('#ticket-addition').remove();
          $.each( data, function( key, val ) {
              $("#"+key).val(val);
          });
          $("#pay-form").removeClass("hidden-form");
        } else if(data.status == "dropped") {
          msg = "Kedves "+data.last_name+" "+data.first_name+", <br />a fizetés nem kezdeményezhető, mert lejárt a rendelés utáni időkeret. <a href=\"/jegyek/\">Kattints ide</a> új vásárlás indításához.";
        } else if(data.status == "completed") {
          msg = "Kedves "+data.ticket_last_name+" "+data.ticket_first_name+", <br />ezt a jegyet már kifizetted. <br>Ha szeretnél további elemeket venni, akkor kattints <a href=\"#\" onclick=\"$('.ticket-addition').fadeIn(500); $('#msg').hide(); setTimeout(calculateTicketPrice, 1100);\">ide</a>. <br> Ha nem találod a jegyed a postaládádban, kérünk, nézd meg a SPAM mappában, ha ott sem találod, írj a jegyek@gombaszog.sk címre!";
          $('#pay-form').remove();
          $('form')[0].reset();
          $('#ticket_voucher').val(getUrlVars().voucher);
          captcha_reload();
          loadVars();
          console.log(data);
          $.each( data, function( key, val ) {
            if(key == "ticket_nap_hetfo" || 
                key == "ticket_nap_kedd" || 
                key == "ticket_nap_szerda"  || 
                key == "ticket_nap_csutortok" || 
                key == "ticket_nap_pentek" || 
                key == "ticket_nap_szombat"){
                  if(val == 1){
                    $("#"+key).click()
                        .attr('disabled', 'disabled');
                  }
            }
            else{
              $("#"+key).val(val)
                        .change();
            }
            if(key == 'ticket_category' && val == "napijegy"){
              $('#select_days').fadeIn(500);
            }
            else if(key == 'ticket_category' && val == "hetijegy"){
              $(".days").prop( "checked", false );
              $('#ticket_category').attr('disabled', 'disabled');
              $('#ticket_voucher').attr('disabled', 'disabled');
            }
            if(key == 'ticket_tent' && val == true){
              $('#ticket_housing').val('0')
                                  .attr('disabled', 'disabled')
            }
            else if(key == 'ticket_housing_id' && val != null){
              $('#ticket_housing').val('0')
                                  .attr('disabled', 'disabled')
            }
            if(key == 'ticket_bus' && val != null){
              setTimeout( function(){
                $("#"+key).attr('disabled', 'disabled');
                $("#"+key).val(val)
                          .change();
              }, 1000);
            }
          });
        } else {
          msg = "A jegy nem található. Kérlek, ellenőrizd a linket, vagy lépj kapcsolatba velünk a jegyek@gombaszog.sk címen.";
        }
        $('#msg').html(msg);
      });



      $('form.ticket-addition').submit(function(e){
        if (!$("#ticket_confirm_aszf").prop("checked")) {
          e.preventDefault();
          return alert("A továbblépéshez kérünk, fogadd el az általános szerződési feltételeinket és adatvédelmi irányelveinket.");
        }
        $('#buybutton').html("&nbsp;<i class=\"fa fa-spinner fa-spin\"></i>&nbsp;");
        ret = false;
        console.log($("form#ticket-addition").serializeObject());
        $.ajax({
          url: '/api/ticket/addition',
          type: 'POST',
          timeout: 2000,
          async: false,
          data: $("form#ticket").serializeObject(),
          dataType: 'json'
        }).done(function (data) {
          if (data.ok) {
            $("#ticket_amount").val(data.amount);
            $("#ticket_first_name").attr("name", "first_name");
            $("#ticket_last_name").attr("name", "last_name");
            $("form#ticket").attr("action", "/jegyek/sikeres");
            ret = data.ok;
          } else {
            mark(data);
            $('#buybutton').html("&nbsp;Tovább&nbsp;");
            e.preventDefault();
          }
        });
        
        return ret;
      })
    }
  });
});
