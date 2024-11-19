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
import { useAcademicSessions } from '../hooks/useAcademicSessions';
import { AcademicSessionDialog } from '../components/academic-sessions/AcademicSessionDialog';
import { AcademicSession } from '../types/api';

const AcademicSessions = () => {
  const { academicSessions, isLoading, createAcademicSession, updateAcademicSession } = useAcademicSessions();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedSession, setSelectedSession] = React.useState<AcademicSession | undefined>();

  const handleCreate = (data: AcademicSession) => {
    createAcademicSession.mutate(data, {
      onSuccess: () => setDialogOpen(false),
    });
  };

  const handleUpdate = (data: AcademicSession) => {
    updateAcademicSession.mutate(data, {
      onSuccess: () => setDialogOpen(false),
    });
  };

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'session_type', headerName: 'Type', width: 150 },
    { field: 'start_date', headerName: 'Start Date', width: 150 },
    { field: 'end_date', headerName: 'End Date', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params: any) => (
        <Button
          startIcon={<Edit />}
          onClick={() => {
            setSelectedSession(params.row);
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
        <Typography variant="h5">Academic Sessions</Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => {
            setSelectedSession(undefined);
            setDialogOpen(true);
          }}
        >
          Add Academic Session
        </Button>
      </Box>

      <Paper sx={{ height: 400, width: '100%' }}>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <DataGrid
            rows={academicSessions || []}
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

      <AcademicSessionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={selectedSession ? handleUpdate : handleCreate}
        initialData={selectedSession}
      />
    </Box>
  );
};

export default AcademicSessions; 