import { memo } from 'react';
import { Button, Grid2, TableCell, TableRow, Tooltip } from '@mui/material';
import { IRow } from '../interfaces/IRow';
import { BUTTON_TEXTS, TOOLTIP_DELAY } from '../constants';

interface IGeometricFiguresTableRow extends IRow {
  id: number;
  updateRows: (index: number) => void;
  triggerScene: (rows: IRow[]) => void;
}

const tableCellStyles = { width: '25%' };

export const GeometricFigureTableRow = memo(
  ({ id, name, type, updateRows, triggerScene }: IGeometricFiguresTableRow) => {
    return (
      <TableRow>
        <TableCell sx={tableCellStyles}>{id}</TableCell>
        <TableCell align="center" sx={tableCellStyles}>
          {name}
        </TableCell>
        <TableCell align="center" sx={tableCellStyles}>
          {type}
        </TableCell>
        <TableCell align="center" sx={tableCellStyles}>
          <Grid2
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid2>
              <Tooltip
                title="delete table row"
                enterDelay={TOOLTIP_DELAY}
                leaveDelay={TOOLTIP_DELAY}
                arrow
              >
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => updateRows(id)}
                >
                  {BUTTON_TEXTS.delete}
                </Button>
              </Tooltip>
            </Grid2>
            <Grid2>
              <Tooltip
                title="Please render 3D model"
                enterDelay={TOOLTIP_DELAY}
                leaveDelay={TOOLTIP_DELAY}
                arrow
              >
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => triggerScene([{ type, name }])}
                >
                  {BUTTON_TEXTS.render}
                </Button>
              </Tooltip>
            </Grid2>
          </Grid2>
        </TableCell>
      </TableRow>
    );
  }
);
