import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { galleryImages } from '../data/galleryData';

const GalleryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

const MasonryGrid = styled.div`
  column-count: 3;
  column-gap: 1rem;
  
  @media (max-width: 900px) {
    column-count: 2;
  }
  
  @media (max-width: 600px) {
    column-count: 1;
  }
`;

const ImageCard = styled.div`
  break-inside: avoid;
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  background-color: #f5f5f5;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  max-width: 90%;
  max-height: 90vh;
  position: relative;
  
  img {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  
  &:hover {
    opacity: 0.8;
  }
`;

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 预加载图片
    const loadImages = async () => {
      try {
        const loadedImgs = await Promise.all(
          galleryImages.map(img => {
            return new Promise((resolve) => {
              const image = new Image();
              image.src = img.src;
              image.onload = () => resolve(img);
              image.onerror = () => {
                console.error(`Failed to load image: ${img.src}`);
                resolve({ ...img, error: true });
              };
            });
          })
        );
        setLoadedImages(loadedImgs.filter(img => !img.error));
        setLoading(false);
      } catch (error) {
        console.error('Error loading images:', error);
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <GalleryContainer>
        <Title>加载中...</Title>
      </GalleryContainer>
    );
  }

  return (
    <GalleryContainer>
      <Title>我的相册</Title>
      <MasonryGrid>
        {loadedImages.map(image => (
          <ImageCard 
            key={image.id} 
            onClick={() => handleImageClick(image)}
          >
            <img src={image.src} alt={image.title} />
          </ImageCard>
        ))}
      </MasonryGrid>

      {selectedImage && (
        <Modal onClick={handleCloseModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
            <img src={selectedImage.src} alt={selectedImage.title} />
          </ModalContent>
        </Modal>
      )}
    </GalleryContainer>
  );
}

export default Gallery; 