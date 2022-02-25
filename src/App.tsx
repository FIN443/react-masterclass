import { useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import AddBoard from "./Components/AddBoard";
import Board from "./Components/Board";
import RemoveBoard from "./Components/RemoveBoard";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    // 보드 순서 옮길 때
    if (source.droppableId === "Boards") {
      setToDos((allBoards) => {
        const boardsList = Object.keys(allBoards);
        const taskObj = boardsList[source.index];
        boardsList.splice(source.index, 1);
        boardsList.splice(destination.index, 0, taskObj);
        let boards = {};
        boardsList.map((board) => {
          boards = { ...boards, [board]: allBoards[board] };
        });
        localStorage.setItem(
          "boards",
          JSON.stringify({
            ...boards,
          })
        );
        return { ...boards };
      });
      return;
    }
    // 같은 보드 안에서 카드 옮길 때
    if (destination?.droppableId === source.droppableId) {
      // same board movement
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        // 1) Delete item on source.index
        boardCopy.splice(source.index, 1);
        // 2) Put back the item on the destination.index
        boardCopy.splice(destination?.index, 0, taskObj);
        // localStorage save
        localStorage.setItem(
          "boards",
          JSON.stringify({
            ...allBoards,
            [source.droppableId]: boardCopy,
          })
        );
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
      return;
    }
    // 휴지통으로 옮길 때
    if (destination.droppableId === "Remove") {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        sourceBoard.splice(source.index, 1);
        // localStorage save
        localStorage.setItem(
          "boards",
          JSON.stringify({
            ...allBoards,
            [source.droppableId]: sourceBoard,
          })
        );
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
        };
      });
      return;
    }
    // 다른 보드로 카드 옮길 때
    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        // localStorage save
        localStorage.setItem(
          "boards",
          JSON.stringify({
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination?.droppableId]: destinationBoard,
          })
        );
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination?.droppableId]: destinationBoard,
        };
      });
      return;
    }
  };
  useEffect(() => {
    // localStorage load
    const loadedToDos = localStorage.getItem("boards");
    if (loadedToDos !== null) {
      const parsedToDos = JSON.parse(loadedToDos);
      setToDos(parsedToDos);
    }
  }, []);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <AddBoard />
        <Droppable droppableId="Boards" direction="horizontal" type="BOARD">
          {(provided, snapshot) => (
            <Boards ref={provided.innerRef} {...provided.droppableProps}>
              {Object.keys(toDos).map((boardId, index) => (
                <Board
                  boardId={boardId}
                  key={boardId}
                  toDos={toDos[boardId]}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </Boards>
          )}
        </Droppable>
        <RemoveBoard boardId={"Remove"} />
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
