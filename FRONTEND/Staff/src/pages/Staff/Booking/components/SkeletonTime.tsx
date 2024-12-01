import { Grid, Skeleton } from '@mui/material';

export default function SkeletonTime() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}></Grid>
      <Grid container spacing={2} item xs={8}>
        <Grid item xs={4}>
          <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={'100%'} height={50} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={'100%'} height={50} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={'100%'} height={50} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={'100%'} height={50} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={'100%'} height={50} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={'100%'} height={50} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={'100%'} height={50} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={'100%'} height={50} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={'100%'} height={50} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={'100%'} height={50} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={'100%'} height={50} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width={'100%'} height={50} />
        </Grid>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}
