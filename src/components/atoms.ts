import { atom, selector } from "recoil";
import { v1 } from 'uuid';


export enum Categories {
    'TO-DO', 
    'DOING',
    'DONE',
}

export interface ICategories {
    category: Categories; 
}

export interface IToDos {
    text: string;           // todo, doing, done
    id: number | string;
    category: Categories;
}

export const categoryState = atom<Categories>({
    key : `category/${v1()}`,
    default : Categories["TO-DO"]
})

export const toDoState = atom<IToDos[]>({
    key : `toDo/${v1()}`,
    default : []
});

export const toDoSelector = selector ({
    key : 'toDoSelector',
    get : ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((todo) => todo.category == category);
    } 
})

