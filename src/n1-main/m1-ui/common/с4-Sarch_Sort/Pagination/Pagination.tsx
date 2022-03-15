import React, {useState} from "react";
import s from "./pagination.module.css"
import {createPages} from "./pagesCreator";
import Button from "@mui/material/Button";


export const Pagination = () => {

    const [currentPage, setCurrentPage] = useState(1)  // выбранная страница
    const countPacs = 200  // сколько всего данных (паков или объектов)
    const pageSize = 10 // сколько всего отрисовывать pages

    let pagesCount = Math.ceil(countPacs / pageSize)
    let pages: number[] = []
    createPages(pages, pagesCount, currentPage)


    return (
        <div className={s.pagination_container}>
            {pages.map(page =>
                <Button onClick={() => setCurrentPage(page)}
                        sx={{
                            marginLeft: '10px',
                            lineHeight: "30px",
                            borderRadius: "10px",
                            fontSize: '15px',
                            minWidth: "40px",
                            padding: 0,
                        }}
                        disableElevation={page === currentPage} variant={'contained'} color={'primary'}>
                    {page} </Button>)}

        </div>)
}

