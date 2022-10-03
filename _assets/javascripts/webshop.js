jQuery(document).ready(function ($) {
	if ($("#order").length > 0) {
		let price = 0;
		let mark = function (e) {
			captcha_reload();
			$.each(e, function (k, v) {
				$("#order" + k).addClass("has-error").change(function () {
					$(this).removeClass("has-error");
				});
			});
		}

		var calculateOrderPrice = function (shipping_price = 0) {
			let tempPrice = 0;
			let tmp = price;
			if (tmp) tempPrice += parseFloat(tmp);
			tmp = shipping_price;
			if (tmp) tempPrice += parseFloat(tmp);
			$('#price').html(tempPrice);
		}
		let captcha_reload = function () { // reload captcha image
			$('#order_captcha').css('background-image', 'url(/api/captcha?' + Date.now() + ')');
			$('#order_captcha').val("");
		}

		$.getJSON("/api/order/item/" + getParameterByName("id")).done(function (data) {
			price = data.price;
			$("#product_list").append(`<tr class='item_${data.id}'></tr>`);
			$(`#product_list .item_${data.id}`).append(`<td><img src='https://placekitten.com/200/287'  style='max-width:50px' alt=${data.name} /></td>`);
			$(`#product_list .item_${data.id}`).append(`<td style='vertical-align:middle'>${data.name}</td>`);
			$(`#product_list .item_${data.id}`).append(`<td style='vertical-align:middle'>${data.price}</td>`);
			$(`#product_list .item_${data.id}`).append(`<td style='vertical-align:middle'>1 db</td>`);
			$("#order_form").append(`<input type='hidden' value=${data.id} name='order[product]'/>`);
			calculateOrderPrice();
		})

		$.getJSON("/api/order/shipping").done(function (data) {
			$(`#shippingModes`).append('<table class="table table-responsive"></table>');
			$(`#shippingModes table`).append('<tr class="shippingHead"></tr>');
			$(`#shippingModes table .shippingHead`).append('<th>&nbsp;</th><th>Szállítási mód</th><th>Ár</th>');
			$.each(data, function (k, d) {
				$("#shippingModes table").append(`<tr class='shipping_${d.id}'></tr>`);
				$(`#shippingModes table .shipping_${d.id}`).append(`<td><input style='vertical-align:middle' type="radio" class='shipping_toggle' name="order[shipping]" value="${d.id}"</td>`);
				$(`#shippingModes table .shipping_${d.id}`).append(`<td>${d.name}<br><small>${d.description}</small></td>`);
				$(`#shippingModes table .shipping_${d.id}`).append(`<td>${d.price} &euro;</td>`);
				$(`.shipping_${d.id}`).click(function () {
					calculateOrderPrice(d.price);
				});
			})
		})

		$("order_form").show()

		// autoload captcha
		captcha_reload();

		$('form#order_form').submit(function (e) {
			e.preventDefault();
			calculateOrderPrice();
			if (!$("#order_confirm_aszf").prop("checked")) {
				e.preventDefault();
				return alert("A továbblépéshez kérünk, fogadd el az általános szerződési feltételeinket és adatvédelmi irányelveinket.");
			}
			$('#buybutton').html("&nbsp;<i class=\"fa fa-spinner fa-spin\"></i>&nbsp;");
			ret = false;
			var obj = $("form#order_form").serializeObject();
			console.log(obj)
			$.ajax({
				url: "/api/order",
				type: 'POST',
				timeout: 2000,
				async: false,
				data: obj,
				dataType: 'json'
			}).done(function (data) {
				if (data.ok) {
					document.location.replace(`/webshop/rendeles/sikeres?amount=${data.price}`);
					ret = false;
				} else {
					mark(data);
					$('#buybutton').html("&nbsp;Rendelés&nbsp;");
					e.preventDefault();
				}
			});
			return ret;
		});

		$('form#order_form').bind("keyup keypress", function (e) {
			var code = e.keyCode || e.which;
			if (code == 13) {
				e.preventDefault();
				return false;
			}
		});

		$('#order_city').on('keyup', function () {
			if (this.value.length >= 3 && $('#order_country').val() == 'SK') {
				try {
					$.getJSON("https://velemjaro.sk/api/settlementsearchpublic/" + this.value).done(function (data) {
						if (data.success == true) {
							$('#settlement_fill').html('');
							$.each(data.result, function (key, value) {
								if (key >= 5) {
									return 'five';
								} else {
									var setlRow = document.createElement('div');
									setlRow.className = 'setlRow';
									setlRow.setAttribute('id', 'setlRow_' + key);
									setlRow.setAttribute('onclick', 'fillSettlement("setlRow_' + key + '")');
									var setlDivOne = document.createElement('div');
									var setlDivTwo = document.createElement('div');
									var setlNameHU = document.createElement('strong');
									setlNameHU.className = 'setlNameHU';
									setlNameHU.innerHTML = value.magyarnev;
									var setlNameSK = document.createElement('strong');
									setlNameSK.className = 'setlNameSK';
									setlNameSK.innerHTML = ', ' + value.szlovaknev;
									var setlPSC = document.createElement('small');
									setlPSC.className = 'setlPSC';
									setlPSC.innerHTML = value.iranyitoszam;
									var setlJaras = document.createElement('small');
									setlJaras.innerHTML = ' - ' + value.jarasmnevi;

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
						} else {
							$('#settlement_fill').html('');
							$('#settlement_fill').slideUp(500);
						}
					});
				} catch (err) {
					$('#settlement_fill').html('');
					$('#settlement_fill').slideUp(500);
				}
			} else {
				$('#settlement_fill').html('');
				$('#settlement_fill').slideUp(500);
			}
		});

		$(document).click(function () {
			$('#settlement_fill').hide();
		});

		$('#order_country').on('change', function () {
			$('#settlement_fill').html('');
			$('#settlement_fill').hide();
		});
	}

	if ($("#webshop_content").length > 0) {
		$.getJSON("/api/order/items/").done(function (data) {
			data.forEach((d) => {
				$("#webshop_content").append(`<div class='item_${d.id} col-md-3 col-sm-12' style='text-align:center;'></div>`);
				$(`#webshop_content .item_${d.id}`).append(`<a href="/webshop/termekek/${d.slug}"></a>`);
				//$(`#webshop_content .item_${d.id} a`).append(`<img src="${data.image}" style='max-width:100%' alt='${d.name}'/>`);
				$(`#webshop_content .item_${d.id} a`).append(`<img src="https://placekitten.com/700/287" style='max-width:100%' alt='${d.name}'/>`);
				$(`#webshop_content .item_${d.id} a`).append(`<p><strong>${d.name}</strong><p/>`);
				$(`#webshop_content .item_${d.id} a`).append(`<a href='/webshop/rendeles/?id=${d.id}'><button>Megrendelés</button></a>`);
			})
		})
	}

	if ($('.order-price-success').length > 0) {
		console.log(window.location.search)
		if (!getParameterByName("amount")) {
			$(".hide-this").hide();
			$(".show-this").show();
		} else {
			$('.order-price-success').html('A rendelés ára: <strong>&euro;' + getParameterByName("amount") + '</strong>');
			$(".show-this").hide();
		}
	}

})


function fillSettlement(value) {
	$('#order_city').val($('#' + value + ' .setlNameHU').html());
	$('#order_zip').val($('#' + value + ' .setlPSC').html());
	$('#settlement_fill').hide();
	$('#settlement_fill').html('');
	calculateOrderPrice();
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	var results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
