import React, { useState, useEffect } from 'react';
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
      fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${process.env.REACT_APP_TRANSLATE_API_KEY}`,
        {
          method: 'POST',
          body: JSON.stringify({
            q: debouncedSearchTerm,
            source: 'en',
            target: 'tr',
          }),
          headers: { 'Content-Type': 'application/json' },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          const translatedText = result.data.translations[0].translatedText;

          const historyItem = {
            sourceText: debouncedSearchTerm,
            targetText: translatedText,
          };

          setHistory(historyItem);
          getTranslatedText(translatedText);
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
