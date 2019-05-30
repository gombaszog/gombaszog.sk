if ($("#gomba-map").length > 0) {

	var mapPlaces;
	/*
	var mapPlaces = [
		{
			id: 1,
			area: {
					xw1: 966,
					xw2: 1142,
					yh1: 225,
					yh2: 429
				},
			location: "Labirintus udvar", //ahogy a programban nevezik
			title: "Labirintus udvar", //ahogy mi megjelenitjuk
			program: true,
			description: "A TANDEM nonprofit szervezet önismereti programsátra idén is gazdag kínálattal várja mindazokat, akik a tábori forgatagban kicsit megpihennének testben, és lélekben egyaránt. A szerda délután kezdődő programokra szombat estig várjuk a magukra és másokra nyitott táborlakókat. A workshopok, előadások, egyéni tanácsadás, életpálya-szimulációs kötélpálya, és kerekasztal beszélgetések mellett teaház várja a felfrissülni vágyókat."
		},
		{
			id: 2,
			area: {
					xw1: 204,
					xw2: 477,
					yh1: 849,
					yh2: 1095
				},
			location: "Pajtaszínház",
			title: "PajtaSzínház",
			program: true,
			description: "Egy eredeti gömöri pajta, amelyet a Gombaszög szervezői és a Fiatal Építészek Fóruma telepített a völgybe, és a Gurigongo Symposium tölt meg élettel. Színházi előadások, filmvetítések, slam, és még sok más jó vár mindenkit."
		},
		{
			id: 3,
			area: {
					xw1: 222,
					xw2: 519,
					yh1: 714,
					yh2: 828
				},
			location: "PMSz Nagysátor",
			title: "PMSz Nagysátor",
			program: true,
			description: "A Pozonyi Magyar Szakkollégium sátra, a közéleti programok színtere"
		},
		{
			id: 4,
			area: {
					xw1: 87,
					xw2: 360,
					yh1: 213,
					yh2: 432
				},
			location: "Durvacrew Chill Sátor",
			title: "DurvaCrew Chillsátor",
			program: true,
			description: "A chill és az alternatív zene sátra"
		},
		{
			id: 5,
			area: {
					xw1: 759,
					xw2: 879,
					yh1: 921,
					yh2: 1089
				},
			location: "Kisszínpad",
			title: "Kisszínpad",
			program: true,
			description: "Fedett kisszínpad a kocsma mellett"
		},
		{
			id: 6,
			area: {
					xw1: 180,
					xw2: 405,
					yh1: 585,
					yh2: 699
				},
			location: "Korona Sátor",
			title: "Korona Sátor",
			program: true,
			description: "A tábor komolyzenei chillsátra, amelyet a pelsőci Korona együttes tölt meg élettel és tartalommal!"
		},
		{
			id: 7,
			area: {
					xw1: 717,
					xw2: 819,
					yh1: 1113,
					yh2: 1347
				},
			location: "Kocsma",
			title: "Kocsma",
			program: false,
			description: "Egy igazi retró kocsma egy óriási terasszal!"
		},
		{
			id: 8,
			area: {
					xw1: 507,
					xw2: 696,
					yh1: 1005,
					yh2: 1209
				},
			location: "Kajaplacc",
			title: "Kajaplacc",
			program: false,
			description: "Itt lakhatsz jól - ide gyere a Lecsópasszal."
		},
		{
			id: 9,
			area: {
					xw1: 534,
					xw2: 687,
					yh1: 819,
					yh2: 966
				},
			location: "G-pont",
			title: "G-pont",
			program: false,
			description: "Inormációs pont, pólóárus és töltőállomás"
		},
		{
			id: 10,
			area: {
					xw1: 912,
					xw2: 1035,
					yh1: 897,
					yh2: 1002
				},
			location: "Kézműves Sátor",
			title: "Kézműves Sátor",
			program: false,
			description: "Festés, rajzolás, agyagozás, és minden, ami kézművesség!"
		},
		{
			id: 11,
			area: {
					xw1: 256,
					xw2: 525,
					yh1: 453,
					yh2: 552
				},
			location: "mediasator",
			title: "Roda István Turistaház - Médiasátor",
			program: false,
			description: "Itt székelnek az újságírók, cikkírók, grafikusok, informatikusok, és itt szerkesztődik a Vadalma, amelybe a te cikked is várjuk! Nem kell mást tenned, mint bejönni, leírni, és ha OK, másnap megjelenik!"
		},
		{
			id: 12,
			area: {
					xw1: 741,
					xw2: 897,
					yh1: 153,
					yh2: 342
				},
			location: "Szifonterasz",
			title: "Szifon és sörstand",
			program: false,
			description: "Finom itókák lelőhelye. Lesz sör, bor, fröccs, szóda és szörp minden mennyiségben!"
		},
		{
			id: 13,
			area: {
					xw1: 642,
					xw2: 885,
					yh1: 738,
					yh2: 807
				},
			location: "Röplabdapálya",
			title: "Röplabdapálya",
			program: false,
			description: "Strandröplapdapálya a medence szomszédságában, igazi dunai homokkal!"
		},
		{
			id: 14,
			area: {
					xw1: 834,
					xw2: 933,
					yh1: 1215,
					yh2: 1410
				},
			location: "B-612 Előadósátor",
			title: "B-612 Előadósátor",
			program: true,
			description: "Irodalmi sátor"
		},
		{
			id: 15,
			area: {
					xw1: 639,
					xw2: 885,
					yh1: 672,
					yh2: 732
				},
			location: "medence",
			title: "Medence",
			program: false,
			description: "Csobbanás és lehűlés a nagy melegben!"
		},
		{
			id: 16,
			area: {
					xw1: 879,
					xw2: 1011,
					yh1: 1026,
					yh2: 1197
				},
			location: "GombaOvi",
			title: "GombaOvi",
			program: true,
			description: "Kisgyermek óvoda óvónénikkel és gazdag programmal!"
		},
		{
			id: 17,
			area: {
					xw1: 1077,
					xw2: 1146,
					yh1: 1086,
					yh2: 1239
				},
			location: "elsosegely",
			title: "Elsősegély",
			program: false,
			description: "Gyors egészségügyi ellátás, ha gondod támadna..."
		},
		{
			id: 18,
			area: {
					xw1: 1416,
					xw2: 1494,
					yh1: 1116,
					yh2: 1224
				},
			location: "Óriás hinta",
			title: "Óriás hinta",
			program: false,
			description: "Gömör legnagyobb hintája!"
		},
		{
			id: 19,
			area: {
					xw1: 138,
					xw2: 336,
					yh1: 1176,
					yh2: 1320
				},
			location: "barlang",
			title: "Gombaszögi barlang",
			program: false,
			description: "A gombaszögi barlang bejárata - Az akár három méteres szalmacseppköveiről ismert, UNESCO világörökséggé nyilvánított barlang a táborjeggyel ingyenesen meglátogatható a reggeli órákban. A barlanglátogatásra jelentkezni a portán lehet."
		},
		{
			id: 20,
			area: {
					xw1: 1284,
					xw2: 1485,
					yh1: 627,
					yh2: 768
				},
			location: "kopjafapark",
			title: "Kopjafapark",
			program: false,
			description: "A mindenkori Gombaszögi táborok, Nyári Ifjúsági Találkozók, Művelődési táborok kopjafáinak nagy részével díszített hely. Ide kerül az idei kopjafa is, amelyet Nagyferenc Katalinnal együtt te is faraghatsz a kopjafafaragó házban."
		},
		{
			id: 21,
			area: {
					xw1: 993,
					xw2: 1035,
					yh1: 1178,
					yh2: 1248
				},
			location: "Kopjafafaragó",
			title: "Kopjafafaragó",
			program: true,
			description: "A kopjafa faragásának helyszíne. Csatlakozz te is Nagyferenc Katalin kopjafafaragóhoz, állíts emléket az utókornak!"
		},
		{
			id: 22,
			area: {
					xw1: 1173,
					xw2: 1236,
					yh1: 1119,
					yh2: 1263
				},
			location: "Hívd elő a csacsit!",
			title: "Hívd elő a csacsit!",
			program: true,
			description: "Fotókészítés, előhívás, gyönyörködés"
		},
		{
			id: 23,
			area: {
					xw1: 1395,
					xw2: 1617,
					yh1: 759,
					yh2: 954
				},
			location: "Nagyszínpad",
			title: "Nagyszínpad",
			program: true,
			description: "Itt csápolunk koncert közben"
		},
		{
			id: 24,
			area: {
					xw1: 1650,
					xw2: 1761,
					yh1: 807,
					yh2: 1044
				},
			location: "frissito",
			title: "Frissítő",
			program: false,
			description: "Ital, frissítő"
		},
		{
			id: 25,
			area: {
					xw1: 1512,
					xw2: 1638,
					yh1: 330,
					yh2: 408
				},
			location: "Buszmegálló",
			title: "Buszmegálló",
			program: true,
			description: "Innen indulnak és ide érkeznek a partibuszok, illetve a SAD helyközi buszjáratai, a megálló neve Szalóc, Gombaszögi barlang - Slavec, Gombasecká jaskyňa"
		},
		{
			id: 26,
			area: {
					xw1: 1557,
					xw2: 1695,
					yh1: 423,
					yh2: 552
				},
			location: "taxi",
			title: "Taxidroszt",
			program: false,
			description: "Kedvezményes fuvarok a Rozsnyói medencében és Tornalja környékén! Hívd a T.V. Taxit a +421 905 565 335 vagy a +421 903 054 434 telefonszámok egyikén!"
		},
		{
			id: 27,
			area: {
					xw1: 1131,
					xw2: 1329,
					yh1: 45,
					yh2: 216
				},
			location: "parkolo",
			title: "Parkoló",
			program: false,
			description: "Parkolóhely mindenkinek. A parkolásért nem kell fizetni, ugyanakkor egy papírt kérünk elhelyezni a szélvédő alá a tulajdonos telefonszámával, hogy szükség esetén el lehessen érni"
		},
		{
			id: 28,
			area: {
					xw1: 1176,
					xw2: 1422,
					yh1: 267,
					yh2: 450
				},
			location: "porta",
			title: "Porta és információ",
			program: false,
			description: "Jegyvétel és információ"
		},
		{
			id: 29,
			area: {
					xw1: 741,
					xw2: 954,
					yh1: 831,
					yh2: 900
				},
			location: "Csapatjáték infopult",
			title: "Csapatjáték infopult",
			program: false,
			description: "A csapatjáték információs központja"
		}
	]; */
	
	var imW = 1920;
	var imH = 1920;
	var imO = {};
	
	var setPosition = function(){
		imW = $("#gomba-map").width();
		imH = $("#gomba-map").height();
		if (imW == 0){
			imW = $("#gomba-map").outerWidth();
			imH = $("#gomba-map").outerHeight();
		}
		imO = $("#gomba-map").offset();
	};
	
	var isThere = function(xw, yh, area){
		return xw>area.xw1 && xw<area.xw2 && yh>area.yh1 && yh<area.yh2;
	};
	
	var showedLocationId = 0;
	
	var getPlaceContent = function(px, py){
		var opxw = 1000*(px-imO.left)/imW;
		var opyh = 1000*(py-imO.top)/imH;
		var isActive = false;
		//console.log(showedLocationId);
		//console.log("OrigPosX: " + opxw + ", OrigPosY: " + opyh);
		for(var i = 0; i < mapPlaces.length; i++){
			var place = mapPlaces[i];
			if(isThere(opxw, opyh, place.area)){
				if(showedLocationId != place.id){
					showedLocationId = place.id;
					$("#gomba-map").css( 'cursor', 'pointer' );
					$("#gomba-map").click(function() {
							$("#location-details").click();
						});
					$("#location-title").text(place.name);
					//$("#location-details").css("top", place.area.yh2*imH/1487 + "px");
					$("#location-details").css("top", place.area.yh2*imH/1000 + "px");
					$("#location-details").css("left", place.area.xw1*imW/1000 + "px");
					$("#location-details").show();
					$("#description-modal-label").text(place.name);
					$("#location-description").text(place.description);
					if (place.hasProgram) {
						renderProgram(place.name);
					}
					else{
						deleteProgram();
					}
				}
				isActive = true;
				break;
			}
		}
		if(!isActive){
			$("#location-details").hide();
			showedLocationId=0;
			$("#gomba-map").css('cursor', 'default');
			$("#gomba-map").unbind("click");
		}
	};
	
	var programFS = {};
	
	var getProgram = function(){
		$.get("/api/program", function( data ) {
			programFS = data.program;
		}, "json" );
	};

	var getLocations = function(cb){
		$.get("/api/location", function( data ) {
			mapPlaces = data.location;
			cb();
		}, "json" );
	}
	
	var deleteProgram = function(){
		$("#location-program").html("");
	};
	
	var renderProgram = function(actLocation){
		$("#location-program").html("");
		var napNevek = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
		var napNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
		var actNap = null;
		var actNapWrap = null;
		for(var i=0; i<programFS.length; i++){
			if(actLocation == programFS[i].location){
				actProgram = programFS[i];
				var formattedDate = new Date(actProgram.start);
				if(!actNap || (formattedDate.getDay() != actNap && formattedDate.getHours() >= 4)){
					var actDay = formattedDate.getDay();
					actNapWrap = $("<div class=\"program-day-wrap program-day-" + napNames[actDay] + "\"><h4>" + napNevek[actDay] + "</h4></div>").appendTo($("#location-program"));
					actNap = actDay;
				}
				actNapWrap.append("<div class=\"program-wrap\">"+
								"<div class=\"program-start\">" + formattedDate.getHours() + ":" + formattedDate.getMinutes() + (formattedDate.getMinutes()<10?"0":"") + "</div>"+
								"<div class=\"program-title\">" + actProgram.name + "</div>"+
								"<div class=\"program-description\">" + actProgram.description + "</div>"+
							"</div>");
			}
		}
	};
	
	$("#gomba-map").on("mousemove", function(e){
			getPlaceContent(e.pageX, e.pageY);
		});
		
	$(document).ready(function(){
		setTimeout(function(){
				getLocations(function() {
					getProgram();
					setPosition();
				});
			}, 300);
		});
		
	$(window).resize(function() {
		setPosition();
	});
}
