import React from 'react';
import { connect } from 'react-redux';
import { clearHistory } from '../../store/actions';

import Icon from '../Icon';
import emptyImage from '../../assets/images/empty.png';

import styles from './History.module.scss';

const History = ({ history, clearHistory, handleToggleHistory }) => {
  return (
    <div className={styles.history}>
      <div className={styles.history__header}>
        <h2>History</h2>
        <button onClick={handleToggleHistory}>
          <Icon name="close" />
        </button>
      </div>

      {history.length ? (
        <div className={styles.history__items}>
          {history
            .map((item, idx) => {
              const { sourceText, targetText } = item;

              return (
                <div className={styles.history__items__item} key={idx * 10}>
                  <span>
                    English <Icon name="arrow" /> Turkish Machine
                  </span>
                  <p>{sourceText}</p>
                  <p>{targetText}</p>
                </div>
              );
            })
            .reverse()}

          <div className={styles.history__items__clear}>
            <button onClick={() => clearHistory()}>Clear History</button>
          </div>
        </div>
      ) : (
        <div className={styles.history__empty}>
          <img src={emptyImage} alt="Empty State" />
          <h2>No past translations</h2>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    history: state.globalState.history,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearHistory: () => dispatch(clearHistory()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
