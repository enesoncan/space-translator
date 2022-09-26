import React from 'react';

import { ReactComponent as ArrowRight } from '../../assets/arrow.svg';
import { ReactComponent as Microphone } from '../../assets/microphone.svg';
import { ReactComponent as History } from '../../assets/history.svg';
import { ReactComponent as Stop } from '../../assets/stop.svg';
import { ReactComponent as Close } from '../../assets/close.svg';

const iconTypes = {
  arrow: ArrowRight,
  microphone: Microphone,
  history: History,
  stop: Stop,
  close: Close,
};

const Icon = ({ name, ...props }) => {
  let Icon = iconTypes[name];
  return <Icon {...props} />;
};

export default Icon;
