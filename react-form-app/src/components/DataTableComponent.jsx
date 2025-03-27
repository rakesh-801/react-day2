
import { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography,
  Avatar,
  Chip,
  TablePagination,
  useTheme,
  LinearProgress
} from '@mui/material';
import { getUsers } from '../services/api';

// Helper function to capitalize first letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Custom header cell component
const HeaderCell = ({ children }) => (
  <TableCell sx={{
    fontWeight: 'bold',
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
    borderBottom: 'none',
    fontSize: '1rem'
  }}>
    <Typography variant="subtitle1">{children}</Typography>
  </TableCell>
);

// Custom body cell component
const BodyCell = ({ value }) => (
  <TableCell sx={{
    borderBottom: '1px solid',
    borderColor: 'divider'
  }}>
    {value}
  </TableCell>
);

export default function DataTableComponent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <LinearProgress />;
  }

  if (users.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="textSecondary">
          No users found
        </Typography>
      </Paper>
    );
  }

  // Get all unique keys from the first user
  const columns = users[0] ? Object.keys(users[0]) : [];

  return (
    <Paper elevation={4} sx={{ 
      borderRadius: 4,
      overflow: 'hidden',
      width: '100%',
      maxWidth: '1200px',
      mx: 'auto'
    }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="user data table">
          <TableHead>
            <TableRow>
              {columns.map((key) => (
                <HeaderCell key={key}>
                  {capitalize(key).replace(/([A-Z])/g, ' $1')}
                </HeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow 
                  key={user.id} 
                  hover
                  sx={{ 
                    '&:last-child td': { borderBottom: 0 },
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                >
                  {columns.map((key) => {
                    const value = user[key];
                    // Special rendering for certain fields
                    if (key === 'name') {
                      return (
                        <TableCell key={key} sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ 
                            bgcolor: theme.palette.secondary.main,
                            mr: 2,
                            width: 32,
                            height: 32
                          }}>
                            {value.charAt(0).toUpperCase()}
                          </Avatar>
                          {value}
                        </TableCell>
                      );
                    }
                    if (key === 'gender') {
                      return (
                        <TableCell key={key}>
                          <Chip 
                            label={value} 
                            color={
                              value.toLowerCase() === 'male' ? 'primary' : 
                              value.toLowerCase() === 'female' ? 'secondary' : 'default'
                            }
                            variant="outlined"
                          />
                        </TableCell>
                      );
                    }
                    return <BodyCell key={key} value={value} />;
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      />
    </Paper>
  );
}