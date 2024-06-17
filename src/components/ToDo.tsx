import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDos, toDoState } from "./atoms";
import styled from "styled-components";

const Label = styled.span`
    margin : 5px 15px;
`;

function ToDo({id, text, category}: IToDos) {

    const setTodos = useSetRecoilState(toDoState);
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget : {name}} = e;
        
        setTodos(oldToDos => {
            const idx = oldToDos.findIndex(todo => todo.id === id);
            const newToDo = { text, id, category: name as any };
            return [
                ...oldToDos.slice(0, idx),
                newToDo,
                ...oldToDos.slice(idx + 1),
            ];
        })
    }

    return (
        <li key={id}>
            <Label>{text}</Label>
            {category !== Categories["TO-DO"] && (
                <button name={Categories["TO-DO"] + ""}  onClick={onClick}>📌To-Do</button>
            )}
            {category !== Categories["DOING"] && (
                <button name={Categories["DOING"] + ""}  onClick={onClick}>🔥Doing</button>
            )}
            {category !== Categories["DONE"] && (
                <button name={Categories["DONE"] + ""} onClick={onClick}>✅Done!</button>
            )}
        </li>
    );
}

export default ToDo;