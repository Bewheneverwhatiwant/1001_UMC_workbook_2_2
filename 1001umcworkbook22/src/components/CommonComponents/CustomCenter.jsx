import styled from 'styled-components';

const CustomCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'auto'};
`;

export default CustomCenter;