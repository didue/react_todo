import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { categoryState, toDoSelector } from "./atoms";
import ToDo from "./ToDo";
import styled from "styled-components";
import CreateCategory from "./CreateCategory";

const Container = styled.div`
    width : 400px;
    height : 100%;
    margin : 0 auto;
`;
function TodoList() {

    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);


    return (
        <Container>
            <h1>NOMAD TO-DO LIST</h1>
            <h2>Category</h2>
            <CreateCategory />
            <hr />
            <h2>To-Do List</h2>
            <CreateToDo />
            {toDos?.map(todo => <ToDo key={todo.id} {...todo} />)}
        </Container>
    );
}

export default TodoList;