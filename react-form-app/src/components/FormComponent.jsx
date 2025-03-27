import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  TextField, 
  Button, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  Paper, 
  Typography,
  FormControl,
  FormLabel,
  Grid,
  Container,
  Box,
  Avatar,
  Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createUser } from '../services/api';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  age: Yup.number().required('Required').positive().integer(),
  gender: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  pincode: Yup.string().matches(/^\d{6}$/, 'Must be 6 digits'),
  password: Yup.string().min(8, 'Too short!').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

export default function FormComponent({ onSuccess }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      gender: '',
      address: '',
      pincode: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const { confirmPassword, ...userData } = values;
        await createUser(userData);
        resetForm();
        onSuccess();
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    
      <Box
        sx={{
          width: '500px',
          marginTop: 8,
          display: 'flex',
          margin: '50px auto',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          User Registration
        </Typography>
        <Paper elevation={6} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Full Name"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  InputProps={{
                    style: { borderRadius: 12 }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="age"
                  name="age"
                  label="Age"
                  type="number"
                  variant="outlined"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.age && Boolean(formik.errors.age)}
                  helperText={formik.touched.age && formik.errors.age}
                  InputProps={{
                    style: { borderRadius: 12 }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend" sx={{ mb: 1 }}>Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    sx={{ justifyContent: 'space-between' }}
                  >
                    <FormControlLabel 
                      value="male" 
                      control={<Radio color="primary" />} 
                      label="Male" 
                    />
                    <FormControlLabel 
                      value="female" 
                      control={<Radio color="primary" />} 
                      label="Female" 
                    />
                    <FormControlLabel 
                      value="other" 
                      control={<Radio color="primary" />} 
                      label="Other" 
                    />
                  </RadioGroup>
                  {formik.touched.gender && formik.errors.gender && (
                    <Typography color="error" variant="caption">
                      {formik.errors.gender}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label="Address"
                  multiline
                  rows={3}
                  variant="outlined"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                  InputProps={{
                    style: { borderRadius: 12 }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="pincode"
                  name="pincode"
                  label="Pincode"
                  variant="outlined"
                  value={formik.values.pincode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                  helperText={formik.touched.pincode && formik.errors.pincode}
                  InputProps={{
                    style: { borderRadius: 12 }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    style: { borderRadius: 12 }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  InputProps={{
                    style: { borderRadius: 12 }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: 3,
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    }
                  }}
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? 'Submitting...' : 'Register'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    
  );
}