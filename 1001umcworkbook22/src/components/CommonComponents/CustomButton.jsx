import styled from 'styled-components';

const CustomButton = styled.button`
  display: flex;
  flex-direction: ${(props) => props.flexdirection || 'column'};
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  gap: ${(props) => props.gap || '30px'};
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  
  border: ${props => props.border || 'none'};
  background-color: ${(props) => props.backgroundColor || '#D9D9D9'};
  background-image: ${(props) => (props.backgroundImage ? `url(${props.backgroundImage})` : 'none')};
  background-size: cover;
  background-position: center;
  border-radius: ${(props) => props.borderRadius || '0.5rem'};
  padding: ${(props) => props.padding || '0.5rem'};
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.hoverColor || props.backgroundColor || '#D9D9D9'};
  }
`;

export default CustomButton;
