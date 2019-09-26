import {models} from 'mongoose';
import moment from 'moment';

const {Students} = models;

const errors = Object.freeze({
  CPF_NOT_FOUND: "Não existe estudante para CPF informado",
  GRADUATION_DATE_OVER_LIMIT: "Para se matricular em um curso a data de colaçäo de grau do aluno devera ser menor ou igual a data de hoje acrescida de 3 meses"
});

export default async (req, res, next) => {
  
  const student = await Students.findOne({ cpf: req.body.cpf });

  if (!student)
    return res.api.send(errors.CPF_NOT_FOUND, res.api.codes.INTERNAL_SERVER_ERROR);

  const limitDate = moment().add(3, 'months');
  const graduationDate = moment(student.graduationDate);
    
  if (!graduationDate.isAfter(limitDate))
    return res.api.send(errors.GRADUATION_DATE_OVER_LIMIT, res.api.codes.INTERNAL_SERVER_ERROR);
  
  next();

}
