import styled from 'styled-components';

const FormStyle = styled.form`
display: flex;
align-items: center;
justify-content: space-evenly;
height: 100px;
color: white;
background-color: rgb(3 105 161);

  input[type=number] {

    margin-left: 10px;
    padding: 12px 10px;
    width: 100px;
    border-radius: 4px;
    box-shadow: 0 10px 15px -3px rgb(75 85 99);
    outline: none;
    color: black;
    text-align: center;

  }

  input[type=text] {

    margin-left: 10px;
    padding: 12px 10px;
    width: 100px;
    border-radius: 4px;
    box-shadow: 0 10px 15px -3px rgb(75 85 99);
    outline: none;
    color: black;

    :focus {
      width: 250px;
    }
  }

  select {
    margin-left: 10px;
    padding: 12px 10px;
    border-radius: 4px;
    box-shadow: 0 10px 15px -3px rgb(75 85 99);
    outline: none;
    color: black;
  }

  button {
    padding: 0 16px;
    background-color: white;
    width: 150px;
    height: 50px;
    color: black;
    border-radius: 4px;
    box-shadow: 0 10px 15px -3px rgb(75 85 99);
    outline: none;

    :hover {
      background-color: rgb(16 185 129);
      color: white;
      box-shadow: 0 10px 15px -3px white;
    }
  }

  #edit {
    :hover {
      background-color: rgb(252 211 77);
      color: black;
      box-shadow: 0 10px 15px -3px white;
  }}

`;

export default FormStyle;
