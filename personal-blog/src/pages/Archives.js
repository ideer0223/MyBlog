import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useArticles, getArticlesByYear } from '../data/articles';

const ArchivesContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const ArticleLink = styled(Link)`
  text-decoration: none;
  color: #333;
  &:hover {
    color: #007bff;
  }
`;

function Archives() {
  const { articles, loading } = useArticles();
  
  if (loading) {
    return <ArchivesContainer>加载中...</ArchivesContainer>;
  }

  if (!articles || !Array.isArray(articles) || articles.length === 0) {
    return <ArchivesContainer>暂无文章</ArchivesContainer>;
  }

  const articlesByYear = getArticlesByYear(articles);

  return (
    <ArchivesContainer>
      <h1>文章归档</h1>
      {Object.entries(articlesByYear)
        .sort(([yearA], [yearB]) => yearB - yearA)
        .map(([year, yearArticles]) => (
          <div key={year}>
            <h2>{year}年</h2>
            <ul>
              {yearArticles.map(article => (
                <li key={article.id}>
                  <ArticleLink to={`/article/${article.id}`}>
                    {article.date ? article.date.substring(5) : ''} - {article.title || '无标题'}
                  </ArticleLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </ArchivesContainer>
  );
}

export default Archives; 