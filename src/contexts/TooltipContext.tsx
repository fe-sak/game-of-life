import React, { createContext, FC, ReactNode, useMemo, useState } from 'react';

export const TooltipContext = createContext<{
  tooltip?: boolean;
  showTooltip?: React.Dispatch<React.SetStateAction<boolean>>;
}>({});

const TooltipProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tooltip, showTooltip] = useState(false);

  const memoizedValues = useMemo(
    () => ({ tooltip, showTooltip }),
    [tooltip, showTooltip]
  );

  return (
    <TooltipContext.Provider value={memoizedValues}>
      {children}
    </TooltipContext.Provider>
  );
};

export default TooltipProvider;
