import VerEx from 'verbal-expressions';

 export const checkUrl = (url:string) => {
    const tester = VerEx()
        .startOfLine()
        .then('http')
        .maybe('s')
        .then('://')
        .maybe('www.')
        .anythingBut(' ')
        .endOfLine();

    return  tester.test(url)

}