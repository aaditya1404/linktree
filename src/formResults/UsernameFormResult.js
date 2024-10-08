import grabUsername from '@/actions/grabUsername';
import { useFormState } from 'react-dom';

export default function UsernameFormResult(){
    const [state] = useFormState(grabUsername);
    console.log(state);
    return (
        <div className='bg-red-200 border border-red-500 p-2 mb-2'>
            Taken Username
        </div>
    )
}
