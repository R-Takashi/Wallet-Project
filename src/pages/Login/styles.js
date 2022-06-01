import styled from 'styled-components';

export const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e0f2fe;
`;

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 480px;
  border-radius: 15px;
  background-color: #1684c7;
  box-shadow: 0 10px 15px -3px rgb(2 132 199 / 0.5);

  input {
    margin-top: 15px;
    padding: 12px 40px;
    height: 40px;
    border-radius: 15px;
    box-shadow: 0 10px 15px -3px rgb(75 85 99);
    outline: none;
  }

  button{
    margin-top: 15px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 10px 15px -3px rgb(75 85 99);
    outline: none;
    padding: 12px 40px;

    :disabled{
      opacity: 75%;
      color: rgb(148 163 184);
    }
  }

  img {
    width: 300px;
  }
`;
