import { Grid2, Button, Tooltip } from '@mui/material';
import { BUTTON_TEXTS, TOOLTIP_DELAY } from '../constants';

interface IGeometricFigureTriggers {
  handleCreatorOpen: () => void;
  handleSceneVisible: () => void;
}

export const GeometricFigureTriggers = ({
  handleCreatorOpen,
  handleSceneVisible,
}: IGeometricFigureTriggers) => {
  return (
    <Grid2 container spacing={2} justifyContent="right" alignItems="center">
      <Grid2>
        <Tooltip
          title="Please generate table row with figure haracteristics"
          enterDelay={TOOLTIP_DELAY}
          leaveDelay={TOOLTIP_DELAY}
          arrow
        >
          <Button variant="contained" onClick={handleCreatorOpen}>
            {BUTTON_TEXTS.create}
          </Button>
        </Tooltip>
      </Grid2>
      <Grid2>
        <Tooltip
          title="Please render 3D model with all figures from the table"
          enterDelay={TOOLTIP_DELAY}
          leaveDelay={TOOLTIP_DELAY}
          arrow
        >
          <Button variant="contained" onClick={handleSceneVisible}>
            {BUTTON_TEXTS.render}
          </Button>
        </Tooltip>
      </Grid2>
    </Grid2>
  );
};
