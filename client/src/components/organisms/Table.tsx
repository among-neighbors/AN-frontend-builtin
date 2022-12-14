import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import { TableRowForMobile } from '../molecules/TableRow';
import { Obj, ColumnId, ProcessedTypePostDataArray } from '~/others/integrateInterface';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { parse } from 'query-string';

interface Column {
  id: ColumnId;
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: Function;
}

interface TableProps {
  type: string;
  rows: ProcessedTypePostDataArray | null;
  isFirstPage: boolean;
  isLastPage: boolean;
  mode: string;
}

const BoardTable: React.FC<TableProps> = ({ type, rows, isFirstPage, isLastPage, mode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryObj = Object(parse(location.search));
  const page = queryObj.page ?? '1';

  const handleChangePage = (event: unknown, newPage: number) => {
    event;
    queryObj['page'] = (Number(page) + newPage - (page === '1' ? 0 : 1)).toString();
    const queryStr = new URLSearchParams(queryObj).toString();
    navigate({
      pathname: location.pathname,
      search: queryStr,
    });
  };

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        maxWidth: '1500px',
      }}
    >
      <TableContainer>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow sx={{ display: { xs: 'none', sm: 'none', md: 'table-row' } }}>
              {mode === 'elder' ? (
                <>
                  {columns(type).map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, whiteSpace: 'nowrap', fontSize: '21px' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </>
              ) : (
                <>
                  {columns(type).map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, whiteSpace: 'nowrap', fontSize: '18px' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => {
              return (
                <React.Fragment key={index}>
                  <TableRow
                    component={Link}
                    to={`${row.id}`}
                    style={{ textDecoration: 'none' }}
                    hover
                    tabIndex={-1}
                    sx={{ display: { xs: 'none', sm: 'none', md: 'table-row' } }}
                  >
                    {mode === 'elder' ? (
                      <>
                        {columns(type).map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ whiteSpace: 'nowrap', fontSize: '21px' }}
                            >
                              {column.format ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {columns(type).map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ whiteSpace: 'nowrap', fontSize: '18px' }}
                            >
                              {column.format ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </>
                    )}
                  </TableRow>
                  <TableRow
                    component={Link}
                    to={`${row.id}`}
                    style={{ textDecoration: 'none' }}
                    hover
                    tabIndex={-1}
                    sx={{
                      display: { xs: 'table-row', sm: 'table-row', md: 'none' },
                    }}
                  >
                    <TableRowForMobile row={row} />
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
        <Typography>{page} page</Typography>
        <TablePagination
          sx={{
            '& div > p': {
              display: 'none',
            },
          }}
          rowsPerPageOptions={[5]}
          component='div'
          count={isLastPage ? 10 - (isFirstPage ? 5 : 0) : 11 - (isFirstPage ? 5 : 0)}
          rowsPerPage={5}
          page={isFirstPage ? 0 : 1}
          onPageChange={handleChangePage}
        />
      </Box>
    </Paper>
  );
};

interface TypeInfoData {
  labels: string[];
  ids: ColumnId[];
  minWidths: number[];
  formats: (Function | undefined)[];
}

const dataOfTypes: Obj<TypeInfoData> = {
  notice: {
    labels: ['?????? ID', '??????', '?????? ??????', '?????????', '?????????'],
    ids: ['id', 'title', 'scope', 'writer', 'date'],
    minWidths: [80, 300, 90, 110, 150],
    formats: [
      undefined,
      undefined,
      (value: string) => {
        if (value === 'ALL') return '??????';
        return '??????';
      },
    ],
  },
  community: {
    labels: ['????????? ID', '??????', '????????? ??????', '????????????', '?????????', '?????????'],
    ids: ['id', 'title', 'scope', 'category', 'writer', 'date'],
    minWidths: [80, 300, 90, 100, 110, 150],
    formats: [
      undefined,
      undefined,
      (value: string) => {
        if (value === 'ALL') return '??????';
        return '??????';
      },
      (value: string) => {
        switch (value) {
          case 'ALL':
            return '??????';
          case 'QNA':
            return '?????????';
          case 'SELLING':
            return '?????????';
          case 'BUYING':
            return '?????????';
          case 'PLAIN':
            return '?????????';
        }
      },
    ],
  },
  complaint: {
    labels: ['?????? ID', '??????', '', '?????????'],
    ids: ['id', 'title', 'scope', 'date'],
    minWidths: [80, 300, 110, 150],
    formats: [],
  },
};

const columns = (type: string): Column[] => {
  const data = dataOfTypes[type];
  return data.labels.map((label, index): Column => {
    return {
      id: data.ids[index],
      label: label,
      minWidth: data.minWidths[index],
      align: label === '??????' ? undefined : 'center',
      format: data.formats[index],
    };
  });
};

export default BoardTable;
