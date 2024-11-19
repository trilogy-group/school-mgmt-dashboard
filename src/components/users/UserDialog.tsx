import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { User } from '../../types/api';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: User) => void;
  initialData?: User;
}

export const UserDialog: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const { register, handleSubmit, reset } = useForm<User>({
    defaultValues: initialData,
  });

  React.useEffect(() => {
    if (open) {
      reset(initialData);
    }
  }, [open, initialData, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {initialData ? 'Edit User' : 'New User'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('given_name')}
                label="First Name"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('family_name')}
                label="Last Name"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('email')}
                label="Email"
                type="email"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('phone')}
                label="Phone"
                fullWidth
              />
            </Grid>
            {!initialData && (
              <Grid item xs={12}>
                <TextField
                  {...register('password')}
                  label="Password"
                  type="password"
                  fullWidth
                  required
                />
              </Grid>
            )}
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