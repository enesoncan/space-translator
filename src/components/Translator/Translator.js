import React from 'react';
import { connect } from 'react-redux';
import { setTextToBeTranslated } from '../../store/actions';

import Icon from '../Icon';

import styles from './Translator.module.scss';

const Translator = ({
  translatedText,
  textToBeTranslated,
  setTextToBeTranslated,
}) => {
  const handleTranslate = (event) => {
    const value = event.target.value;

    if (value && value.length) {
      return setTextToBeTranslated(value);
    }

    return setTextToBeTranslated('');
  };

  return (
    <div className={styles.translator}>
      <div className={styles.translator__wrapper}>
        <div className={styles.translator__wrapper__input}>
          <span className={styles.translator__wrapper__input__heading}>
            English
          </span>

          <textarea
            name="translator"
            id="translator"
            value={textToBeTranslated}
            onChange={(event) => handleTranslate(event)}
            className={styles.translator__wrapper__input__box}
          ></textarea>
        </div>

        <div className={styles.translator__wrapper__icon}>
          <Icon name="arrow" />
        </div>

        <div className={styles.translator__wrapper__result}>
          <span className={styles.translator__wrapper__result__heading}>
            Turkish Machine
          </span>

          <div className={styles.translator__wrapper__result__box}>
            <span>{translatedText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    translatedText: state.globalState.translatedText,
    textToBeTranslated: state.globalState.textToBeTranslated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTextToBeTranslated: (text) => dispatch(setTextToBeTranslated(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Translator);
