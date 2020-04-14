export const HEADER_STATE = 'HEADER_STATE';
export const  OPERATION_STATE ='OPERATION_STATE';
export const   RESULT_STATE = 'RESULT_STATE;'
export const EQUATION_COUNT_STATE= 'EQUATION_COUNT_STATE';
export const EQUATIONS_STATE= 'EQUATIONS_STATE';
export const MODAL_EQUATION_STATE='MODAL_EQUATION_STATE';

export function updateHeaderState(header) {
    return {
        type: HEADER_STATE,
        payload: header,
    }
}

export function updateOperationState(operation) {
    return {
        type: OPERATION_STATE,
        payload: operation,
    }
}

export function updateResultState(result) {
    return {
        type: RESULT_STATE,
        payload: result,
    }
}

export function updateEquationCountState(count) {
    return {
        type: EQUATION_COUNT_STATE,
        payload: count,
    }
}

export function updateEquationsState(equations) {
    return {
        type: EQUATIONS_STATE,
        payload: equations,
    }
}

export function updateModalEquationsState(open) {
    return {
        type: MODAL_EQUATION_STATE,
        payload: open,
    }
}