import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 2rem 0;
  margin-top: 4rem;
  border-top: 1px solid #eee;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const FooterLinks = styled.div`
  margin-bottom: 1rem;
  
  a {
    color: #666;
    text-decoration: none;
    margin: 0 1rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: #007bff;
    }
  }
`;

const Copyright = styled.div`
  margin-bottom: 0.5rem;
`;

const ICP = styled.div`
  a {
    color: #666;
    text-decoration: none;
    
    &:hover {
      color: #007bff;
    }
  }
`;

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <a href="/about">关于我</a>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="mailto:your.email@example.com">联系我</a>
        </FooterLinks>
        <Copyright>
          © {currentYear} 刘灿的个人博客. All Rights Reserved.
        </Copyright>
        <ICP>
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
            浙ICP备XXXXXXXX号-1
          </a>
        </ICP>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer; 