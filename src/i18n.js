import en from "./locales/en.json";
import es from "./locales/es.json";
import pt_br from "./locales/pt_br.json";
import de from "./locales/de.json";
import it from "./locales/it.json";
import fr from "./locales/fr.json";
import ko from "./locales/ko.json";

import {createI18n} from "vue-i18n";

const i18n = createI18n(
    {
        legacy: false,
        locale: "es",
        fallbackLocale: "es",
        globalInjection: true,
        messages: {en, es, pt_br, de, it, fr, ko}
    }
)

export default i18n;