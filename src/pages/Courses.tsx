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
import { useCourses } from '../hooks/useCourses';
import { CourseDialog } from '../components/courses/CourseDialog';
import { Course } from '../types/api';

const Courses = () => {
  const { courses, isLoading, createCourse, updateCourse } = useCourses();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState<Course | undefined>();

  const handleCreate = (data: Course) => {
    createCourse.mutate(data, {
      onSuccess: () => setDialogOpen(false),
    });
  };

  const handleUpdate = (data: Course) => {
    updateCourse.mutate(data, {
      onSuccess: () => setDialogOpen(false),
    });
  };

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'course_code', headerName: 'Course Code', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params: any) => (
        <Button
          startIcon={<Edit />}
          onClick={() => {
            setSelectedCourse(params.row);
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
        <Typography variant="h5">Courses</Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => {
            setSelectedCourse(undefined);
            setDialogOpen(true);
          }}
        >
          Add Course
        </Button>
      </Box>

      <Paper sx={{ height: 400, width: '100%' }}>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <DataGrid
            rows={courses || []}
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

      <CourseDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={selectedCourse ? handleUpdate : handleCreate}
        initialData={selectedCourse}
      />
    </Box>
  );
};

export default Courses; 