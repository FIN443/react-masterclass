import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodo } from "../atoms";

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
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId} type="CARD">
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
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
