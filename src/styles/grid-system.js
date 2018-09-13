import styled from 'styled-components';

const MainGrid = styled.main`
    display: flex;
    flex-direction: column;
    @media(min-width: 1024px) {
        max-width: 420px;
    }
`;

export default MainGrid;