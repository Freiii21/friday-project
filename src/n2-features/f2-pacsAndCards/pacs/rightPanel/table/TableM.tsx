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
import {useTypedSelector} from '../../../../../n1-main/m2-bll/redux';
import {DateTime} from 'luxon';
import BasicButtonGroup from '../../../../../n1-main/m1-ui/common/ComponentsForTabels/BasicButtonGroup';
import {ButtonForTableCell} from '../../../../../n1-main/m1-ui/common/ComponentsForTabels/ButtonForTableCell';
import {ButtonForTablePacks} from '../../../../../n1-main/m1-ui/common/ComponentsForTabels/ButtonForTablePacks';


interface Column {
    id: 'name' | 'cardsCount' | 'updated' | 'created' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: string) => string;
    formatB?: () => void;
}

const columns: Column[] = [
    {id: 'name', label: `Name`, minWidth: 150},
    {id: 'cardsCount', label: 'Count', minWidth: 100},
    {
        id: 'updated',
        label: 'Last Update',
        minWidth: 100,
        align: 'right',
        format: (value: string) => DateTime.fromISO(value).toFormat('DDD'),
    },
    {
        id: 'created',
        label: 'Created By',
        minWidth: 100,
        align: 'right',
        format: (value: string) => DateTime.fromISO(value).toFormat('DDD'),
    },
    {
        id: 'actions',
        label: 'Actions',
        minWidth: 170,
        align: 'right',
        formatB: () => <button>hello</button>
    },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 480,
    },
});

export function TableM() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows = useTypedSelector(state => state.packs.data.cardPacks);
    const numberPacks = useTypedSelector(state => state.packs.data.cardPacksTotalCount)
    const _userId = useTypedSelector(state => state.auth.user._id);
    const classes = useStyles();
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
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
                                            {column.label}
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
                                            <ButtonForTablePacks nameCell={column.id === 'actions' ? '' : column.id}/>
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

                                                {column.id === 'actions'
                                                    ? <BasicButtonGroup
                                                        userId={_userId === row.user_id}
                                                        name_1={'Del'} name_2={'Edit'} name_3={'Learn'}
                                                        titleOfPage={'Pack'}
                                                        nameOfCell={row.name} id={row._id}
                                                    />
                                                    : column.id === 'name'
                                                        ? < ButtonForTableCell text={value} idPack={row._id}/>
                                                        : column.format && typeof value === 'string' ? column.format(value) : value
                                                }
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
                count={numberPacks}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
