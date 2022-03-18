import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {DateTime} from 'luxon';
import {useTypedSelector} from '../../../../n1-main/m2-bll/redux';
import {ButtonForTablePacks} from '../../../../n1-main/m1-ui/common/ButtonForTablePacks';
import Rating from '@mui/material/Rating';
import BasicButtonGroup from '../../../../n1-main/m1-ui/common/BasicButtonGroup';
import {PATH} from '../../../../n1-main/m1-ui/routes/RoutesComponent';
import {Navigate, NavLink} from 'react-router-dom';
import Button from '@mui/material/Button';
import {TablePaginationM} from '../../../../n1-main/m1-ui/common/TablePaginationM';
import {Search} from '../../packsCards/rightPanel/Search';

interface Column {
    id: 'question' | 'answer' | 'updated' | 'grade' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: string) => string;
    formatB?: () => void;
}

const columns: Column[] = [
    {id: 'question', label: `Question`, minWidth: 200},
    {id: 'answer', label: 'Answer', minWidth: 200},
    {
        id: 'updated',
        label: 'Update',
        minWidth: 100,
        align: 'right',
        format: (value: string) => DateTime.fromISO(value).toFormat('DDD'),
    },
    {
        id: 'grade',
        label: 'Grade',
        minWidth: 100,
        align: 'right',
        format: (value: string) => DateTime.fromISO(value).toFormat('DDD'),
    },
    {
        id: 'actions',
        label: '',
        minWidth: 50,
        align: 'right',
        formatB: () => <button>hello</button>
    },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 530,
    },
});

export const TableCards = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const rows = useTypedSelector(state => state.cards.data.cards);
    const isAuth = useTypedSelector(state => state.auth.isAuth);
    const packName = useTypedSelector(state => state.cards.packName);
    const classes = useStyles();
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }
    if (!isAuth) return <Navigate to={PATH.LOGIN}/>
    return (
        <>
            <Search isButton={false} title={packName} isArrowBack={true}/>
            <Paper className={classes.root}>

                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => {
                                    if (index > 3) {
                                        return (

                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{minWidth: column.minWidth}}
                                            >
                                                {
                                                    column.id === 'actions'
                                                        ?
                                                        <Button variant={'contained'} color={'primary'} size={'small'}>
                                                            Add
                                                        </Button>
                                                        : column.label
                                                }
                                            </TableCell>
                                        )
                                    } else {
                                        return (

                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{minWidth: column.minWidth}}
                                            >
                                                {column.label}
                                                <ButtonForTablePacks nameCell={column.id}/>
                                            </TableCell>
                                        )
                                    }

                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                        {columns.map((column) => {
                                            //@ts-ignore
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'grade'
                                                        ?
                                                        <Rating name="read-only" value={4.5} readOnly precision={0.5}/>
                                                        : column.id === 'actions'
                                                            ? <BasicButtonGroup name_2={'Del'} name_3={'Update'}
                                                                                userId={false}
                                                                                color={true}
                                                            />
                                                            : column.format && typeof value === 'string'
                                                                ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}

