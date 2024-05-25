// components/Footer.tsx
import React from 'react';
import {
  FooterContainer,
  FooterWrapper,
  FooterLinks,
  FooterLink,
  FooterText,
  FooterIconContainer,
  FooterIcon
} from './footerStyled';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterLinks>
          <FooterLink href="#">Home</FooterLink>
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Services</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </FooterLinks>
        <FooterIconContainer>
          <FooterIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </FooterIcon>
          <FooterIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </FooterIcon>
          <FooterIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </FooterIcon>
        </FooterIconContainer>
        <FooterText>© {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</FooterText>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
