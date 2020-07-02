import * as Yup from 'yup';

export default Yup.object().shape({
  id: Yup.string().required(),
});
