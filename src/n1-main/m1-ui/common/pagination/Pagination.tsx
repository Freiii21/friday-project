import {createPages} from '../../utilities/pagesCreator';
import s from './pagination.module.css'


type PaginationType = {
    setPage: (page: number) => void
    totalCountPage: number
    pageCount: number
    currentPage: number

}

export const Pagination = ({setPage, totalCountPage, pageCount, currentPage}: PaginationType) => {


    const totalPagesCount = Math.ceil(totalCountPage / pageCount)
    const pages: number[] = []
    createPages(pages, totalPagesCount, currentPage)
    const onClickHandler = (v: number) => {
        setPage(v)
    }
    return (
        <div>
            <div className={s.container}>
                {pages.map((m, i) =>
                    <span key={i} className={currentPage === m ? s.page_active : s.page}
                          onClick={() => onClickHandler(m)}>{m}</span>)}
            </div>
        </div>
    )
}