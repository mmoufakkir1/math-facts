export const HEADER_STATE = 'HEADER_STATE';


export function updateHeaderState(header) {
    return {
        type: HEADER_STATE,
        payload: header,
    }
}
