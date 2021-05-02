import { ReactNode } from "react";
import styled from "styled-components";

interface MainLayoutProps {
    children: ReactNode
}

const StyledLayout = styled.main`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`

export function MainLayout(props: MainLayoutProps) {
    const { children } = props;

    return (
        <StyledLayout>{children}</StyledLayout>
    )
}