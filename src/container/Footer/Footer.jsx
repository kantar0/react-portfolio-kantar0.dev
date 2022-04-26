import React, { useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';

const Footer = () => {
  const intl = useIntl();
  const pname = intl.formatMessage({ id: 'footer.placeholder.name' });
  const pemail = intl.formatMessage({ id: 'footer.placeholder.email' });
  const pmessage = intl.formatMessage({ id: 'footer.placeholder.message' });
  const psubmit = intl.formatMessage({ id: 'footer.submit' });
  const ploading = intl.formatMessage({ id: 'footer.loading' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2 className="head-text uncapitalize">
        <FormattedMessage
          id="footer.h2.text"
        />
      </h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:hello@micael.com" className="p-text">pedro@kantar0.dev</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel:+1 (123) 456-7890" className="p-text">+58 (424) 968-2838</a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input className="p-text" type="text" placeholder={pname} name="username" value={username} onChange={handleChangeInput} />
          </div>
          <div className="app__flex">
            <input className="p-text" type="email" placeholder={pemail} name="email" value={email} onChange={handleChangeInput} />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder={pmessage}
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? psubmit : ploading }</button>
        </div>
      ) : (
        <div>
          <h4 className="head-text head-text-redux">
            <FormattedMessage
              id="footer.thanks"
              defaultMessage="undefined"
            />
          </h4>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);
