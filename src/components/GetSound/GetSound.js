import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setTextToBeTranslated } from 'store/actions';

import Icon from '../Icon';

import styles from './GetSound.module.scss';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';

const GetSound = ({ setTextToBeTranslated }) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      setTextToBeTranslated('');

      mic.start();
      mic.onend = () => {
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {};
    }

    mic.onstart = () => {};

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');

      setTextToBeTranslated(transcript);

      mic.onerror = (event) => {
        console.error(event.error);
      };
    };
  };

  return (
    <button
      className={`${styles.microphone} ${isListening ? styles.listening : ''}`}
      onClick={() => setIsListening((prevState) => !prevState)}
    >
      {isListening ? <Icon name="stop" /> : <Icon name="microphone" />}
    </button>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTextToBeTranslated: (text) => dispatch(setTextToBeTranslated(text)),
  };
};

export default connect(null, mapDispatchToProps)(GetSound);
