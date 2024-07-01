import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './ArticleForm.css';

const ArticleForm = ({ article, onSave }) => {
  const formik = useFormik({
    initialValues: {
      title: article ? article.title : '',
      content: article ? article.content : '',
    },
    enableReinitialize: true,  // Permet de réinitialiser le formulaire lorsque l'article change
    validationSchema: Yup.object({
      title: Yup.string().required('Requis'),
      content: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const response = article
          ? await axios.put(`http://localhost:3000/api/post/${article.id}`, values)
          : await axios.post('http://localhost:3000/api/post/', values);
        onSave(response.data);
      } catch (error) {
        console.error('Error saving article:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <div>{formik.errors.title}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.content}
        />
        {formik.touched.content && formik.errors.content ? (
          <div>{formik.errors.content}</div>
        ) : null}
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default ArticleForm;
