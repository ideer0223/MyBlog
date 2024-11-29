import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

function About() {
  return (
    <AboutContainer>
      <h1>关于我</h1>
      <p>这里是关于我的介绍...</p>
      <h2>联系方式</h2>
      <ul>
        <li>Email: example@email.com</li>
        <li>GitHub: github.com/username</li>
      </ul>
    </AboutContainer>
  );
}

export default About; 