import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { useArticles } from '../data/articles';
import { Link } from 'react-router-dom';

const ArticleContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const ArticleHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    margin-bottom: 0.5rem;
  }
  
  .meta {
    color: #666;
    font-size: 0.9rem;
  }
`;

const ArticleContent = styled.div`
  line-height: 1.6;
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  ul, ol {
    margin-bottom: 1rem;
    padding-left: 2rem;
  }

  code {
    background-color: #f5f5f5;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
  }

  pre {
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
    
    code {
      background-color: transparent;
      padding: 0;
    }
  }
`;

const ArticleNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  padding: 0.5rem 1rem;
  border: 1px solid #007bff;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #007bff;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function ArticleDetail() {
  const { id } = useParams();
  const { articles, loading } = useArticles();
  const currentArticle = articles.find(a => a.id === parseInt(id));
  
  if (loading) {
    return <ArticleContainer>加载中...</ArticleContainer>;
  }

  if (!currentArticle) {
    return <ArticleContainer>文章不存在</ArticleContainer>;
  }

  // 获取当前文章的索引
  const currentIndex = articles.findIndex(a => a.id === parseInt(id));
  const prevArticle = articles[currentIndex + 1];
  const nextArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;

  return (
    <ArticleContainer>
      <ArticleHeader>
        <h1>{currentArticle.title}</h1>
        <div className="meta">
          <span>发布日期：{currentArticle.date}</span>
          <span> | </span>
          <span>分类：{currentArticle.category}</span>
        </div>
      </ArticleHeader>
      
      <ArticleContent>
        <ReactMarkdown>{currentArticle.content}</ReactMarkdown>
      </ArticleContent>

      <ArticleNavigation>
        {prevArticle ? (
          <NavLink to={`/article/${prevArticle.id}`}>
            ← 上一篇：{prevArticle.title}
          </NavLink>
        ) : (
          <div /> // 占位，保持布局
        )}
        {nextArticle && (
          <NavLink to={`/article/${nextArticle.id}`}>
            下一篇：{nextArticle.title} →
          </NavLink>
        )}
      </ArticleNavigation>
    </ArticleContainer>
  );
}

export default ArticleDetail; 