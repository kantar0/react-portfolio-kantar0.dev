import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { FormattedMessage } from 'react-intl';
import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';
import { urlFor, client } from '../../client';
import { langContext } from '../../contexts/LangContext';

const About = () => {
  const language = useContext(langContext);
  const [abouts, setAbouts] = useState([]);
  useEffect(() => {
    if (language.buttonChecked === 'unchecked') {
      const query = '*[_type == "abouts"]';

      client.fetch(query).then((data) => {
        setAbouts(data);
      });
    } else if (language.buttonChecked === 'checked') {
      const query = '*[_type == "abouts_es"]';

      client.fetch(query).then((data) => {
        setAbouts(data);
      });
    }
  }, [language.buttonChecked]);

  return (
    <>
      <h2 className="head-text uncapitalize">
        <FormattedMessage
          id="about.h2.text1"
          defaultMessage="undefined"
        />
        <span>
          <FormattedMessage
            id="about.h2.span.text1"
            defaultMessage="undefined"
          />
        </span>
        <br />
        <FormattedMessage
          id="about.h2.text2"
          defaultMessage="undefined"
        />
        <span>
          <FormattedMessage
            id="about.h2.span.text2"
            defaultMessage="undefined"
          />
        </span>
      </h2>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
            <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);
