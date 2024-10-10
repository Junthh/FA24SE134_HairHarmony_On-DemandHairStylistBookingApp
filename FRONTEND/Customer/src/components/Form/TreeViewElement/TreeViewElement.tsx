import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import TreeView from '@mui/lab/TreeView';
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
} from '@mui/material';
import clsx from 'clsx';
import _ from 'lodash';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { useOnClickOutside } from '../../../hooks/useClickOutSide';
import TreeItemCustom from './TreeItemCustom';
import { BoxMenuParent, ListMenuItemIcon, WrapperMenuParent } from './TreeViewStyle';
import { useTranslation } from 'react-i18next';
import TextFieldElement from '../TextFieldElement/TextFieldElement';

export default function TreeViewElement({
  defaultValue,
  defaultSelected,
  dataTreeView,

  disabled,
  isWarningConfirm = false,
  selectChildNode = false,
  showCodeValue = false,
  multiselect = false,
  showAutocomplete = false,
  setPopupConfirm,
  hanldeChange,
  ...props
}: any) {
  const boxTreeView = React.useRef<HTMLDivElement | undefined>();
  const [showTreeView, setShowTreeView] = React.useState(false);
  const [defaultVal, setDefaultVal] = React.useState(defaultValue);
  const { setValue, clearErrors } = useFormContext();
  const [currVal, setCurrVal] = React.useState('');
  const [valueText, setValueText] = React.useState<any>({
    name: '',
    parentId: 0,
    id: 0,
  });

  const [valueSelected, setValueSelected] = React.useState<any>({
    parentId: 0,
    id: 0,
  });
  const [selecteds, setSelected] = React.useState<string[]>([]);
  React.useEffect(() => {
    if (defaultValue) {
      setDefaultVal(defaultValue);
    }
  }, [defaultValue]);
  React.useEffect(() => {
    if (valueSelected) {
      expandMenuRef.current = [];
      handleExpandMenu(valueSelected.parentId);
      hanldeChange && hanldeChange(valueSelected);
    }
  }, [valueSelected]);

  const findid = (parentId: number) => {
    return dataTreeView?.findIndex((item: any) => parentId === item.id);
  };

  const expandMenuRef: any = React.useRef([]);
  const handleExpandMenu = (parentId: number) => {
    let index = -1;
    index = findid(parentId);
    if (index !== -1) {
      handleExpandMenu(dataTreeView[index]?.parentId);
      expandMenuRef.current.push(`${dataTreeView[index]?.id}`);
    }
  };

  const listToTree = (dataProvider: any[]) => {
    const map: Map<number, any> = new Map(
      dataProvider?.map((item: any) => [
        item.id,
        {
          ...item,
          children: [],
        },
      ]),
    );

    const output = [];

    if (dataProvider.length) {
      for (const item of dataProvider) {
        if (item.parentId !== item.id && map?.has(item.parentId)) {
          var _item = map.get(item.id) || item;
          map.get(item.parentId)?.children.push(_item);
        } else {
          output.push(map.get(item.id));
        }
      }
    }
    output.sort((a: any, b: any) => (a.displayOrder > b.displayOrder ? 1 : -1));
    const sort = (item: any) => {
      item.sort((a: any, b: any) => (a.displayOrder > b.displayOrder ? 1 : -1));
      item.forEach((item: any) => {
        Array.isArray(item.children) && sort(item.children);
      });
    };
    output.forEach((item: any) => {
      Array.isArray(item.children) && sort(item.children);
    });
    return output;
  };
  const [data, setData] = React.useState<any>([]);
  const { t } = useTranslation();
  const handleClick = () => {
    if (!disabled) {
      if (valueText && isWarningConfirm) {
        setPopupConfirm(true);
        setShowTreeView(true);
      } else {
        setShowTreeView(true);
      }
    }
  };
  useOnClickOutside(boxTreeView, () => {
    if (isWarningConfirm) {
      setShowTreeView(true);
    } else {
      setShowTreeView(false);
    }
  });
  const onSelected = (treeItem: any) => {
    const parseId = `${treeItem.id}`;

    setValue(props.name, parseId);
    setValueText(treeItem);
    setValueSelected(treeItem);
    setDefaultVal(parseId);
    clearErrors();
    setShowTreeView(false);
    if (!multiselect) {
      setCurrVal(treeItem.name);
    }
  };

  const getListOfIdsByParentId = (data: any, parentId: any) => {
    const result = [];
    if (data.parentId === parentId) {
      result.push(data.id);
    }
    if (data.children) {
      data.children.forEach((child: any) => {
        result.push(...getListOfIdsByParentId(child, child.parentId));
      });
    }
    return result;
  };

  const hanleCheck = (checked: boolean, nodes: any) => {
    const childIDs = getListOfIdsByParentId(nodes, nodes?.id);
    const allNode: string[] = [nodes?.id, ...childIDs];

    let array = checked
      ? [...selecteds, ...allNode]
      : selecteds.filter((value) => !allNode.includes(value));

    setSelected(array);
  };

  const renderTreeView = (treeItem: any) => {
    return (
      <TreeItemCustom
        nodeId={`${treeItem.id}`}
        onSelected={() => onSelected(treeItem)}
        selectChildNode={selectChildNode}
        label={
          multiselect ? (
            <FormControlLabel
              control={
                <Box>
                  <ListMenuItemIcon>
                    <span />
                  </ListMenuItemIcon>
                  <Checkbox
                    checked={selecteds.some((item) => item === treeItem.id)}
                    onChange={(event) => hanleCheck(event.currentTarget.checked, treeItem)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </Box>
              }
              label={<>{treeItem.name}</>}
              key={treeItem.id}
            />
          ) : (
            <Stack direction="row" justifyContent="center" alignItems="center">
              <ListMenuItemIcon>
                <span />
              </ListMenuItemIcon>
              <ListItemText primary={treeItem.name} sx={{ margin: 0 }} />
            </Stack>
          )
        }
        name={props.name}
        treeItem={treeItem}
        key={treeItem.id}
      >
        {Array.isArray(treeItem.children)
          ? treeItem.children.map((node: any) => renderTreeView(node))
          : null}
      </TreeItemCustom>
    );
  };
  const searchTree = React.useCallback((element: any, id: any): any => {
    if (element?.id === id) {
      return element;
    } else if (element?.children != null) {
      var i;
      var result = null;
      for (i = 0; result == null && i < element?.children.length; i++) {
        result = searchTree(element?.children[i], id);
      }
      return result;
    }
    return null;
  }, []);

  React.useEffect(() => {
    if (data.length > 0) {
      let result: any = null;
      if (multiselect) {
        let selectArray: any = [];
        selecteds.forEach((value, index) => {
          for (var i = 0; result === null && i < data.length; i++) {
            if (searchTree(data[i], value)) {
              selectArray = [...selectArray, searchTree(data[i], value)];
            }
          }
        });
        const resultValueSelected = selectArray.filter((value: any) => value !== null);
        setValueText(resultValueSelected);
        setValue(props.name, selecteds);
      } else {
        for (var i = 0; result === null && i < data.length; i++) {
          result = searchTree(data[i], Number(defaultVal));
        }
        setValueText(result);
        setValueSelected(result);
      }
    }
  }, [data, searchTree, defaultVal, selecteds]);

  React.useEffect(() => {
    if (multiselect) {
      setCurrVal(valueText?.name);
    }
  }, [selecteds]);

  React.useEffect(() => {
    if (Array.isArray(dataTreeView)) {
      setData(listToTree(dataTreeView));
    }
  }, [dataTreeView]);

  React.useEffect(() => {
    if (showTreeView) {
      const wrapper = boxTreeView.current;
      const ul = wrapper?.querySelector('ul');
      if (ul) {
        const selecteds: Element | null | undefined =
          wrapper?.querySelector('[aria-selecteds=true]');

        if (selecteds) {
          ul.scrollTop = (selecteds as any).offsetTop - 30;
        }
      }
    }
  }, [showTreeView]);
  // Just only use with autocomplete and mutiselected
  const searching = _.debounce((dataChange: string) => {
    const dataFilter = dataTreeView.filter((item: any) =>
      item.name.includes(dataChange?.toLocaleLowerCase().trim()),
    );
    setData(listToTree(dataFilter));
  }, 500);

  const inputChangeHanler = (dataChange: string) => {
    setCurrVal(dataChange);
    searching(dataChange);
  };
  const resetValue = () => {
    // reset for mutiseleted
    if (multiselect) {
      setSelected([]);
    }
    //reset for only selected
    setValueText({
      name: '',
      parentId: 0,
      id: 0,
    });
    setValueSelected({
      parentId: 0,
      id: 0,
    });
    setValue(props.name, '');
    // reset input form autocomplete
    if (showAutocomplete) {
      setCurrVal('');
    }
  };

  return (
    <WrapperMenuParent disabled={disabled}>
      {multiselect ? (
        <TextFieldElement
          value={!showTreeView ? `${t(`hr.selected`)}: ${selecteds?.length}` : currVal || ' '}
          onChange={(e: any) => inputChangeHanler(e?.target?.value)}
          onClick={handleClick}
          {...props}
          InputProps={{
            endAdornment: (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {valueText && !disabled ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => {
                        resetValue();
                      }}
                    >
                      <CloseIcon sx={{ fontSize: '15px' }} />
                    </IconButton>
                  </InputAdornment>
                ) : null}
                {showTreeView ? (
                  <ArrowDropUp sx={{ color: !disabled ? '#757575' : '#b7b7b7' }} />
                ) : (
                  <ArrowDropDown sx={{ color: !disabled ? '#757575' : '#b7b7b7' }} />
                )}
              </Box>
            ),
          }}
        />
      ) : showAutocomplete ? (
        <TextFieldElement
          onClick={handleClick}
          onChange={(e: any) => inputChangeHanler(e?.target?.value)}
          value={showCodeValue ? valueText?.name?.split('-')[0] : valueText?.name}
          {...props}
          InputProps={{
            endAdornment: (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {valueText && !disabled ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => {
                        resetValue();
                      }}
                    >
                      <CloseIcon sx={{ fontSize: '15px' }} />
                    </IconButton>
                  </InputAdornment>
                ) : null}
                {showTreeView ? (
                  <ArrowDropUp sx={{ color: !disabled ? '#757575' : '#b7b7b7' }} />
                ) : (
                  <ArrowDropDown sx={{ color: !disabled ? '#757575' : '#b7b7b7' }} />
                )}
              </Box>
            ),
          }}
        />
      ) : (
        <TextFieldElement
          value={showCodeValue ? valueText?.name?.split('-')[0] : valueText?.name}
          onClick={handleClick}
          {...props}
          InputProps={{
            endAdornment: (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {valueText && !disabled ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => {
                        resetValue();
                      }}
                    >
                      <CloseIcon sx={{ fontSize: '15px' }} />
                    </IconButton>
                  </InputAdornment>
                ) : null}
                {showTreeView ? (
                  <ArrowDropUp sx={{ color: !disabled ? '#757575' : '#b7b7b7' }} />
                ) : (
                  <ArrowDropDown sx={{ color: !disabled ? '#757575' : '#b7b7b7' }} />
                )}
              </Box>
            ),
            readOnly: true,
          }}
        />
      )}

      {showTreeView && !disabled && (
        <Paper>
          <BoxMenuParent ref={boxTreeView}>
            <TreeView
              aria-label="icon expansion"
              defaultCollapseIcon={<ArrowDropDownIcon />}
              defaultExpandIcon={<ArrowRightIcon />}
              defaultExpanded={expandMenuRef.current}
              defaultSelected={[`${valueSelected?.id}`]}
              sx={{
                height: 'auto',
                maxHeight: 350,
                flexGrow: 1,
                overflowY: 'auto',
              }}
            >
              {data?.map((item: any) => renderTreeView(item))}
            </TreeView>
          </BoxMenuParent>
        </Paper>
      )}
    </WrapperMenuParent>
  );
}
