import React, { useState } from 'react';
import { StyledTableCell, StyledTableRow } from './styles';
import { Table, TableBody, TableContainer, TableHead, TablePagination, Paper, Box } from '@mui/material';

const TableViewTemplate = ({ columns, rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    return (
        <Paper sx={{ width: '100%', overflowX: 'auto', borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
            <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow sx={{ boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
                            {columns.map((column, index) => (
                                <StyledTableCell
                                    key={index}
                                    align={column.align || 'left'}
                                    sx={{ minWidth: column.minWidth, fontWeight: 600, backgroundColor: '#1f2937', color: '#fff' }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <StyledTableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.id}
                                    sx={{
                                        transition: 'background-color 0.3s ease',
                                        '&:hover': { backgroundColor: 'rgba(16, 185, 129, 0.08)' },
                                    }}
                                >
                                    {columns.map((column, index) => {
                                        const value = row[column.id];
                                        return (
                                            <StyledTableCell key={index} align={column.align || 'left'}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </StyledTableCell>
                                        );
                                    })}
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
                sx={{
                    '& .MuiTablePagination-toolbar': { minHeight: 60 },
                    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { fontSize: '0.875rem' },
                }}
            />
        </Paper>
    );
};

export default TableViewTemplate;
