import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Organization } from '../../types/api';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Organization) => void;
  initialData?: Organization;
}

const organizationTypes = [
  'DEPARTMENT',
  'DISTRICT',
  'LOCAL',
  'NATIONAL',
  'SCHOOL',
  'STATE',
];

export const OrganizationDialog: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const { register, handleSubmit, reset } = useForm<Organization>({
    defaultValues: initialData
  });

  const handleFormSubmit = (data: Organization) => {
    const transformedData = {
      ...data,
      parent_id: data.parent_id === '' ? undefined : data.parent_id
    };
    onSubmit(transformedData);
  };

  React.useEffect(() => {
    if (open) {
      reset(initialData);
    }
  }, [open, initialData, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogTitle>
          {initialData ? 'Edit Organization' : 'New Organization'}
        </DialogTitle>
        <DialogContent>
          <TextField
            {...register('name')}
            label="Name"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            {...register('type')}
            select
            label="Type"
            fullWidth
            margin="normal"
            required
          >
            {organizationTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            {...register('parent_id')}
            label="Parent Organization ID"
            fullWidth
            margin="normal"
          />
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