/* eslint-disable eqeqeq */
import React, { useState, useEffect, useContext } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { FormattedMessage, useIntl } from 'react-intl';
import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import { langContext } from '../../contexts/LangContext';
import './Work.scss';

const Work = () => {
  const language = useContext(langContext);
  const intl = useIntl();
  const tagWebapp = intl.formatMessage({ id: 'works.tag.webapp' });
  const tagMobileapp = intl.formatMessage({ id: 'works.tag.mobileapp' });
  const tagWordpress = intl.formatMessage({ id: 'works.tag.wordpress' });
  const tagDesktop = intl.formatMessage({ id: 'works.tag.desktop' });
  const tagApi = intl.formatMessage({ id: 'works.tag.api' });
  const tagOthers = intl.formatMessage({ id: 'works.tag.others' });
  const tagAll = intl.formatMessage({ id: 'works.tag.all' });
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState(tagAll);
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    if (language.buttonChecked === 'unchecked') {
      const query = '*[_type == "works"]';
      client.fetch(query).then((data) => {
        setWorks(data);
        setFilterWork(data);
      });
    } else if (language.buttonChecked === 'checked') {
      const query = '*[_type == "works_es"]';
      client.fetch(query).then((data) => {
        setWorks(data);
        setFilterWork(data);
      });
    }
  }, [language.buttonChecked]);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === tagAll) {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  return (
    <>
      <h2 className="head-text">
        <FormattedMessage
          id="works.h2.text1"
          defaultMessage="undefined"
        />
        <span>
          <FormattedMessage
            id="works.h2.text2"
            defaultMessage="undefined"
          />
        </span>
      </h2>

      <div className="app__work-filter">
        {[tagWebapp, tagMobileapp, tagDesktop, tagApi, tagWordpress, tagOthers, tagAll].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div
              className="app__work-img app__flex"
            >
              <img src={urlFor(work.imgUrl)} alt={work.name} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className="app__work-hover app__flex"
              >
                <a href={work.projectLink} target="_blank" rel="noreferrer">

                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.90] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                {work.codeLink !== undefined ? (
                  <a href={work.codeLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.90] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                ) : null }
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'works',
  'app__primarybg',
);
