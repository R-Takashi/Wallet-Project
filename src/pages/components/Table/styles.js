import styled from 'styled-components';

const TableStyle = styled.div`
  table{
    width: 100%;
    border: 1px solid white;
  }
  thead{
    color: white;
  }

  th{
    text-align: center;
    border: 1px solid white;
    padding: 15px;
  }

  tbody{
    color: white;
  }

  td{
    text-align: center;
    border: 1px solid white;
    padding: 15px;
  }

  button {
    padding: 0 16px;
    border-radius: 4px;
    width: 100px;
    height: 30px;
    margin: 3px;
   
  }
  #edit{
    color: black;
    background-color: rgb(253 230 138);
    box-shadow: 0 10px 15px -3px rgb(75 85 99);
    :hover {
      background-color: rgb(252 211 77);
      box-shadow: 0 10px 15px -3px white;
    }
  }

  #remove{
    color: white;
    background-color: rgb(239 68 68);
    box-shadow: 0 10px 15px -3px rgb(75 85 99);
    :hover {
      background-color: rgb(220 38 38);
      box-shadow: 0 10px 15px -3px white;
    }
  }
`;

export default TableStyle;
