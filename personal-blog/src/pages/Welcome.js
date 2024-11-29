import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import avatarImage from '../assets/images/avatar.jpg';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const expandCircle = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(200);
  }
`;

const WelcomeContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  animation: ${fadeIn} 1s ease forwards;
  opacity: ${props => props.isLeaving ? 0 : 1};
  animation: ${props => props.isLeaving ? fadeOut : fadeIn} 0.5s ease forwards;
  position: relative;
  overflow: hidden;
`;

const AvatarContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TransitionCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  background-color: #007bff;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: ${props => props.isExpanding ? expandCircle : 'none'} 0.8s ease forwards;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  text-align: center;
`;

const Hint = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin-top: 1rem;
  opacity: 0.8;
`;

function Welcome() {
  const navigate = useNavigate();
  const [isLeaving, setIsLeaving] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  const handleAvatarClick = () => {
    setIsExpanding(true);
    setIsLeaving(true);
    
    // 等待动画完成后跳转
    setTimeout(() => {
      navigate('/home');
    }, 800);
  };

  return (
    <WelcomeContainer isLeaving={isLeaving}>
      <AvatarContainer onClick={handleAvatarClick}>
        <Avatar>
          <img src={avatarImage} alt="头像" />
        </Avatar>
      </AvatarContainer>
      <Title>欢迎来到我的博客</Title>
      <Subtitle>分享技术，记录生活</Subtitle>
      <Hint>点击头像进入博客</Hint>
      <TransitionCircle isExpanding={isExpanding} />
    </WelcomeContainer>
  );
}

export default Welcome; 