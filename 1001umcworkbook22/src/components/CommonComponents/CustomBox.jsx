import styled from 'styled-components';

const CustomBox = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexdirection || 'column'};
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};

  min-width: ${(props) => props.minWidth || 'auto'};
  min-height: ${(props) => props.minHeight || 'auto'};

  gap: ${(props) => props.gap || '30px'};
  align-items: ${(props) => props.alignItems || 'flex-start'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  
  background-color: ${(props) => props.backgroundColor || '#D9D9D9'};
  background-image: ${(props) => (props.backgroundImage ? `url(${props.backgroundImage})` : 'none')};
  background-size: cover;
  background-position: center;

  border-radius: ${(props) => props.borderRadius || '0.5rem'};
  padding: ${(props) => props.padding || '0.5rem'};

  opacity: ${props => props.opacity || '100'};
`;

export default CustomBox;
