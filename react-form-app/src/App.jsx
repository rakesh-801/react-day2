import { useState } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import FormComponent from './components/FormComponent';
import DataTableComponent from './components/DataTableComponent';

export default function App() {
  const [refresh, setRefresh] = useState(false);

  const handleSuccess = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          py: 4,
          bgcolor: '#f5f5f5'
        }}
      >
        {/* Form Container - Directly placed in Container */}
        
          <FormComponent onSuccess={handleSuccess} />
      

        {/* Table Container - Directly placed in Container */}
  
          <DataTableComponent key={refresh} />
    
      </Container>
    </>
  );
}