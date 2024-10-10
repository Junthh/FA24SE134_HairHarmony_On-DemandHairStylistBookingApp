import DialogExample from './showcase/DialogExample';
import FormExample from './showcase/FormExample';
import TableExample from './showcase/TableExample';

const showcaseList = [
  {
    title: 'Form',
    component: <FormExample />,
    code: FormExample.code,
    note: 'Form validate với react-hook-form và Yup',
  },
  {
    title: 'Dialog',
    component: <DialogExample />,
    code: DialogExample.code,
    note: 'Dialog Example & Breadcrumb example',
  },
  {
    title: 'Tanstack React Table Example',
    component: <TableExample />,
    code: TableExample.code,
    note: 'Tanstack React Table Example',
  },
];
export default showcaseList;
