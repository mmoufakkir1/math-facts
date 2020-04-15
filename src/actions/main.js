export const EQUATIONS_STATE= 'EQUATIONS_STATE';

export function updateEquationsState(equations) {
    return {
        type: EQUATIONS_STATE,
        payload: equations,
    }
}
