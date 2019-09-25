// Joi Validate
import createValidate           from './_validates/create.validate';
import readByCpfValidate        from './_validates/readCpf.validate';

// Example Middleware
import create               from './create';
import read                 from './read';
import readByCpf            from './readByCpf';

export default (route) => {

    // Route to create new enrollment
    route.post('/enrollments', [
        createValidate,
        create
    ]);

    // Route to read all enrollments
    route.get('/enrollments', read);

    // Route to read all enrollments by student cpf
    route.get('/enrollments/cpf/:cpf', [
        readByCpfValidate,
        readByCpf
    ]);

};
