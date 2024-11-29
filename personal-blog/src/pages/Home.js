import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useArticles } from '../data/articles';
import { useState } from 'react';

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const ArticleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ArticleCard = styled.article`
  padding: 1.5rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ArticleTitle = styled(Link)`
  font-size: 1.5rem;
  color: #333;
  text-decoration: none;
  margin-bottom: 0.5rem;
  display: block;
  font-weight: 600;

  &:hover {
    color: #007bff;
  }
`;

const ArticleMeta = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ArticleSummary = styled.p`
  color: #444;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ReadMore = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    text-decoration: underline;
  }

  &::after {
    content: '→';
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: translateX(4px);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #007bff;
  background-color: ${props => props.active ? '#007bff' : 'white'};
  color: ${props => props.active ? 'white' : '#007bff'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #007bff;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background-color: ${props => props.active ? '#007bff' : 'white'};
      color: ${props => props.active ? 'white' : '#007bff'};
    }
  }
`;

const PageInfo = styled.div`
  text-align: center;
  color: #666;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

function Home() {
  const { articles, loading } = useArticles();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  if (loading) {
    return <HomeContainer>加载中...</HomeContainer>;
  }

  if (!articles || articles.length === 0) {
    return <HomeContainer>暂无文章</HomeContainer>;
  }

  // 计算总页数
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  
  // 获取当前页的文章
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // 生成页码数组
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // 处理页面变化
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // 回到顶部
  };

  return (
    <HomeContainer>
      <ArticleList>
        {currentArticles.map(article => (
          <ArticleCard key={article.id}>
            <ArticleTitle to={`/article/${article.id}`}>
              {article.title}
            </ArticleTitle>
            <ArticleMeta>
              <span>发布日期：{article.date}</span>
              <span> | </span>
              <span>分类：{article.category}</span>
            </ArticleMeta>
            <ArticleSummary>
              {article.summary || article.description || '暂无简介'}
            </ArticleSummary>
            <ReadMore to={`/article/${article.id}`}>
              阅读全文
            </ReadMore>
          </ArticleCard>
        ))}
      </ArticleList>

      {totalPages > 1 && (
        <>
          <Pagination>
            <PageButton 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              上一页
            </PageButton>
            
            {pageNumbers.map(number => (
              <PageButton
                key={number}
                active={currentPage === number}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </PageButton>
            ))}
            
            <PageButton 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              下一页
            </PageButton>
          </Pagination>
          
          <PageInfo>
            第 {currentPage} 页，共 {totalPages} 页，总计 {articles.length} 篇文章
          </PageInfo>
        </>
      )}
    </HomeContainer>
  );
}

export default Home; 