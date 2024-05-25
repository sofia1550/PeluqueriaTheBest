// components/footerStyled.ts
import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  position: relative;
  width: 100%;
  bottom: 0;
`;

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px 0;
`;

export const FooterLink = styled.a`
  color: #fff;
  margin: 0 15px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const FooterText = styled.p`
  margin: 10px 0;
`;

export const FooterIconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

export const FooterIcon = styled.a`
  color: #fff;
  margin: 0 10px;
  font-size: 1.5em;
  &:hover {
    color: #ddd;
  }
`;
