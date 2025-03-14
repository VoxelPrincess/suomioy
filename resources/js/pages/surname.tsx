import { FC } from 'react';
import BasicLayout from '@/layouts/basic-layout';
import { Link } from '@inertiajs/react'; // Используем стандартный Link из Inertia
import clsx from 'clsx';

type Props = {
  name: {
    name: string;
    amount: number;
  };
  people?: {
    id: number;
    first_name: string;
    last_name: string;
    birthday: string;
  }[];
};

const Surname: FC<Props> = ({ name, people = [] }) => {
  return (
    <BasicLayout>
      <div>
        <h1 className="mb-4 text-3xl font-bold">
          {name.name} ({name.amount} henkilöä)
        </h1>

        <ul className="my-4 border border-gray-300 rounded">
          {/* If no people, show message */}
          {people.length === 0 && (
            <li className="p-2 text-gray-500">
              Ei henkilöitä listattavaksi.
            </li>
          )}

          {/* Loop through people array */}
          {people.map((person) => (
            <li
              key={person.id}
              className={clsx('p-2', 'border-b', 'last:border-none')}
            >
              {person.last_name}, {person.first_name} ({person.birthday}){' '}
              <Link
                className="text-blue-700 underline"
                href={route('person', { id: person.id })}
              >
                [#{person.id}]
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </BasicLayout>
  );
};

export default Surname;