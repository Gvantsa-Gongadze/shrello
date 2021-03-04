import styled from 'styled-components'

const StyledButton = styled.button`
    cursor: pointer;
    color: white;
    font-size: 1em;
    padding: 0.25em 1em;
    border: 2px solid #1890ff;
    border-radius: 5px;
    background-color: #1890ff;
    transition: all 0.3s;

    :hover {
        border: 2px solid #40a9ff;
        background-color: #40a9ff;;
    }
`;

const SubmitButton = ({ name='Log in' }) => {
    return <StyledButton type="submit">{name}</StyledButton>
}

export default SubmitButton

