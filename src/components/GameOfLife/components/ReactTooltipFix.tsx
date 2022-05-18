import React, { FC, useContext } from 'react';
import ReactTooltip from 'react-tooltip';
import { TooltipContext } from '../../../contexts/TooltipContext';

const ReactTooltipFix: FC = () => {
  const { tooltip } = useContext(TooltipContext);
  return <>{tooltip && <ReactTooltip effect='solid' />}</>;
};
export default ReactTooltipFix;
