/* eslint-disable jsx-a11y/label-has-associated-control */
import { React, useState, useContext } from 'react';
import { FormattedMessage } from 'react-intl';
/* import { HiMenuAlt4 } from 'react-icons/hi'; */
import { motion } from 'framer-motion';
import { images } from '../../constants';
import { langContext } from '../../contexts/LangContext';
import './Navbar.scss';

const Navbar = () => {
  const language = useContext(langContext);
  const path01Variants = {
    open: { d: 'M3.06061 2.99999L21.0606 21' },
    closed: { d: 'M0 9.5L24 9.5' },
  };
  const path02Variants = {
    open: { d: 'M3.00006 21.0607L21 3.06064' },
    moving: { d: 'M0 14.5L24 14.5' },
    closed: { d: 'M0 14.5L15 14.5' },
  };
  const divVariant = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -10 },
  };
  const [animation, setAnimation] = useState('closed');
  const onClick = () => {
    setAnimation('moving');
    setTimeout(() => {
      // eslint-disable-next-line no-restricted-globals
      setAnimation(animation === 'closed' ? 'open' : 'closed');
    }, 200);
  };
  const langOnnChange = () => {
    language.setlanguage(language.locale === 'en-US' ? 'es-ES' : 'en-US');
  };
  return (
    <nav className={`app__navbar ${animation === 'closed' ? '' : 'ActiveHamburger'}`}>
      <div className="app__navbar-container">
        <div className="app__navbar-logo">
          <img src={images.logo} alt="logo" />
        </div>
        <ul className="app__navbar-links">
          {['home', 'about', 'works', 'skills', 'contact'].map((item) => (
            <li className="app__flex p-text" key={`link-${item}`}>
              <div />
              <a href={`#${item}`}>
                <FormattedMessage
                  id={`navbar.links.${item}`}
                  defaultMessage={`${item}`}
                />
              </a>
            </li>
          ))}
        </ul>
        <div className="switch">
          <input
            onChange={() => langOnnChange()}
            id="language-toggle"
            className="check-toggle check-toggle-round-flat"
            checked={language.locale === 'es-ES'}
            type="checkbox"
          />
          <label htmlFor="language-toggle" />
          <span className="on">EN</span>
          <span className="off">ES</span>
        </div>
        <div className="app__navbar-menu">
          <svg onClick={onClick} width="24" height="24" viewBox="0 0 24 24">
            <motion.path
              stroke="#FFFFFF"
              animate={animation}
              variants={path01Variants}
            />
            <motion.path
              stroke="#FFFFFF"
              animate={animation}
              variants={path02Variants}
            />
          </svg>
        </div>
      </div>
      <div className="navbar-mobile-menu">
        <motion.div
          animate={animation === 'closed' ? 'closed' : 'open'}
          variants={divVariant}
          className={`${animation === 'closed' ? 'hideList' : ''}`}
        >
          <ul>
            {['home', 'about', 'works', 'skills', 'contact'].map((item) => (
              <li key={item} className="p-text">
                <a href={`#${item}`}>
                  <FormattedMessage
                    id={`navbar.links.${item}`}
                    defaultMessage={`${item}`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
