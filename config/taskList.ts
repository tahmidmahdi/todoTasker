import Colors from '../constants/Colors';

interface taskListType {
  id: number;
  name: string;
  backgroundColor: string;
  color: string;
}

const taskList: Array<taskListType> = [
  {
    id: 1,
    name: 'Inbox',
    backgroundColor: Colors.light.disabled,
    color: Colors.light.black,
  },
  {
    id: 2,
    name: 'Work',
    backgroundColor: Colors.light.green,
    color: Colors.light.background,
  },
  {
    id: 3,
    name: 'Shopping',
    backgroundColor: Colors.light.red,
    color: Colors.light.background,
  },
  {
    id: 4,
    name: 'Family',
    backgroundColor: Colors.light.yellow,
    color: Colors.light.black,
  },
  {
    id: 5,
    name: 'Personal',
    backgroundColor: Colors.light.purple,
    color: Colors.light.background,
  },
];

export default taskList;
