export default {
  palette: {
    primary: {
      main: '#ad1457',
      light: '#bd4378',
      dark: '#790e3c',
      contrastText: '#fff',
    },
    secondary: {
      main: '#7986cb',
      light: '#939ed5',
      dark: '#545d8e',
      contrastText: '#fff',
    },
  },
  spreadStyles: {
    typography: {
      useNextVariants: true,
    },
    form: {
      textAlign: 'center',
    },
    image: {
      maxWidth: '5rem',
      margin: '20px auto 20px auto',
    },
    pageTitle: {
      margin: '10px auto 10px auto',
    },
    textField: {
      margin: '10px auto 10px auto',
    },
    button: {
      margin: '20px auto 10px auto',
      position: 'relative',
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10,
    },
    progress: {
      position: 'absolute',
    },
  },
  paper: {
    padding: 20,
  },
  editButton: {
    float: 'right',
  },
};
