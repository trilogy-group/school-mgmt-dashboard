import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Class, Course } from '../../types/api';
import { useCourses } from '../../hooks/useCourses';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Class) => void;
  initialData?: Class;
}

const classTypes = ['HOMEROOM', 'SCHEDULED', 'PATTERN'] as const;

export const ClassDialog: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Class>({
    defaultValues: initialData || {
      status: 'ACTIVE'
    }
  });
  const { courses } = useCourses();

  React.useEffect(() => {
    if (open) {
      reset(initialData || {
        status: 'ACTIVE'
      });
    }
  }, [open, initialData, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {initialData ? 'Edit Class' : 'New Class'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                {...register('title', { required: 'Title is required' })}
                label="Title"
                fullWidth
                required
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('class_code')}
                label="Class Code"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('class_type')}
                select
                label="Class Type"
                fullWidth
                defaultValue=""
              >
                <MenuItem value="">Select Type</MenuItem>
                {classTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('course_id', { required: 'Course is required' })}
                select
                label="Course"
                fullWidth
                required
                error={!!errors.course_id}
                helperText={errors.course_id?.message}
              >
                <MenuItem value="">Select Course</MenuItem>
                {courses?.map((course: Course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.title}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('location')}
                label="Location"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {initialData ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}; 