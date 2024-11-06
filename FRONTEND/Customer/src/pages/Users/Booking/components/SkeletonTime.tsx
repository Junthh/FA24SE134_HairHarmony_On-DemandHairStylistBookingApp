import { Grid, Skeleton } from '@mui/material';

export default function SkeletonTime() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={150} height={50} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={150} height={50} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={150} height={50} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={150} height={50} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={150} height={50} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={150} height={50} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={150} height={50} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={150} height={50} />
      </Grid>
    </Grid>
  );
}
