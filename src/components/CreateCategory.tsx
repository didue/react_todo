import { useRecoilState } from "recoil";
import { Form, Input, AddButton } from "./CreateToDo";
import { Categories, categoryState, toDoSelector } from "./atoms";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const CategoryWrapper = styled.div`
    width: 100%;
    margin: 15px 0px;
`;
const SelectGroup = styled.select`
    min-width : 124px;
    height: 100%;
    border-radius : 7px;
    margin-right: 10px;
    padding : 5px;
`;

interface ICategoryForm {
  category: string;
};

export default function CreateCategory() {

  const [category, setCategory] = useRecoilState(categoryState);
  const {register, handleSubmit} = useForm<ICategoryForm>();

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const addCategory = (data: ICategoryForm) => {
    setCategory((current) => {console.log(current); return current;});
    // console.log(['category' : data.category, ...category]);
    // setCategory((current) => [{category: data.category, id: v1()} , ...current]);
  }

  return (
    <CategoryWrapper>
      <Form onSubmit={handleSubmit(addCategory)}>
          <SelectGroup value={category} onInput={onInput}>
              <option value={Categories["TO-DO"]}>📌 To-Do</option>
              <option value={Categories["DOING"]}>🔥 Doing</option>
              <option value={Categories["DONE"]}>✅ Done</option>
          </SelectGroup>
          <Input placeholder="Add Extra Category" {...register('category', {required: true})}></Input>
          <AddButton>➕ Add</AddButton>
      </Form>
    </CategoryWrapper>
  )
}