import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Form = styled.form`
  position: absolute;
  top: 40px;
  left: 20px;
  width: 300px;
  display: flex;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  border-style: none;
  border-radius: 5px;
  margin-bottom: 16px;
  outline: none;
`;

export default function AddBoard() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm();
  const onValid = ({ board }: { board?: string }) => {
    setToDos((allBoards) => {
      // 원래 보드에 새로운 빈 보드 추가
      return { ...allBoards, [board + ""]: [] };
    });
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("board", { required: true })}
          type="text"
          placeholder={`Add board`}
        />
      </Form>
    </>
  );
}
