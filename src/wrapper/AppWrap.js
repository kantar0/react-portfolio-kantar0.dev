import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavigationDots, SocialMedia } from '../components';
import './AppWrap.scss';

const AppWrap = (Component, idName, classNames) => function HOC() {
  return (
    <div id={idName} className={`app__container ${classNames}`}>
      <SocialMedia />
      <div className="app__wrapper app__flex">
        <Component />

        <div className="copyright">
          <p className="p-text">
            <FormattedMessage id="appwrap.text1" defaultMessage="undefined" />
            <a href="https://www.hostingssi.com/">
              <FormattedMessage id="appwrap.link" defaultMessage="undefined" />
            </a><FormattedMessage id="appwrap.text2" defaultMessage="undefined" />
          </p>
        </div>
      </div>
      <NavigationDots active={idName} />
    </div>
  );
};

export default AppWrap;
