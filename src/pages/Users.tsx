import React from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  LinearProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add, Edit } from '@mui/icons-material';
import { useUsers } from '../hooks/useUsers';
import { UserDialog } from '../components/users/UserDialog';
import { User } from '../types/api';

const Users = () => {
  const { users, isLoading, createUser, updateUser } = useUsers();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | undefined>();

  const handleCreate = (data: User) => {
    createUser.mutate(data, {
      onSuccess: () => setDialogOpen(false),
    });
  };

  const handleUpdate = (data: User) => {
    updateUser.mutate(data, {
      onSuccess: () => setDialogOpen(false),
    });
  };

  const columns = [
    { field: 'given_name', headerName: 'First Name', flex: 1 },
    { field: 'family_name', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params: any) => (
        <Button
          startIcon={<Edit />}
          onClick={() => {
            setSelectedUser(params.row);
            setDialogOpen(true);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Users</Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => {
            setSelectedUser(undefined);
            setDialogOpen(true);
          }}
        >
          Add User
        </Button>
      </Box>

      <Paper sx={{ height: 400, width: '100%' }}>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <DataGrid
            rows={users || []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        )}
      </Paper>

      <UserDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={selectedUser ? handleUpdate : handleCreate}
        initialData={selectedUser}
      />
    </Box>
  );
};

export default Users; 