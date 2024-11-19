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
import { useClasses } from '../hooks/useClasses';
import { ClassDialog } from '../components/classes/ClassDialog';
import { Class } from '../types/api';

const Classes = () => {
  const { classes, isLoading, createClass, updateClass } = useClasses();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedClass, setSelectedClass] = React.useState<Class | undefined>();

  const handleCreate = (data: Class) => {
    createClass.mutate(data, {
      onSuccess: () => setDialogOpen(false),
    });
  };

  const handleUpdate = (data: Class) => {
    updateClass.mutate(data, {
      onSuccess: () => setDialogOpen(false),
    });
  };

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'class_code', headerName: 'Class Code', width: 150 },
    { field: 'class_type', headerName: 'Type', width: 120 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params: any) => (
        <Button
          startIcon={<Edit />}
          onClick={() => {
            setSelectedClass(params.row);
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
        <Typography variant="h5">Classes</Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => {
            setSelectedClass(undefined);
            setDialogOpen(true);
          }}
        >
          Add Class
        </Button>
      </Box>

      <Paper sx={{ height: 400, width: '100%' }}>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <DataGrid
            rows={classes || []}
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

      <ClassDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={selectedClass ? handleUpdate : handleCreate}
        initialData={selectedClass}
      />
    </Box>
  );
};

export default Classes; 