import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useTreeItem } from '@mui/lab';
import { Typography } from '@mui/material';
import clsx from 'clsx';
import * as React from 'react';

const TreeViewContent = React.forwardRef(function CustomContent(props: any, ref) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
    onClick,
    selectChildNode,
    nodes,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // check if parent then can not choose
    if (nodes?.isParent) {
      preventSelection(event);
      return;
    }
    handleSelection(event);

    onClick(nodeId);
  };

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
        {/* check if parent but not has child node still show icon arrow right */}
        {icon === undefined && nodes?.isParent ? <ArrowRightIcon /> : null}
      </div>
      {icon ? (
        <Typography
          onClick={selectChildNode ? handleExpansionClick : handleSelectionClick}
          component="div"
          className={classes.label}
        >
          {label}
        </Typography>
      ) : (
        <Typography onClick={handleSelectionClick} component="div" className={classes.label}>
          {label}
        </Typography>
      )}
    </div>
  );
});
export default TreeViewContent;
