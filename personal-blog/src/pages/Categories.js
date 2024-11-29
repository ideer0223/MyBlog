import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useArticles, getArticlesByCategory } from '../data/articles';

const CategoriesContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const CategorySection = styled.div`
  margin-bottom: 2rem;
`;

const ArticleLink = styled(Link)`
  text-decoration: none;
  color: #333;
  &:hover {
    color: #007bff;
  }
`;

function Categories() {
  const { articles, loading } = useArticles();
  const articlesByCategory = getArticlesByCategory(articles);

  if (loading) {
    return <CategoriesContainer>加载中...</CategoriesContainer>;
  }

  return (
    <CategoriesContainer>
      <h1>文章分类</h1>
      {Object.entries(articlesByCategory).map(([category, categoryArticles]) => (
        <CategorySection key={category}>
          <h2>{category}</h2>
          <ul>
            {categoryArticles.map(article => (
              <li key={article.id}>
                <ArticleLink to={`/article/${article.id}`}>
                  {article.date} - {article.title}
                </ArticleLink>
              </li>
            ))}
          </ul>
        </CategorySection>
      ))}
    </CategoriesContainer>
  );
}

export default Categories; 