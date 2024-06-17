import { useForm } from "react-hook-form";
import { v1 } from 'uuid';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "./atoms";

interface IForm {
    toDo: string
}

function CreateToDo() {

    const setTodos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const {register, handleSubmit, setValue} = useForm<IForm>();

    const handleValid = (data : IForm) => {
        setTodos((current) => [{text : data.toDo, id: v1(), category: category}, ...current]);
        setValue('toDo', '');
    };

    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input {...register('toDo', {
                    required : "Please Write a To Do",

                })} 
                type="text" placeholder="Write a To do"
            />
            <button>+ Add</button>
        </form>
    );
}

export default CreateToDo;