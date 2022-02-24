import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#FDA7DF"
      : props.isDraggingFromThis
      ? "#bdc3c7"
      : "#c8d6e5"};
  transition: background-color 0.2s ease-in-out;
  border-radius: 5px;
  flex-grow: 1;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  border-style: none;
  border-radius: 5px;
  margin-bottom: 16px;
  outline: none;
`;

const Header = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  margin: 0 20px;
`;

const Button = styled.button`
  position: absolute;
  bottom: 8px;
  right: 0;
`;

interface IBoardProps {
  toDos?: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      // localStorage save
      localStorage.setItem(
        "boards",
        JSON.stringify({
          ...allBoards,
          [boardId]: [newToDo, ...allBoards[boardId]],
        })
      );
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  const onDelete = (boardId: string) => {
    setToDos((allBoards) => {
      // key 값을 리스트로 추출하고 filter로 제외
      const boardsList = Object.keys(allBoards).filter(
        (board) => board !== boardId
      );
      let boards = {};
      // key값 리스트로 새로운 Object 생성
      boardsList.map((board) => {
        boards = { ...boards, [board]: allBoards[board] };
      });
      // localStorage save
      localStorage.setItem("boards", JSON.stringify({ ...boards }));
      return { ...boards };
    });
  };
  return (
    <Wrapper>
      <Header>
        <Title>{boardId}</Title>
        <Button onClick={() => onDelete(boardId)}>❌</Button>
      </Header>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshop) => (
          <Area
            isDraggingOver={snapshop.isDraggingOver}
            isDraggingFromThis={Boolean(snapshop.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos?.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
