import styled from 'styled-components';
export const Section = styled.section`
    display: flex;
    height: 90vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    label {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 1.8rem;
        font-weight: 700;
        opacity: 0.8;
        margin-bottom: 1rem;
        cursor: pointer;
        :hover {
            opacity: 1;
        }
        transition: opacity ease-in-out 250ms;
    }
    #file {
        position: absolute;
        overflow: hidden;
        z-index: -1;
        width: 0;
        height: 0;
        padding: 0;
        border: 0;
    }
    #spinner {
        width: 10rem;
        height: 10rem;
        border: 1.5rem solid ${({ theme: { colors } }) => colors.white};
        border-top: 1.5rem solid rgba(163, 151, 198, 1);
        border-radius: 50%;
        animation: spin 500ms linear infinite;
        margin-bottom: 1.5rem;
    }
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @media ${({ theme: { size } }) => size.desktop} {
        label {
            font-size: 2.5rem;
        }
    }
`;
