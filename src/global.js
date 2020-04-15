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