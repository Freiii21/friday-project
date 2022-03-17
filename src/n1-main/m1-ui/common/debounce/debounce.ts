
// export const debounce = (fn: Function, ms :number) => {
//
//     let timeoutId: ReturnType<typeof setTimeout>;
//     return function (this: any, ...args: any[]) {
//         console.log(timeoutId)
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => fn.apply(this, args), ms);
//     };
// };



export function debounce (fn: Function, ms :number){
    let timeoutId: ReturnType<typeof setTimeout> | null;
    return function (...args: any[]){
        // @ts-ignore
        const context: any = this
        if(timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() =>{
            timeoutId = null
            fn.apply(context, args)}, ms)
        }
}