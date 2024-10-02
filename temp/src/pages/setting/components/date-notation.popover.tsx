import { List, ListItem, Popover } from 'konsta/react';
import { useStore } from '../../../store';

const DateNotationPopover = () => {
  const { dateNotationPopover, setDateNotationPopover, setDateNotation } = useStore();

  return (
    <Popover opened={dateNotationPopover} target={'.date-notation'} onBackdropClick={() => setDateNotationPopover(false)}>
      <List nested>
        {[
          'empty',
          'Jan 1, 2001',
          '2001/01/01 01:01:01',
          '2001-01-01 01:01:01',
          '2001年01月01日 01時01分',
          '2001년 01월 01일 01시 01분',
          '2001/01/01',
          '2001-01-01',
          '2001年01月01日',
          '2001년 01월 01일',
        ].map((ratio) => (
          <ListItem
            key={ratio}
            title={ratio}
            link
            chevronIos={false}
            onClick={() => {
              setDateNotation(ratio as never);
              setDateNotationPopover(false);
            }}
          />
        ))}
      </List>
    </Popover>
  );
};

export default DateNotationPopover;
