import styled, { keyframes } from 'styled-components';
import { useEffect } from 'react';
import avatarImage from '../assets/images/avatar.jpg'; // 导入图片

// 定义动画
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  opacity: 0;
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  animation: ${props => props.isOpen ? fadeIn : 'none'} 0.3s ease forwards;
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 999;
  padding: 2rem;
  transform: translateX(-100%);
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  animation: ${props => props.isOpen ? slideIn : 'none'} 0.3s ease forwards;
`;

const ContentContainer = styled.div`
  opacity: 0;
  animation: ${fadeIn} 0.3s ease 0.2s forwards;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin: 0 auto 2rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const ProfileInfo = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    margin-bottom: 0.5rem;
    color: #333;
    opacity: 0;
    animation: ${fadeIn} 0.3s ease 0.3s forwards;
  }

  p {
    color: #666;
    margin-bottom: 1rem;
    opacity: 0;
    animation: ${fadeIn} 0.3s ease 0.4s forwards;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  opacity: 0;
  animation: ${fadeIn} 0.3s ease 0.5s forwards;

  a {
    color: #666;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: #007bff;
      transform: translateY(-2px);
    }
  }
`;

const Bio = styled.div`
  color: #666;
  line-height: 1.6;
  padding: 0 1rem;
  text-align: center;
  opacity: 0;
  animation: ${fadeIn} 0.3s ease 0.6s forwards;
`;

function Sidebar({ isOpen, onClose }) {
  // 当侧边栏打开时禁止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 如果侧边栏未打开，不渲染任何内容
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <SidebarOverlay isOpen={isOpen} onClick={onClose} />
      <SidebarContainer isOpen={isOpen}>
        <ContentContainer>
          <Avatar>
            <img src={avatarImage} alt="头像" />
          </Avatar>
          <ProfileInfo>
            <h2>Semon</h2>
            <p>前端开发工程师</p>
          </ProfileInfo>
          <SocialLinks>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="mailto:your.email@example.com">
              Email
            </a>
          </SocialLinks>
          <Bio>
            热爱前端开发，专注于React技术栈。
            <br />
            喜欢写代码，也喜欢写博客分享技术经验。
          </Bio>
        </ContentContainer>
      </SidebarContainer>
    </>
  );
}

export default Sidebar; 