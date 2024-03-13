/*!***************************************************
 * google-translate.js v1.0.6
 * https://Get-Web.Site/
 * author: Vitalii P.
 *****************************************************/

const googleTranslateConfig = {
	/* Original language */
	lang: "en",

	/* If you want to subscribe to the "FinishTranslate" event (The moment when the script finished translating), uncomment and add any test word in the original language */
	// testWord: "Язык",
	/* The language we translate into on the first visit*/
	/* If the script does not work or does not work correctly, uncomment and specify the main domain in the domain property */
	// domain: "Get-Web.Site"

};

$(function () {
	/* Подключаем виджет google translate */
	/* Connecting the google translate widget */
	let script = document.createElement("script");
	script.src = `//translate.google.com/translate_a/element.js?cb=TranslateWidgetIsLoaded`;
	document.getElementsByTagName("head")[0].appendChild(script);
});

function TranslateWidgetIsLoaded() {
	TranslateInit(googleTranslateConfig);
}

function TranslateInit(config) {
	if (config.langFirstVisit && !$.cookie("googtrans")) {
		/* If the translation language is installed for the first visit and cookies are not assigned */
		TranslateCookieHandler("/auto/" + config.langFirstVisit);
	}

	let code = TranslateGetCode(config);

	TranslateHtmlHandler(code);

	if (code == config.lang) {
		/* Если язык по умолчанию, совпадает с языком на который переводим, то очищаем куки */
		/* If the default language is the same as the language we are translating into, then we clear the cookies */
		TranslateCookieHandler(null, config.domain);
	}

	if (config.testWord) TranslateMutationObserver(config.testWord, code == config.lang);


	/* Инициализируем виджет с языком по умолчанию */
	/* Initialize the widget with the default language */
	new google.translate.TranslateElement({
		pageLanguage: config.lang,
		multilanguagePage: true, // Your page contains content in more than one languages
	});

	/* Вешаем событие  клик на флаги */
	/* Assigning a handler to the flags */
	$("[data-google-lang]").click(function () {
		TranslateCookieHandler(
			"/auto/" + $(this).attr("data-google-lang"),
			config.domain
		);
		/* Перезагружаем страницу */
		/* Reloading the page */
		window.location.reload();
	});
}

function TranslateGetCode() {
    let googtrans = Cookies.get('googtrans');
    if (googtrans && googtrans !== 'null') {
        return googtrans.split('/')[2];
    } else {
        return googleTranslateConfig.lang;
    }
}

function TranslateCookieHandler(val) {
    // Удаляем все куки с именем googtrans
    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        if (name === 'googtrans') {
            document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
    }

    document.cookie = 'googtrans=' + val + '; path=/; domain=.metamagic.tv;';
}

function TranslateHtmlHandler(code) {
	/* Получаем язык на который переводим и производим необходимые манипуляции с DOM */
	/* We get the language to which we translate and produce the necessary manipulations with DOM */
	$('[data-google-lang="' + code + '"]').addClass("language__img_active");
}


function TranslateMutationObserver(word, isOrigin) {

	if (isOrigin) {
		document.dispatchEvent(new CustomEvent("FinishTranslate"));
	} else {

		/* Создаем скрытый блок в который добавляем тестовое слово на оригинальном языке. Это позволит нам отследить момент когда сайт будет переведен и вызвать событие "FinishTranslate"  */
		/* Creating a hidden block in which we add a test word in the original language. This will allow us to track the moment when the site is translated and trigger the "FinishTranslate" event  */

		let div = document.createElement('div');
		div.id = 'googleTranslateTestWord';
		div.innerHTML = word;
		div.style.display = 'none';
		document.body.prepend(div);

		let observer = new MutationObserver(() => {
			document.dispatchEvent(new CustomEvent("FinishTranslate"));
			observer.disconnect();
		});

		observer.observe(div, {
			childList: false,
			subtree: true,
			characterDataOldValue: true
		});
	}
}
