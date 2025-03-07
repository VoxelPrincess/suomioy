import { FC } from 'react';
import BasicLayout from '@/layouts/basic-layout';
import Link from '@/components/Link';
import { route } from 'ziggy-js';
import clsx from 'clsx';

type Props = {
    name: {
        name: string;
        amount: number;
    };
    people: {
        id: number;
        first_name: string;
        last_name: string;
        birthday: string;
    }[];
};

const Surname: FC<Props> = ({ name, people }) => {
    return (
        <BasicLayout>
            <div>
                <h1 className="mb-4 text-3xl font-bold">
                    {name.name} ({name.amount} henkilöä)
                </h1>

                <ul className="my-4">
                    {people.map((person) => (
                        <li key={person.id} className="p-2 border-b">
                            {person.last_name}, {person.first_name} ({person.birthday}){' '}
                            <Link className="text-blue-700 underline" href={route('person', { id: person.id })}>
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