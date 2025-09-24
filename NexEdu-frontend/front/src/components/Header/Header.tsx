import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    display: flex;
    background-color: #407febff;
    color: white;
    justify-content: center;
    padding: 20px;
`;

const HeaderTtitle = styled.h1`
    text-align:center;
`;

const Header: React.FC = () => {
    return(
        <HeaderContainer>
            <HeaderTtitle>
                Lista dos conteúdos
            </HeaderTtitle>
        </HeaderContainer>
    );
};

export default Header;
