import styled from 'styled-components';

const StyledButton = styled.button`
    cursor: pointer;
    color: white;
    font-size: 1em;
    padding: 0.25em 1em;
    border-radius: 5px;
    border: 2px solid #4485fa;
    background-color: #4485fa;
    transition: all 0.3s;

    &:hover {
        border: 2px solid #6597f3;
        background-color: #6597f3;
    }
`;

const SubmitButton = ({ name='Log in' }) => {
    return <StyledButton type='submit'>{name}</StyledButton>
}

export default SubmitButton

