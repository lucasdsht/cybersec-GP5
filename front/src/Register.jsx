import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Il doit contenir au moins 3 caractères')
        .required('Requis'),
      email: Yup.string().email('Adresse Email invalide').required('Requis'),
      password: Yup.string()
        .min(8, 'Doit contenir au moins 8 caractères')
        .required('Requis'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mot de passe non identique')
        .required('Requis'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:3000/api/register/', {
          email: values.email,
          password: values.password,
          username: values.username
        });
        console.log('User registered:', response.data);
        login();
        navigate('/articles');
      } catch (error) {
        console.error('Registration error:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="email">Adresse Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div>{formik.errors.confirmPassword}</div>
        ) : null}
      </div>
      <button type="submit">S inscrire</button>
      <p>Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link></p>
    </form>
  );
};

export default Register;
