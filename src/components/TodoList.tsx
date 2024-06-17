import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { Categories, categoryState, toDoSelector } from "./atoms";
import ToDo from "./ToDo";
import styled from "styled-components";

const Container = styled.div`
    width : 400px;
    height : 100%;
    margin : 0 auto;
`;

function TodoList() {

    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
      setCategory(event.currentTarget.value as any);
    };

    return (
        <Container>
            <h1>NOMAD TO-DO LIST</h1>
            <hr />
            <select value={category} onInput={onInput}>
                <option value={Categories["TO-DO"]}>📌 To-Do</option>
                <option value={Categories["DOING"]}>🔥 Doing</option>
                <option value={Categories["DONE"]}>✅ Done</option>
            </select>
            <CreateToDo />
            {toDos?.map(todo => <ToDo key={todo.id} {...todo} />)}
        </Container>
    );
}

export default TodoList;