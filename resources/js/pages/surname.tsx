import { FC } from 'react';
import BasicLayout from '@/layouts/basic-layout';
import clsx from 'clsx';

// Type definitions for component props
type Props = {
    oldestLiving: {
        id: number;
        first_name: string;
        last_name: string;
        birthday: string;
    }[];
    name: {
        name: string;
        amount: number;
    };
};

const Surname: FC<Props> = ({ name, oldestLiving }) => {
    return (
        <BasicLayout aside={<div>Mahtisivupalkki</div>}>
            <div>
                <h1 className="mb-4 text-3xl font-bold">
                    {name.name} {name.amount} kpl
                </h1>

                <ul className="my-4">
                    {oldestLiving.map((person, i) => {
                        // Conditional styling for zebra striping
                        const classes = clsx(
                            i % 2 === 0 && 'bg-gray-500',
                            i % 2 !== 0 && 'bg-gray-100',
                            'p-2'
                        );

                        console.log('FOO', i % 2 === 0 && 'bg-gray-500');

                        const classes2 = clsx(undefined, 'boo', 'foo', undefined, 'fuu');
                        console.log('CLASSES2', classes2);

                        return (
                            <li className={classes} key={person.id}>
                                {person.last_name}, {person.first_name} ({person.birthday}) [#{person.id}]
                            </li>
                        );
                    })}
                </ul>
            </div>
        </BasicLayout>
    );
};

export default Surname;