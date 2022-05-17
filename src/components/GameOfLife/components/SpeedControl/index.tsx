import React, { FC, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { Container, StyledSlider, StyledSpeedIcon } from './styles';

interface Props {
  running: boolean;
  speed: number;
  speedRef: React.MutableRefObject<number>;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  resetTimeout: () => void;
}

const SpeedControl: FC<Props> = ({
  running,
  speed,
  speedRef,
  setSpeed,
  resetTimeout,
}) => {
  const [tooltip, showTooltip] = useState(true);

  const handleSpeedSlider = (_event: Event, newValue: number | number[]) => {
    if (newValue !== speed) {
      speedRef.current = newValue as number;
      setSpeed(newValue as number);
    }

    if (running) resetTimeout();
  };

  const marks = [
    { value: 1, label: '1x' },
    { value: 5, label: '5x' },
    { value: 10, label: '10x' },
  ];

  return (
    <Container>
      <StyledSlider
        onChange={handleSpeedSlider}
        value={speed}
        marks={marks}
        step={1}
        min={1}
        max={10}
      />
      <div>
        <StyledSpeedIcon
          data-tip='Adjust speed of simulation'
          onMouseEnter={() => showTooltip(true)}
          onMouseLeave={() => {
            showTooltip(false);
            setTimeout(() => showTooltip(true), 50);
          }}
        />
        {tooltip && <ReactTooltip effect='solid' />}
      </div>
    </Container>
  );
};

export default SpeedControl;
