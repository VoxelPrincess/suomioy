import { FC } from 'react';
import BasicLayout from '../layouts/basic-layout';
import { Link } from '@inertiajs/react';

type Props = {
    names: {
        id: number;
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
                        <th className="border border-gray-300 p-2">Surname</th>
                        <th className="border border-gray-300 p-2">Amount</th>
                        <th className="border border-gray-300 p-2">Sample ID</th> {/* Новый столбец с ID */}
                    </tr>
                </thead>
                <tbody>
                    {names.map((surname, i) => (
                        <tr key={surname.name} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{i + 1}</td>
                            <td className="border border-gray-300 p-2">
                                {/* Фамилия ведет на /surnames/{name} */}
                                <Link className="text-blue-700 underline" href={route('surname', { name: surname.name })}>
                                    {surname.name}
                                </Link>
                            </td>
                            <td className="border border-gray-300 p-2">{surname.amount}</td>
                            <td className="border border-gray-300 p-2">
                                {/* ID ведет на /person/{id} */}
                                <Link className="text-blue-700 underline" href={route('person', { id: surname.id })}>
                                    {surname.id}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </BasicLayout>
    );
};

export default Surnames;