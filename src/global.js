import _ from "lodash"; 
 
    
export function  convertOperation(value)  {
    let name;
    switch (value) {
        case 'substract':
            name = '-';
            break;
        case 'addiction':
            name = '+';
            break;
        case 'multiplication':
            name = '*';
            break;
        case 'division':
            name = '/';
            break;
    }
    return name;
}

export function convertOperationToDisplay (value)  {
    let name;
    switch (value) {
        case 'substract':
            name = '<span>&#8722;</span>';
            break;
        case 'addiction':
            name = '<span>&#43;</span>';
            break;
        case 'multiplication':
            name = '<span>&#215;</span>';
            break;
        case 'division':
            name = '<span>&#247;</span>';
            break;
    }
    return name;
}

export function number_test (n) {
    var result = (n - Math.floor(n)) !== 0;

    if (result)
        return false;
    else
        return true;
};

export function generateEquations(operation, count){
        let eq = [];
        const op = convertOperation(operation);
        const opDisplay = convertOperationToDisplay(operation);

        if (!_.isEmpty(operation) && count > 0) {
            while (eq.length < count) {
                let max = 12
                let min = Math.floor(Math.random() * max);
                let b = Math.floor(Math.random() * (max - min + 1)) + min;
                let eValue = (eval(b + op + min) || 0) + 0;
                let elem = { equation: b + opDisplay + min, correctAnswer: eValue, studentAnswer: 0, operation: op };
                if (!_.includes(eq, elem)) {
                    if (operation === 'division') {
                        if (number_test(eValue)) {
                            eq.push(elem);
                        }
                    } else {
                        eq.push(elem);
                    }
                }

            }
        }
        return eq;
}