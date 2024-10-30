import { useCallback, useEffect, useState, useRef } from 'react';
import { Container, Box } from '@mui/material';
import { GeometricFigureTriggers } from './GeometricFigureTriggers';
import { GeometricFiguresTable } from './GeometricFiguresTable';
import { GeometricFigureCreator } from './GeometricFigureCreator';
import { Scene } from './Scene';
import { IRow } from '../interfaces/IRow';
import { getHost } from '../helpers/getHost';
import { LOKAL_STORAGE_TABLE_KEY } from '../constants';
import { TShape } from '../interfaces/IComponent';

export const GeometricFigureManager = () => {
  const [rows, setRows] = useState<IRow[]>([]);
  const [rowsToRender, setRowsToRender] = useState<IRow[]>([]);
  const [isManagerVisible, setIsManagerVisible] = useState<boolean>(true);
  const [isCreatorVisible, setIsCreatorVisible] = useState<boolean>(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const runStorageProcess = () => {
      const fullSiteStorage = localStorage.getItem(getHost());

      if (isFirstRender.current && !fullSiteStorage) {
        isFirstRender.current = false;
        return;
      }

      if (isFirstRender.current && fullSiteStorage) {
        const dataFromStorage = JSON.parse(fullSiteStorage);
        const rowsFromStorage = dataFromStorage[LOKAL_STORAGE_TABLE_KEY];
        setRows(rowsFromStorage);
        isFirstRender.current = false;

        return;
      }

      if (!fullSiteStorage) {
        localStorage.setItem(
          getHost(),
          JSON.stringify({ [LOKAL_STORAGE_TABLE_KEY]: rows })
        );

        return;
      }

      const parsedData = JSON.parse(fullSiteStorage);
      parsedData[LOKAL_STORAGE_TABLE_KEY] = rows;
      localStorage.setItem(getHost(), JSON.stringify(parsedData));
    };
    runStorageProcess();
  }, [rows, isFirstRender]);

  const triggerCreator = useCallback(() => {
    setIsCreatorVisible(!isCreatorVisible);
  }, [isCreatorVisible]);

  const RemoveRow = useCallback(
    (index: number) => {
      const updatedRows: IRow[] = rows.reduce(
        (accumulator: IRow[], row, rowIndex) => {
          if (rowIndex !== index - 1) {
            return [...accumulator, row];
          }

          return accumulator;
        },
        []
      );

      setRows(updatedRows);
    },
    [rows]
  );

  const createRow = useCallback(
    (name: string, type: TShape) => {
      const updatedRows: IRow[] = [...rows, { name, type }];

      setRows(updatedRows);
    },
    [rows]
  );

  const triggerScene = useCallback(
    (rowsToBeRendered: IRow[]) => {
      setRowsToRender(rowsToBeRendered);
      setIsManagerVisible(!isManagerVisible);
    },
    [isManagerVisible]
  );

  return (
    <Container
      sx={{
        width: 1200,
        maxWidth: '100%',
        margin: '0 auto',
        pt: 10,
        pb: 3,
      }}
    >
      {isManagerVisible ? (
        <>
          <Box sx={{ mb: 2 }}>
            <GeometricFigureTriggers
              handleCreatorOpen={triggerCreator}
              handleSceneVisible={() => triggerScene(rows)}
            />
          </Box>
          <Box
            sx={(theme) => ({
              border: `1px solid ${theme.palette.grey[100]}`,
            })}
          >
            <GeometricFiguresTable
              rows={rows}
              updateRows={RemoveRow}
              triggerScene={triggerScene}
            />
          </Box>
          <GeometricFigureCreator
            isOpen={isCreatorVisible}
            handleClose={triggerCreator}
            updateRows={createRow}
          />
        </>
      ) : (
        <Scene rows={rowsToRender} hideScene={() => triggerScene([])} />
      )}
    </Container>
  );
};
