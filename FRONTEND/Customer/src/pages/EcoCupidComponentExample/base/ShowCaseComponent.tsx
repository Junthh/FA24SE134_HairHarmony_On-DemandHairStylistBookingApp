import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-textmate';

import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import AceEditor from 'react-ace';

interface IShowCaseComponent {
  feature: any;
  order: number;
}

const ShowCaseComponent = (props: IShowCaseComponent) => {
  const { feature, order } = props;
  return (
    <Grid container spacing={10} mt={1}>
      <Divider />
      {feature.component ? (
        <>
          <Grid item xs={6}>
            {feature.title && <ShowCaseComponent.Head data={`${order}. ${feature.title}`} />}
            {feature.note && <ShowCaseComponent.Content data={feature.note} />}
            <Box height={20}></Box>
            {feature.component && feature.component}
          </Grid>
          <Grid item xs={6}>
            {feature.code && <ShowCaseComponent.Editor data={feature.code} />}
          </Grid>
        </>
      ) : (
        <Grid item xs={6}>
          {feature.title && <ShowCaseComponent.Head data={`${order}. ${feature.title}`} />}
          {feature.code && <ShowCaseComponent.Editor data={feature.code} />}
        </Grid>
      )}
    </Grid>
  );
};

export default ShowCaseComponent;

ShowCaseComponent.Head = ({ data }: any) => (
  <Typography typography="h2" fontSize={16}>
    {data}
  </Typography>
);
ShowCaseComponent.Content = ({ data }: any) => (
  <>
    <Typography typography="h6" fontSize={14}>
      {data}
    </Typography>
    <Typography typography="h6" fontSize={14}>
      {'Example:'}
    </Typography>
  </>
);

ShowCaseComponent.Editor = ({ data }: any) => (
  <AceEditor
    mode="javascript"
    theme="textmate"
    name="UNIQUE_ID_OF_DIV"
    value={data}
    style={{ border: '1px solid #D7D7D7', borderBottom: '4px solid #0287FF', borderRadius: 4 }}
    width={'100%'}
    maxLines={60}
    minLines={3}
    readOnly
    setOptions={{ useWorker: false }}
  />
);
