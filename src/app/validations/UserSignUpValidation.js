import * as Yup from 'yup';

export default Yup.object()
  .camelCase()
  .shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .required()
      .min(6),
  });
