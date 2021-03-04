import styled from 'styled-components'

const StyledButton = styled.button`
    color: white;
    font-size: 1em;
    padding: 0.25em 1em;
    border: 2px solid #1890ff;
    border-radius: 5px;
    background-color: #1890ff;
`;

const BlueButton = ({ name='Log in' }) => {
    return <StyledButton type="submit">{name}</StyledButton>
}

export default BlueButton

