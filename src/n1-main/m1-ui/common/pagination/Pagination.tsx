import {useDispatch} from "react-redux";
import {createPages} from "../../utilities/pagesCreator";
import s from "./pagination.module.css"


type PaginationType = {
    setPage: (page: number) => void
    totalCountPage: number
    pageCount: number
    currentPage: number
}

export const Pagination = ({setPage, totalCountPage, pageCount, currentPage}: PaginationType) => {

    const dispatch = useDispatch()

    const totalPagesCount = Math.ceil(totalCountPage / pageCount)

    const pages: number[] = []
    createPages(pages, totalPagesCount, currentPage)

    return (
        <div>
            <div className={s.container}>
                {pages.map((m, i) =>
                    <span className={currentPage === m ? s.page_active : s.page}  onClick={() => dispatch(setPage(m))}>{m}</span>)}
            </div>
        </div>
    )
}