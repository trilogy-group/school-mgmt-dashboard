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
import { useOrganizations } from '../hooks/useOrganizations';
import { OrganizationDialog } from '../components/organizations/OrganizationDialog';
import { Organization } from '../types/api';

const Organizations = () => {
  const { organizations, isLoading, createOrganization, updateOrganization } = useOrganizations();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedOrg, setSelectedOrg] = React.useState<Organization | undefined>();

  const handleCreate = (data: Organization) => {
    createOrganization.mutate(data, {
      onSuccess: () => setDialogOpen(false),
    });
  };

  const handleUpdate = (data: Organization) => {
    updateOrganization.mutate(data, {
      onSuccess: () => setDialogOpen(false),
    });
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params: any) => (
        <Button
          startIcon={<Edit />}
          onClick={() => {
            setSelectedOrg(params.row);
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
        <Typography variant="h5">Organizations</Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => {
            setSelectedOrg(undefined);
            setDialogOpen(true);
          }}
        >
          Add Organization
        </Button>
      </Box>

      <Paper sx={{ height: 400, width: '100%' }}>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <DataGrid
            rows={organizations || []}
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

      <OrganizationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={selectedOrg ? handleUpdate : handleCreate}
        initialData={selectedOrg}
      />
    </Box>
  );
};

export default Organizations; 