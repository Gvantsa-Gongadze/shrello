import { ReactNode } from 'react';
import styled from 'styled-components';

interface MainLayoutProps {
    children: ReactNode
}

const StyledLayout = styled.main`
    padding: 100px;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    text-align: center;
    background-color: #eee2dc;
`

export function MainLayout(props: MainLayoutProps) {
    const { children } = props;

    return (
        <StyledLayout>{children}</StyledLayout>
    )
}