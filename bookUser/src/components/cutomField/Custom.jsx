import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const Custom = styled(TextField)(({ theme }) => ({
  '& label': {
    color: 'white',
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
      borderWidth:"2px"
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
}));

export default Custom;
