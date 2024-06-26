import { useForm } from "react-hook-form";
import { v1 } from 'uuid';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "./atoms";
import styled from "styled-components";

const FormWrapper = styled.div`
    width : 100%;
    margin: 10px 0px;
`;

export const Form = styled.form`
    height: 35px;
    display: flex;
    juistify-content : center;
`;

export const Input = styled.input`
    width : 100%;
    height: 100%;
    border: 1px solid #888;
    border-radius: 7px;
    padding: 10px;
`;

export const AddButton = styled.button`
    min-width: 80px;
    height: 100%;
    min-height: 35px;
    margin-left: 10px;
    border: none;
    border-radius : 7px;
    background-color : ${props => props.theme.accentColor};
    color : ${props => props.theme.textColor};
`;


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
        <FormWrapper>
            <Form onSubmit={handleSubmit(handleValid)}>
                <Input {...register('toDo', {
                        required : "Please Write a To Do",
                    })} 
                    type="text" placeholder="Write a To do"
                />
                <AddButton>✔️ Save</AddButton>
            </Form>
        </FormWrapper>
    );
}

export default CreateToDo;