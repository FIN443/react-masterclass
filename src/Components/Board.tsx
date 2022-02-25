import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div<{ isDragging: boolean }>`
  flex: 0 0 auto;
  width: 300px;
  background-color: ${(props) => props.theme.boardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  transition: background-color 0.2s ease-in-out;
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

const Header = styled.div<{ isDragging: boolean }>`
  padding-top: 10px;
  border-radius: 5px 5px 0 0;
  background-color: ${(props) =>
    props.isDragging ? "#fd965b" : props.theme.boardColor};

  transition: background-color 0.2s ease-in-out;
  position: relative;
  justify-content: space-between;
`;

const Button = styled.button`
  position: absolute;
  top: 6px;
  right: 10px;
`;

interface IBoardProps {
  toDos?: ITodo[];
  boardId: string;
  index: number;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId, index }: IBoardProps) {
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
    <Draggable draggableId={boardId} index={index}>
      {(provided, snapshot) => (
        <Wrapper
          key={index}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          {...provided.draggableProps}
        >
          <Header
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            <Title>{boardId}</Title>
            <Button onClick={() => onDelete(boardId)}>❌</Button>
            <Form onSubmit={handleSubmit(onValid)}>
              <Input
                {...register("toDo", { required: true })}
                type="text"
                placeholder={`Add task on ${boardId}`}
              />
            </Form>
          </Header>
          <Droppable droppableId={boardId} direction="vertical" type="CARD">
            {(provided, snapshot) => (
              <Area
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
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
      )}
    </Draggable>
  );
}

export default React.memo(Board);
