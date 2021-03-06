import _ from "lodash";


export function convertOperation(value) {
    let name;
    switch (value) {
        case 'subtract':
            name = '-';
            break;
        case 'addition':
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

export function subtract() {
    return '<span>&#8722;</span>';
}

export function addition() {
    return '<span>&#43;</span>';
}

export function multiplication() {
    return '<span>&#215;</span>';
}

export function division() {
    return '<span>&#247;</span>';
}

export function convertOperationToDisplay(value) {
    let name;
    switch (value) {
        case 'subtract':
            name = subtract();
            break;
        case 'addition':
            name = addition();
            break;
        case 'multiplication':
            name = multiplication();
            break;
        case 'division':
            name = division();
            break;
    }
    return name;
}

export function number_test(n) {
    var result = (n - Math.floor(n)) !== 0;

    if (result)
        return false;
    else
        return true;
};

export function generateEquations(operation, count, practiceNumber) {
    let eq = [];
    const op = convertOperation(operation);
    const opDisplay = convertOperationToDisplay(operation);

    if (!_.isEmpty(operation) && count > 0) {
        while (eq.length < count) {
            let max = 12
            let min = Math.floor(Math.random() * max);
            let b = _.isEqual(practiceNumber,0) ? Math.floor(Math.random() * (max - min + 1)) + min : practiceNumber;

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

export function validate(values) {
    const errors = {};
    const requiredFields = [
        'firstName',
        'lastName',
        'email',
        'notes',
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }
    return errors;
}
export function Text1_en() {
    let title = 'Instant recall of facts';
    let body = "Our mission statement is to get anyone and everyone to be able ";
    body += "to recall math facts such as addition, subtraction, multiplication, ";
    body += "and division. Always remember that practice makes perfect!";
    
    return { title: title, body: body };
}


export function Text2_en() {
    let title = 'Study math facts';
    let body = "When you start using our website and practice math facts everyday, it would benefit any individual ";
    body += "the ability to master day-to-day basic math facts. This is certainly critical to anyone's success. ";
    body += "Remember, don't solve it on paper, no finger counting, and only use your  head to practice math facts.";

    return { title: title, body: body };
}

export function Text3_en() {
    let title = 'Why math facts so important?';
    let body = "Practicing math facts everyday helps you achieve higher math level concepts. ";
    body += "Math facts are critical for one's personal growth and success as well as used in everyday life.";

    return { title: title, body: body };
}
