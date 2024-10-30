import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { GeometricFigureTableRow } from './GeometricFigureTableRow';
import { IRow } from '../interfaces/IRow';
import { v4 as uuidv4 } from 'uuid';
import { FIGURE_CHARACTERISTICS } from '../constants';

interface IGeometricFiguresTable {
  rows: IRow[];
  updateRows: (index: number) => void;
  triggerScene: (rows: IRow[]) => void;
}

export const GeometricFiguresTable = ({
  rows,
  updateRows,
  triggerScene,
}: IGeometricFiguresTable) => {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          width: '100%',
          minWidth: 320,
        }}
        aria-label="geomety figures table"
      >
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <>
              {Object.values(FIGURE_CHARACTERISTICS).map((characteristic) => (
                <TableCell key={characteristic} align="center">
                  {characteristic}
                </TableCell>
              ))}
            </>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length ? (
            <>
              {rows.map(({ name, type }, index) => (
                <GeometricFigureTableRow
                  key={uuidv4()}
                  id={++index}
                  name={name}
                  type={type}
                  updateRows={updateRows}
                  triggerScene={triggerScene}
                />
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={4}>
                Please create at least one figure
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
