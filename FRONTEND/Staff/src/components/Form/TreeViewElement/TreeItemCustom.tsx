import { TreeItem } from '@mui/lab';
import TreeViewContent from './ContentItem';

const CustomTreeItem = ({ name, onSelected, selectChildNode, ...props }: any) => (
  <TreeItem
    ContentComponent={TreeViewContent}
    ContentProps={{
      onClick: (nodeId: any) => {
        onSelected();
      },
      selectChildNode,
    }}
    {...props}
  />
);
export default CustomTreeItem;
