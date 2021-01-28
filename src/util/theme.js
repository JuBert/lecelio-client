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
      margin: '20px auto 20px auto',
    },
    pageTitle: {
      margin: '10px auto 10px auto',
    },
    textField: {
      margin: '10px auto 10px auto',
    },
    button: {
      marginTop: 20,
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
    invisibleSeparator: {
      border: 'none',
      margin: 4,
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20,
    },
    paper: {
      padding: 20,
    },
    profile: {
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle',
        },
        '& a': {
          color: '#ad1457',
        },
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0',
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px',
      },
    },
    '& .aisSearchBox': {
      margin: '1em 0',
    },
    '& .aisPagination': {
      marginTop: '1em',
    },
    '& .leftPanel': {
      float: 'left',
      width: '250px',
    },
    '& .rightPanel': {
      marginLeft: '260px',
    },
    '& .aisInstantSearch': {
      maxWidth: '960px',
      overflow: 'hidden',
      margin: '0 auto',
    },
    '& .aisHitsItem': {
      marginBottom: '1em',
      width: 'calc(50% - 1rem)',
    },
    '& .aisHitsItemImg': {
      marginRight: '1em',
    },
    '& .hitName': {
      marginBottom: '0.5em',
    },
    '& .hitDescription': {
      color: '#888',
      fontSize: '14px',
      marginBottom: '0.5em',
    },
  },
};
