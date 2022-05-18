import React, { FC, useContext } from 'react';
import { TooltipContext } from '../../../../contexts/TooltipContext';
import ReactTooltipFix from '../ReactTooltipFix';
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
  const { showTooltip } = useContext(TooltipContext);
  if (!showTooltip) return <></>;

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
          data-tip='Adjust simulation speed'
          onMouseEnter={() => showTooltip(true)}
          onMouseLeave={() => {
            showTooltip(false);
            setTimeout(() => showTooltip(true), 50);
          }}
        />
      </div>
      <ReactTooltipFix />
    </Container>
  );
};

export default SpeedControl;
