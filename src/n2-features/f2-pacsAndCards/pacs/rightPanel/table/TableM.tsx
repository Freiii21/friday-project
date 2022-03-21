import React, {ChangeEvent, useEffect} from 'react';
import s from './tableM.module.css'
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {useTypedSelector} from '../../../../../n1-main/m2-bll/redux';
import {DateTime} from 'luxon';
import BasicButtonGroup from '../../../../../n1-main/m1-ui/common/ComponentsForTabels/BasicButtonGroup';
import {ButtonForTableCell} from '../../../../../n1-main/m1-ui/common/ComponentsForTabels/ButtonForTableCell';
import {Pagination} from "../../../../../n1-main/m1-ui/common/pagination/Pagination";
import {
    getPacksTC,
    setCurrentPage,
    setPageCount,
    setSortPacks
} from "../../../../../n1-main/m2-bll/reducers/packsReducer";
import {useDispatch} from "react-redux";
import FormControl from "@mui/material/FormControl";
import {InputLabel, NativeSelect,} from "@material-ui/core";
import {useDebounce} from "use-debounce";
import {ButtonForTablePacks} from "../../../../../n1-main/m1-ui/common/ComponentsForTabels/ButtonForTablePacks";


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
    const classes = useStyles();

    const dispatch = useDispatch()
    const rows = useTypedSelector(state => state.packs.data.cardPacks);

    const _userId = useTypedSelector(state => state.auth.user._id);
    const currentPage = useTypedSelector(state => state.packs.getPackData.page);
    const totalCountPage = useTypedSelector(state => state.packs.data.cardPacksTotalCount);
    const pageCount = useTypedSelector(state => state.packs.getPackData.pageCount);
    const cardSetMin = useTypedSelector(state => state.packs.getPackData.min);
    const cardSetMax = useTypedSelector(state => state.packs.getPackData.max);
    const cardsName = useTypedSelector(state => state.packs.getPackData.packName)
    const cardsSortValue = useTypedSelector(state => state.packs.getPackData.sortPacks)

    const minValueDebounce = useDebounce(cardSetMin, 1000)
    const maxValueDebounce = useDebounce(cardSetMax, 1000)
    const cardsNameDebounce = useDebounce(cardsName, 1000)


    useEffect(() => {
        dispatch(getPacksTC())
    }, [currentPage, pageCount, minValueDebounce[0], maxValueDebounce[0], cardsNameDebounce[0], cardsSortValue])

    const rowsPerPage = pageCount

    const handleChangeSelect = (e: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        dispatch(setPageCount(e.currentTarget.value as number))
    }
    const handlerSetSortPacs = (sortValue: string) => {
        dispatch(setSortPacks(sortValue))
    }
    const paginationHandler = (value: number) => {
        dispatch(setCurrentPage(value))
    }


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
                                            <ButtonForTablePacks
                                                handlerSetSortPacs={handlerSetSortPacs}
                                                nameCell={column.id === 'actions' ? '' : column.id}/>
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
                                                        color={false}
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
            <div className={s.container_pag}>

                <div className={s.select_container}>
                    <FormControl>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Page count
                        </InputLabel>
                        <NativeSelect
                            defaultValue={pageCount}
                            inputProps={{
                                name: 'Page count',
                                id: 'uncontrolled-native',
                            }}
                            onChange={handleChangeSelect}
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={75}>75</option>
                        </NativeSelect>
                    </FormControl>
                </div>
                <Pagination
                    setPage={paginationHandler}
                    totalCountPage={totalCountPage}
                    pageCount={pageCount}
                    currentPage={currentPage}
                />
            </div>
        </Paper>
    );
}

