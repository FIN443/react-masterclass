import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";

const Wrapper = styled.div`
  position: absolute;
  bottom: 10px;
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 120px;
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
      ? "#8b6262"
      : props.isDraggingFromThis
      ? "#bdc3c7"
      : "#c8d6e5"};
  transition: background-color 0.2s ease-in-out;
  border-radius: 5px;
  flex-grow: 1;
  padding: 20px;
`;

interface IBoardProps {
  toDos?: ITodo[];
  boardId: string;
}

function RemoveBoard({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshop) => (
          <Area
            isDraggingOver={snapshop.isDraggingOver}
            isDraggingFromThis={Boolean(snapshop.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default RemoveBoard;
