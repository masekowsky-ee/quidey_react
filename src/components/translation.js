const translations = {
    de: {
        app: 'App',
        home: 'zu Hause',
        menu: 'Menü',
        profile: 'Profil',
    },
    en: {
        app: 'App',
        home: 'Home',
        menu: 'Menu',
        profile: 'Profile',
    }
}

//transform lang to readable keys for translations object, after retreaved from local storage
function normalizeLang(lang){
    console.log(lang);

    if (!lang) return 'en';

    if (lang.startsWith('de')){
        return 'de';
    } else if (lang.startsWith('en')){
        return 'en';
    } else {
        return 'en';
    }
}

//helper for setLang to insert text
function insertTranslation(lang, key, el){
    //get text
    const text = translations[lang]?.[key];

    //warn if missing key and apply
    if(!text){
        console.warn('Missing translation: ', key);
    }
    el.textContent = text || key;
}

//combine key and lang to insert translation for every case of text
function setLang(lang){
    //normalize and store lang
    lang = normalizeLang(lang);
    localStorage.setItem('lang', lang);

    //fill elements with data-i18n keys with translation data

    //text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        insertTranslation(lang, key, el);
    });

    //placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        insertTranslation(lang, key, el);
    });

    //value
    document.querySelectorAll('[data-i18n-value]').forEach(el => {
        const key = el.dataset.i18nValue;
        insertTranslation(lang, key, el);
    });

    //title, tooltip
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.dataset.i18nTitle;
        insertTranslation(lang, key, el);
    });
}

//retrieve lang from local storage or navigator and call setLang
function applyTranslations(){
    //retrieve lang
    let lang = localStorage.getItem('lang');
    //get lang if none retrieved
    if(!lang){
        lang = navigator.language;
    }
    //use lang to apply translations
    setLang(lang);
}

document.addEventListener('DOMContentLoaded', applyTranslations);