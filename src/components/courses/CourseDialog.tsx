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
import { Course, Organization } from '../../types/api';
import { useOrganizations } from '../../hooks/useOrganizations';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Course) => void;
  initialData?: Course;
}

export const CourseDialog: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const { register, handleSubmit, reset } = useForm<Course>({
    defaultValues: initialData,
  });
  const { organizations } = useOrganizations();

  React.useEffect(() => {
    if (open) {
      reset(initialData);
    }
  }, [open, initialData, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {initialData ? 'Edit Course' : 'New Course'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                {...register('title')}
                label="Title"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('course_code')}
                label="Course Code"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('org_id')}
                select
                label="Organization"
                fullWidth
                required
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select Organization</option>
                {organizations?.map((org: Organization) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </TextField>
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