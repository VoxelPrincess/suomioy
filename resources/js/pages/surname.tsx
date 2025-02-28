import { FC } from 'react';

// TODO: We will have props soon.
type Props = {
    name: {
        name: string;
        amount: number;
    };
};

const Surname: FC<Props> = ({ name }) => {
    return (
        <div>
            <h1>
                {name.name} {name.amount} kpl
            </h1>
        </div>
    );
};

export default Surname;