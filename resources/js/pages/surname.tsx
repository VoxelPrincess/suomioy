import { FC } from 'react';
import BasicLayout from '@/layouts/basic-layout';

// TODO: We will have props soon.
type Props = {
    name: {
        name: string;
        amount: number;
    };
};

const Surname: FC<Props> = ({ name }) => {
    return (
        <BasicLayout>
            <div>
                <h1>
                    {name.name} {name.amount} kpl
                </h1>
            </div>
        </BasicLayout>
    );
};

export default Surname;