import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const HeaderContainer = styled.header`
    display: flex;
    background-color: #407febff;
    color: white;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`;

const HeaderTtitle = styled.h1`
    text-align: center;
    margin: 0;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const UserName = styled.span`
    font-weight: 600;
`;

const UserRole = styled.span`
    font-size: 0.875rem;
    opacity: 0.9;
`;

const Header: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <HeaderContainer>
            <HeaderTtitle>
                Lista de Conteúdos
            </HeaderTtitle>
            {isAuthenticated && user && (
                <UserInfo>
                    <UserDetails>
                        <UserName>{user.nome}</UserName>
                        <UserRole>{user.role === 'PROFESSOR' ? 'Professor' : 'Aluno'}</UserRole>
                    </UserDetails>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="bg-white text-blue-600 hover:bg-gray-100"
                    >
                        Sair
                    </Button>
                </UserInfo>
            )}
        </HeaderContainer>
    );
};

export default Header;
