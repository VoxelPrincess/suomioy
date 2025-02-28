import { FC } from 'react';

type Props = {
    names: {
        name: string;
        amount: number;
    }[];
};

const Surnames: FC<Props> = ({ names }) => {
    return (
        <div>
            <h1>Suosituimmat sukunimet!</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {names.map((name, i) => (
                        <tr key={name.name}>
                            <td>{i + 1}</td>
                            <td>{name.name}</td>
                            <td>{name.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Surnames;