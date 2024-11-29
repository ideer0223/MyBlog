import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import Sidebar from './Sidebar';
import avatarImage from '../assets/images/avatar.jpg';

const Nav = styled.nav`
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const AvatarButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: none;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Nav>
        <NavContainer>
          <AvatarButton onClick={() => setIsSidebarOpen(true)}>
            <img src={avatarImage} alt="头像" />
          </AvatarButton>
          <h2>Semon's Blog</h2>
          <NavLinks>
            <NavLink to="/home">首页</NavLink>
            <NavLink to="/archives">归档</NavLink>
            <NavLink to="/categories">分类</NavLink>
            <NavLink to="/gallery">相册</NavLink>
            <NavLink to="/about">关于</NavLink>
          </NavLinks>
        </NavContainer>
      </Nav>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}

export default Navbar; 