import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { Categories, categoryState, toDoSelector } from "./atoms";
import ToDo from "./ToDo";

function TodoList() {

    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
      setCategory(event.currentTarget.value as any);
    };

    return (
        <div>
        <h1>NOMAD TO-DO LIST</h1>
        <hr />
        <select value={category} onInput={onInput}>
            <option value={Categories["TO-DO"]}>To-Do</option>
            <option value={Categories["DOING"]}>Doing</option>
            <option value={Categories["DONE"]}>Done</option>
        </select>
        <CreateToDo />
        {toDos?.map(todo => <ToDo key={todo.id} {...todo} />)}
        </div>
    );
}

export default TodoList;