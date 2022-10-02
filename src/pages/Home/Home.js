import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import useDebounce from 'hooks/useDebounce';
import { getTranslatedText, setHistory } from 'store/actions';
import { Icon, Header, History, GetSound, Translator } from 'components';

import styles from './Home.module.scss';

const Home = ({ setHistory, getTranslatedText, textToBeTranslated }) => {
  const [isShowHistory, setIsShowHistory] = useState(false);
  const debouncedSearchTerm = useDebounce(textToBeTranslated, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      axios
        .post(
          `https://translation.googleapis.com/language/translate/v2?key=${process.env.REACT_APP_TRANSLATE_API_KEY}`,
          {
            q: debouncedSearchTerm,
            source: 'en',
            target: 'tr',
          }
        )
        .then((response) => {
          const translatedText =
            response.data.data.translations[0].translatedText;

          const historyItem = {
            sourceText: debouncedSearchTerm,
            targetText: translatedText,
          };

          setHistory(historyItem);
          getTranslatedText(translatedText);
        })
        .catch(function (error) {
          console.error(error.message);
        });
    }

    getTranslatedText('');
  }, [debouncedSearchTerm]);

  const handleToggleHistory = () => {
    setIsShowHistory((prevState) => !prevState);
  };

  return (
    <div className={styles.home}>
      <div className={styles.home__content}>
        <Header />
        <Translator />

        <div className={styles.home__buttons}>
          <div className={styles.home__buttons__wrapper}>
            <GetSound />
            <span>Microphone</span>
          </div>
          <div className={styles.home__buttons__wrapper}>
            <button
              className={
                isShowHistory ? styles.home__buttons__wrapper__active : ''
              }
              onClick={handleToggleHistory}
            >
              <Icon name="history" />
            </button>
            <span>History</span>
          </div>
        </div>
      </div>

      {isShowHistory ? (
        <div className={styles.home__modal}>
          <History handleToggleHistory={handleToggleHistory} />
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    textToBeTranslated: state.globalState.textToBeTranslated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setHistory: (item) => dispatch(setHistory(item)),
    getTranslatedText: (text) => dispatch(getTranslatedText(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
