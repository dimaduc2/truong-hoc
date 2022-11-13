import React, { useState } from 'react';
import { Toast, ToastContainer, Button, } from 'react-bootstrap';
function Home({mauSang}) {
  
  const [hopBanDau, suaHopBanDau] = useState('');
  const hienChu = (chuMoi) => {
   // alert(chu)
   suaHopBanDau(chuMoi)
  }
  const [thongBaoDongMo, dongCuaSo] = useState(false);
  const toggleShowA = () => dongCuaSo(!thongBaoDongMo);


  return (
    <div>
      
      {mauSang}
      <br/><br/>

      <p>{hopBanDau}</p>

      <ToastContainer position={'middle-center'}>
        <Toast onClick={() => dongCuaSo(false)} show={thongBaoDongMo}>
          <Toast.Header><b>Hello</b></Toast.Header>
          <Toast.Body><p>Đây là C</p></Toast.Body>
        </Toast>
      </ToastContainer>
      
      <Button style={{background: mauSang ?'red' :'blue'}} onClick={() => hienChu('AB')}>Click A</Button>
      <Button style={{background: mauSang ?'red' :'blue'}} onClick={() => suaHopBanDau('B')}>Click B</Button>
      <Button style={{background: mauSang ?'red' :'blue'}} onClick={toggleShowA}>Click C</Button>
      <Button style={{background: mauSang ?'red' :'blue'}} onClick={() => alert('A')}>X</Button>




    </div>
  );
}

export default Home;