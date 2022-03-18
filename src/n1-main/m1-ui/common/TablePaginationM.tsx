import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import {CardsType} from '../../m2-bll/api/cards-a-p-i';

type PropsType = {
    rowsPerPage: number;
    page: number;
    setRowsPerPage: (n: number) => void;
    setPage: (n: number) => void;
    rows:CardsType[];
}
export const TablePaginationM= ({rowsPerPage,page,setPage,setRowsPerPage,rows}:PropsType) => {
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )
}

