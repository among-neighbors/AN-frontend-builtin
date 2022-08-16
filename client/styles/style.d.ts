import 'styled-components';
declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            black: string;
            blue: string;
            white: string;
        };
        size: {
            desktop: string;
        };
    }
}
