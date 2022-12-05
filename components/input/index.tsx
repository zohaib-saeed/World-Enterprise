import { InputBase, Select as MuiSelect, alpha, styled } from "@mui/material";

export const Input = styled(InputBase)(({ theme }) => ({
  "&$disabled": {
    color: "red"
  },
  '& .MuiInputBase-input': {
    position: 'relative',
    border: '1px solid #ffffffff',
    borderRadius: "8px",
    backgroundColor: theme.palette.mode === 'light' ? '#FAFBFC' : '#FAFBFC',
    
    color: "#4B4749",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: 500,
    fontFamily: [
      '"Montserrat"',
    ].join(','),
    lineHeight: "18px",

    padding: '12px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      border: '1px solid #ced4da',
    },
  },
  '& .MuiInputBase-input.Mui-disabled': {
    // "-webkit-text-fill-color": "#4B4749",
    WebkitTextFillColor: "#4B4749",
    backgroundColor: "#D8D8D8",
  },
}));

export const Select = styled(MuiSelect)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: "#FAFBFC",
  color: "#4B4749",
  fontSize: "15px",
  fontWeight: 500,
  fontStyle: "normal",
  fontFamily: "Montserrat",
    borderColor: "#FFFFFFFF",

  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: "#FFFFFFFF !important",
  },
  '& .MuiOutlinedInput-input': {
    padding: "12px",
    borderRadius: "8px",

  },
  '& Mui-disabled ~ .MuiOutlinedInput-notchedOutline': {
    borderColor: "#FFFFFFFF",
  },
  '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled': {
    // "-webkit-text-fill-color": "#4B4749",
    WebkitTextFillColor: "#4B4749",
    backgroundColor: "#D8D8D8",
    borderColor: "#FFFFFFFF",
    borderRadius: "8px",

  },
  // '&$focused .MuiOutlinedInput-notchedOutline': {
  //   boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
  //   border: '1px solid #ced4da',
  // }
}))
