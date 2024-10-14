import { Stack, Typography } from '@mui/material';
import { ListViewItem, ListViewProps } from './types';
import * as colors from 'constants/colors';
function ListView({ items, selectedItem, onChange }: ListViewProps) {
  const handleChangeView = (item: ListViewItem) => {
    if (item.isDisable) return () => {};

    return onChange?.(item);
  };
  return (
    <Stack alignItems="center" gap={2} direction="row" overflow={'auto'}>
      {items.map((item) => {
        const isSelected = item.value === selectedItem;
        let color = isSelected ? colors.primary : colors.b9;
        if (item.isDisable) {
          color = colors.placeholder;
        }
        return (
          <div
            key={item.value}
            onClick={() => handleChangeView(item)}
            style={{
              borderBottom: isSelected ? `3px solid ${colors.primary}` : 'none',
              cursor: 'pointer',
            }}
          >
            <Typography color={color} sx={{ padding: '12px 24px', minWidth: 'max-content' }}>
              {item.text}
            </Typography>
          </div>
        );
      })}
    </Stack>
  );
}

export default ListView;
