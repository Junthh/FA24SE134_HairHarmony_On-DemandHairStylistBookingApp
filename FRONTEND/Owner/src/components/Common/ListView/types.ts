export type ListViewItem = { value: string; text: string; isDisable?: boolean };

export interface ListViewProps {
  items: ListViewItem[];
  selectedItem: string;
  onChange?: (item: ListViewItem) => void;
}
