import styled from 'styled-components';

const HeaderStyle = styled.div`
  display: flex;
  background-color: rgb(2 132 199);
  align-items: center;
  justify-content: space-between;

  img {
    width: 100px;
    margin-left: 15px;
  }

  section {
    display: flex;
    align-items: center;
    margin-right: 15px;
    height: 40px;
  }

  #email {
    margin-right: 30px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 10px 15px -3px rgb(75 85 99);
    padding: 8px;
  }

  div{
    display: flex;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 10px 15px -3px rgb(75 85 99);
    padding: 8px;
  }
`;

export default HeaderStyle;
