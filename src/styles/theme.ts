import { createTheme } from '@rneui/themed';

const PRIMARY = '#aa60ff';
export const FORM_COMPONENT_WIDTH = 'auto';

export const theme = createTheme({
  lightColors: {
    primary: PRIMARY,
  },
  components: {
    Button: {
      radius: 20,
      color: 'primary',
      titleStyle: { fontWeight: 'bold', fontSize: 20 },
    },
    Text: {
      style: {
        fontSize: 20,
      },
    },
    Input: {
      inputContainerStyle: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 2,
        borderWidth: 1,
      },
    },
  },
});
