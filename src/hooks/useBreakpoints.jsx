import { Grid } from 'antd';

const { useBreakpoint } = Grid;

const useResponsive = () => {
  const screens = useBreakpoint();

  const isMobile = screens.xs;
  const isMedium = screens.md;
  const isLarge = screens.lg;

  return { isMobile, isMedium, isLarge };
};

export default useResponsive;