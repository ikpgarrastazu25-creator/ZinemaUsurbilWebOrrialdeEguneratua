/*
  index.js
  - Pelikula-kartelen atala hasieran ezkutatzen du.
  - Erabiltzaileak `Ikusi` botoia sakatzen duenean, kargatze-barra simulatu bat erakusten da.
  - Karga amaitutakoan, kartelak agertzen dira pixkanaka (stagger efektua).
  - Iruzkin guztiak euskaraz daude azalpen gisa.
*/

document.addEventListener('DOMContentLoaded', function () {
	// Aldagaiak sortzea
	console.log('index.js kargatuta');

	var toogle = document.getElementById('toggle_pelikulak');
	var container = document.getElementById('peliculas_container');
	var loader = document.getElementById('peliculas_loader');
	var progressEl = document.getElementById('loader_progress');
	var textEl = document.getElementById('loader_text');


	// Hasierako egoera: edukia ezkutatuta, boton izena egokituta
	container.classList.remove('visible');
	var cards = container.querySelectorAll('.pelikula_card');
	cards.forEach(function (c) { c.classList.remove('show'); });
	toogle.textContent = 'Ikusi';
	toogle.setAttribute('aria-expanded', 'false');

	var loading = false; // karga bidean den seinale

	// Botoiaren klik-erantzuna
	toogle.addEventListener('click', function () {
		if (loading) return; // hainbat klik saihestu

		// Ikusgai baldin badago ezktutatu
		if (container.classList.contains('visible')) {
			container.classList.remove('visible');
			cards.forEach(function (c) { c.classList.remove('show'); });
			toogle.textContent = 'Ikusi';
			toogle.setAttribute('aria-expanded', 'false');
			return;
		}

		// Kargatze-simulazioa hasi: overlay erakutsi eta barra abiarazi
		loading = true;
		loader.setAttribute('aria-hidden', 'false');
		var pct = 0;
		// <progress> elementuaren balioa erabiliko dugu (value)
		progressEl.value = 0;
		textEl.textContent = 'Kargatzen 0%';

		var step = 5;   // pausoko ehunekoaren gehikuntza
		var tick = 60;  // pausuen arteko denbora (ms)
		var interval = setInterval(function () {
			pct += step;
			if (pct > 100) pct = 100;
			try { progressEl.value = pct; } catch (e) { /* some browsers */ }
			textEl.textContent = 'Kargatzen ' + pct + '%';

			if (pct >= 100) {
				clearInterval(interval);
				//  atzerapena txikia: overlay ezkutatu eta edukia erakutsi
				setTimeout(function () {
					loader.setAttribute('aria-hidden', 'true');
					container.classList.add('visible');
					// Kartelak pixkanaka erakutsi (stagger efektua)
					cards.forEach(function (c, i) {
						setTimeout(function () { c.classList.add('show'); }, i * 90);
					});
					toogle.textContent = 'Ezkutatu';
					toogle.setAttribute('aria-expanded', 'true');
					loading = false;
				}, 250);
			}
		}, tick);
	});
});

