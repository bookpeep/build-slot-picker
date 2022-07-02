import { createTheme } from "@mui/material/styles";
import type {} from '@mui/x-date-pickers/themeAugmentation';

export const peepTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:focus': {
            color: 'pink',
            backgroundColor: 'green',
          },
        },
      },
    },
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
  },
});
