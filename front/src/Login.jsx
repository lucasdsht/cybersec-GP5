import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Adresse Email invalide').required('Requis'),
      password: Yup.string().required('Requis'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('https://a29b-79-174-199-110.ngrok-free.app/api/login/', {
          email: values.email,
          password: values.password,
        });
        console.log('User logged in:', response.data);
        login();
        navigate('/articles');
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
      <button type="submit">Connexion</button>
      <p>Vous n avez pas de compte ? <Link to="/register">Inscrivez-vous</Link></p>
    </form>
  );
};

export default Login;