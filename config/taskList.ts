import Colors from '../constants/Colors';

export interface taskListType {
  id: number;
  name: string;
  backgroundColor: string;
  color: string;
}

const taskList: Array<taskListType> = [
  {
    id: 1,
    name: 'General',
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
  {
    id: 6,
    name: 'Prayer',
    backgroundColor: Colors.light.lightPink,
    color: Colors.light.black,
  },
];

export default taskList;
