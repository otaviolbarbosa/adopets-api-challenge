import * as Yup from 'yup';

export default Yup.object()
  .camelCase()
  .shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string().required(),
  });
