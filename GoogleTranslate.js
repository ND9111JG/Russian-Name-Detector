let axios = require("axios").default;

module.exports = function(api_key){
    return {
        key: api_key,
        translate: async function(text){
            try {
                let google_responce = await axios.get("https://translation.googleapis.com/language/translate/v2/", {
                    params: {
                        key: api_key,
                        source: 'en',
                        target: 'ru',
                        q: text
                    }
                });
                return google_responce.data.data.translations[0].translatedText;
            } catch (error) {
                console.error("Google Translate Error:", error)
                return false;
            }
        }
    }
}