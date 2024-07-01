import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleForm from './ArticleForm';
import './ArticlesList.css';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://a29b-79-174-199-110.ngrok-free.app/api/posts/');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://a29b-79-174-199-110.ngrok-free.app/api/post/${id}`);
      setArticles(articles.filter(article => article.id !== id));
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleSave = (savedArticle) => {
    if (editingArticle) {
      setArticles(articles.map(article => article.id === savedArticle.id ? savedArticle : article));
    } else {
      setArticles([...articles, savedArticle]);
    }
    setEditingArticle(null);
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
  };

  return (
    <div>
      <h1>Articles</h1>
      <ArticleForm article={editingArticle} onSave={handleSave} />
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <button onClick={() => handleEdit(article)}>Edit</button>
            <button onClick={() => handleDelete(article.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesList;
