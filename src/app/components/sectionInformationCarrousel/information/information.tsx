"use client"
import React from 'react';
import {
  InfoSection,
  InfoContainer,
  InfoText,
  InfoImageContainer,
  InfoImage,
  ContactOverlay,
  ContactInfo,
  PhoneIcon,
  EmailIcon
} from './informationStyled';

const Information: React.FC = () => {
  return (
    <InfoSection>
      <InfoContainer>
        <InfoText>
          <h2>Nuestros Servicios</h2>
          <p>
            En nuestra peluquería, nos dedicamos a proporcionar servicios de la más alta calidad
            para satisfacer todas tus necesidades de belleza y cuidado personal. Algunos de nuestros
            servicios más destacados incluyen:
          </p>
          <ul>
            <li>Cortes de cabello para hombres y mujeres</li>
            <li>Peinados y estilizados para eventos especiales</li>
            <li>Tratamientos capilares revitalizantes</li>
            <li>Coloración y mechas</li>
            <li>Manicura y pedicura</li>
            <li>Masajes relajantes y terapéuticos</li>
          </ul>
        </InfoText>
        <InfoImageContainer>
          <InfoImage src="/contact-background.webp" alt="Contacto" />
          <ContactOverlay>
            <ContactInfo>
              <PhoneIcon /> Teléfono: +123 456 789
            </ContactInfo>
            <ContactInfo>
              <EmailIcon /> Email: contacto@ejemplo.com
            </ContactInfo>
          </ContactOverlay>
        </InfoImageContainer>
      </InfoContainer>
    </InfoSection>
  );
};

export default Information;
