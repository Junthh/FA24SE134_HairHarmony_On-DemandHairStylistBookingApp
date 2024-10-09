import { ReactComponent as SortAscIcon } from 'assets/pics/icons/sort-asc.svg';
import styled from '@emotion/styled';

const SortWrapper = styled.span((props: any) => ({
  cursor: 'pointer',
  svg: {
    transform: `rotate(${props.desc ? '180deg' : '0deg'})`,
  },
}));

function SortIcon({ desc }: { desc: boolean }) {
  return (
    <SortWrapper desc={desc}>
      <SortAscIcon />
    </SortWrapper>
  );
}

export default SortIcon;
