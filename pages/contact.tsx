import React from 'react';
import Layout from '../components/Layout';

import styles from '../styles/contact.module.css';

export const About = (): JSX.Element => {
  return (
    <Layout
      customMeta={{
        title: 'Contact - Cocodrilette',
      }}
    >
      <div id={styles.contactMeText} className="my-28">
        {' '}
        <h1>
          If you are looking for someone to build some cool stuff, you can
          contact me on <a href="https://twitter.com/cocodrilette">Twitter</a>{' '}
          or just {''}
          <a
            href="https://form.jotform.com/223045958730055"
            target="_blank"
            rel="noreferrer"
          >
            Email me
          </a>
        </h1>
      </div>
      <div>
        <script
          type="text/javascript"
          src="https://form.jotform.com/jsform/223045958730055"
        ></script>
      </div>
    </Layout>
  );
};

export default About;
