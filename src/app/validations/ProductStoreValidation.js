import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  category: Yup.string().required(),
  price: Yup.number().required(),
  amount: Yup.number().required(),
});
