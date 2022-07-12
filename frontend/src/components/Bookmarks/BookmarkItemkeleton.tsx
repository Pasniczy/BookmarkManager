import { Box, Paper, Skeleton, Typography } from '@mui/material';
import { StyledButtonGroup } from 'Components/Common/CustomButtonGroup';

export const BookmarkItemSkeleton = () => {
  return (
    <Paper style={{ padding: 20 }} elevation={6}>
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6" component="h4" width={200} sx={{ marginBottom: 1 }}>
            <Skeleton />
          </Typography>
        </Box>
      </Box>
      <StyledButtonGroup>
        <Box>
          <Skeleton width={98} height={30.75} sx={{ marginRight: 0.25 }} />
        </Box>
        <Box>
          <Skeleton width={48} height={30.75} sx={{ marginRight: 0.25 }} />
        </Box>
        <Box>
          <Skeleton width={67} height={30.75} sx={{ marginRight: 0.25 }} />
        </Box>
      </StyledButtonGroup>
    </Paper>
  );
};
