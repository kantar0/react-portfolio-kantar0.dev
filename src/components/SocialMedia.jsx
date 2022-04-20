import React from 'react';
import { BsTwitter, BsInstagram, BsGithub } from 'react-icons/bs';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href="https://twitter.com/kantar0">
        <BsTwitter />
      </a>
    </div>
    <div>
      <a href="https://github.com/kantar0">
        <BsGithub />
      </a>
    </div>
    <div>
      <a href="https://www.instagram.com/kantar0/">
        <BsInstagram />
      </a>
    </div>
  </div>
);

export default SocialMedia;
