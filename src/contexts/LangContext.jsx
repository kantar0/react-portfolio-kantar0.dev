import React, { useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import EnglishMessages from '../lang/en-US.json';
import SpanishMessages from '../lang/es-ES.json';

const langContext = React.createContext();

const LangProvider = ({ children }) => {
  let defaultLocale;
  let defaultMessages;
  const lang = localStorage.getItem('lang');
  if (lang) {
    defaultLocale = lang;

    if (lang === 'es-ES') {
      defaultMessages = SpanishMessages;
    } else if (lang === 'en-US') {
      defaultMessages = EnglishMessages;
    } else {
      defaultLocale = 'en-US';
      defaultMessages = EnglishMessages;
    }
  }
  const [messages, setMessages] = useState(defaultMessages);
  const [locale, setLocale] = useState(defaultLocale);
  const [buttonChecked, setButtonChecked] = useState(defaultLocale === 'es-ES' ? 'checked' : 'unchecked');
  const setlanguage = (language) => {
    switch (language) {
      case 'es-ES':
        setMessages(SpanishMessages);
        setLocale('es-ES');
        localStorage.setItem('lang', 'es-ES');
        setButtonChecked('checked');
        break;
      case 'en-US':
        setMessages(EnglishMessages);
        setLocale('en-US');
        localStorage.setItem('lang', 'en-US');
        setButtonChecked('unchecked');
        break;
      default:
        setMessages(EnglishMessages);
        setLocale('en-US');
        localStorage.setItem('lang', 'en-US');
        setButtonChecked('unchecked');
    }
  };
  useEffect(() => {
    if (lang) {
      defaultLocale = lang;

      if (lang === 'es-ES') {
        defaultMessages = SpanishMessages;
      } else if (lang === 'en-US') {
        defaultMessages = EnglishMessages;
      } else {
        defaultLocale = 'en-US';
        defaultMessages = EnglishMessages;
      }
    }
    setlanguage(defaultLocale);
  }, [locale]);

  return (
    <langContext.Provider value={{ setlanguage, locale, buttonChecked }}>
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </langContext.Provider>
  );
};

export { LangProvider, langContext };
