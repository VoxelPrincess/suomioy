import { FC } from 'react';
import BasicLayout from '../layouts/basic-layout';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

type Props = {
    names: {
        name: string;
        amount: number;
    }[];
};

const Surnames: FC<Props> = ({ names }) => {
    return (
        <BasicLayout>
            <h1 className="text-xl font-bold mb-4">Suosituimmat sukunimet!</h1>
            <table className="border-collapse border border-gray-300 w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">#</th>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {names.map((name, i) => (
                        <tr key={name.name} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{i + 1}</td>
                            <td className="border border-gray-300 p-2">
                                <Link className="text-blue-700 underline" href={route('surname', { name: name.name })}>
                                    {name.name} 
                                </Link>
                            </td>
                            <td className="border border-gray-300 p-2">{name.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </BasicLayout>
    );
};

export default Surnames;