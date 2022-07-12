import { Box, Typography, Skeleton } from '@mui/material';
import { BoxStyled } from 'Components/Common/BoxStyled';
import { CustomPaper } from 'Components/Common/CustomPaper';
import { StyledButtonGroup } from 'Components/Common/CustomButtonGroup';

export const BookmarkDetailsSkeleton = () => {
  return (
    <CustomPaper>
      <BoxStyled>
        <Typography variant="body1" component="p">
          <Skeleton width={150} />
        </Typography>
      </BoxStyled>
      <BoxStyled>
        <Typography variant="body1" component="p">
          <Skeleton width={300} />
        </Typography>
      </BoxStyled>
      <BoxStyled>
        <Typography variant="body1">
          <Skeleton width={120} />
        </Typography>
      </BoxStyled>
      <StyledButtonGroup>
        <Box>
          <Skeleton width={48} height={30.75} sx={{ marginRight: 0.25 }} />
        </Box>
        <Box>
          <Skeleton width={67} height={30.75} sx={{ marginRight: 0.25 }} />
        </Box>
      </StyledButtonGroup>
    </CustomPaper>
  );
};
