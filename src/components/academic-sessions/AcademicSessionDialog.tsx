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
import { AcademicSession, Organization } from '../../types/api';
import { useOrganizations } from '../../hooks/useOrganizations';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AcademicSession) => void;
  initialData?: AcademicSession;
}

const sessionTypes = ['GRADING_PERIOD', 'SCHOOL_YEAR', 'SEMESTER', 'TERM'] as const;

export const AcademicSessionDialog: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AcademicSession>({
    defaultValues: initialData || {
      type: undefined,
      status: 'ACTIVE'
    }
  });
  const { organizations } = useOrganizations();

  React.useEffect(() => {
    if (open) {
      reset(initialData || {
        type: undefined,
        status: 'ACTIVE'
      });
    }
  }, [open, initialData, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {initialData ? 'Edit Academic Session' : 'New Academic Session'}
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
                {...register('type', { required: 'Type is required' })}
                select
                label="Session Type"
                fullWidth
                required
                error={!!errors.type}
                helperText={errors.type?.message}
              >
                <MenuItem value="" disabled>Select Type</MenuItem>
                {sessionTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.replace(/_/g, ' ')}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('org_id')}
                select
                label="Organization"
                fullWidth
                required
                defaultValue=""
              >
                <MenuItem value="">Select Organization</MenuItem>
                {organizations?.map((org: Organization) => (
                  <MenuItem key={org.id} value={org.id}>
                    {org.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('start_date')}
                label="Start Date"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('end_date')}
                label="End Date"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
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