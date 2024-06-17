import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDos, toDoState } from "./atoms";
import styled from "styled-components";

const ToDoItem = styled.li`
    list-style: none;
    height: 40px;
    display: flex;
    align-items: center;
`;
const Label = styled.span`
    margin : 5px;
    width: 100%;
`;
const ActionButton = styled.button`
    background-color : ${props => props.theme.bgColor};
    color : ${props => props.theme.textColor};
    border: 1px solid ${props => props.theme.textColor};
    min-width: 85px;
    height: 35px;
    border-radius: 7px;
    margin: 0px 5px;

    &:hover{
        color: ${props => props.theme.accentColor};
        border: 1px solid ${props => props.theme.accentColor};
        cursor: pointer;
    }
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
    const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {

    }

    return (
        <ToDoItem key={id}>
            <Label>{text}</Label>
            {category != Categories["TO-DO"] && (
                <ActionButton name={Categories["TO-DO"]+""}  onClick={onClick}>📌 To-Do</ActionButton>
            )}
            {category != Categories["DOING"] && (
                <ActionButton name={Categories["DOING"]+""}  onClick={onClick}>🔥 Doing</ActionButton>
            )}
            {category != Categories["DONE"] && (
                <ActionButton name={Categories["DONE"]+""} onClick={onClick}>✅ Done!</ActionButton>
            )}
            <ActionButton onClick={onDelete}>🗑️ Remove</ActionButton>
        </ToDoItem>
    );
}

export default ToDo;