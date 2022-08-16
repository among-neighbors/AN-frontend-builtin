import styled from 'styled-components';
export const Dl = styled.dl`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50%;
    font-size: 1.2rem;
    background-color: ${({ theme: { colors } }) => colors.white};
    color: ${({ theme: { colors } }) => colors.black};
    padding: 1rem;
    border-radius: 1rem;
    ::before {
        content: '';
        top: -1.5rem;
        width: 0;
        height: 0;
        position: absolute;
        border-left: 1rem solid transparent;
        border-right: 1rem solid transparent;
        border-top: 1rem solid transparent;
        border-bottom: 1rem solid ${({ theme: { colors } }) => colors.white};
    }
    div:first-child {
        margin-bottom: 0.7rem;
    }
    div {
        display: flex;
        justify-content: center;
        dd {
            margin-left: 1rem;
        }
    }
    @media ${({ theme: { size } }) => size.desktop} {
        font-size: 1.7rem;
    }
`;
