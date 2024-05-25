// components/sectionInformationCarrousel/informationStyled.ts
import styled from 'styled-components';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export const InfoSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
  background-color: #1c1c1c;
  color: #f8f9fa;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  max-width: 1200px;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

export const InfoText = styled.div`
  flex: 1;
  padding: 1rem;
  text-align: justify;
  font-family: 'Montserrat', sans-serif;

  h2 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }

  ul {
    margin-top: 1rem;
    padding-left: 1.5rem;
    list-style: disc;
  }

  li {
    margin-bottom: 0.5rem;
  }

  @media (max-width: 768px) {
    text-align: center;

    h2 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

export const InfoImageContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const InfoImage = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.8;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

export const ContactOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  color: #ffd700;
  text-align: center;
  opacity: 0.9;
  border-radius: 10px;
  padding: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

export const ContactInfo = styled.p`
  margin: 0.5rem 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  svg {
    font-size: 1.5rem;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

export const PhoneIcon = styled(FaPhoneAlt)`
  color: #ffd700;
`;

export const EmailIcon = styled(FaEnvelope)`
  color: #ffd700;
`;
