import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import {
  Business,
  People,
  Book,
  Class,
  Schedule,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { title: 'Organizations', icon: <Business />, path: '/organizations' },
  { title: 'Users', icon: <People />, path: '/users' },
  { title: 'Courses', icon: <Book />, path: '/courses' },
  { title: 'Classes', icon: <Class />, path: '/classes' },
  { title: 'Academic Sessions', icon: <Schedule />, path: '/academic-sessions' },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.path}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>{item.icon}</Box>
                <Button
                  variant="contained"
                  onClick={() => navigate(item.path)}
                  fullWidth
                >
                  {item.title}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard; 