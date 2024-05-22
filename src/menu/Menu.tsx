import { Button, ThemeProvider, createTheme } from "@mui/material";

// declare module '@mui/material/Button' {
//     interface ButtonPropsVariantOverrides {
//         main: true;
//     }
// }

const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                style: {
                    backgroundColor: '#e5446d',
                    color: 'white',
                    fontFamily: 'Arvo, serif',
                    fontWeight: '600',
                    fontSize: '12pt',
                    paddingTop: '8pt',
                    paddingBottom: '8pt',
                    paddingLeft: '12pt',
                    paddingRight: '12pt',
                },
            },
        },
    },
});

function Menu() {
    return (
        <ThemeProvider theme={theme}>
            <div className="
                    bg-jet max-w-[90%] w-[500pt] h-fit p-[30pt] rounded-xl z-menu
                    fixed left-[50vw] -translate-x-1/2 top-[15pt]
                ">
                <Button>Hello World</Button>
            </div>
        </ThemeProvider>
    )
}

export default Menu;