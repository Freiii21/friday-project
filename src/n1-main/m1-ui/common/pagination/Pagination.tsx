import {createPages} from "../../utilities/pagesCreator";
import s from "./pagination.module.css"


type PaginationType = {
    setPage: (page: number) => void
    totalCountPage: number
    pageCount: number
    currentPage: number
    setValue?: (value: number) => void
}

export const Pagination = ({setPage, totalCountPage, pageCount, currentPage,setValue}: PaginationType) => {



    const totalPagesCount = Math.ceil(totalCountPage / pageCount)

    const pages: number[] = []
    createPages(pages, totalPagesCount, currentPage)
const onClick = (v:number) => {
    setValue && setValue(v)
    setPage (v)
}
    return (
        <div>
            <div className={s.container}>
                {pages.map((m, i) =>
                    <span className={currentPage === m ? s.page_active : s.page} onClick={() => onClick(m)}>{m}</span>)}
            </div>
        </div>
    )
}