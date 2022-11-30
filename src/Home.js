import React, { useState } from 'react';
import { Toast, ToastContainer, Button, } from 'react-bootstrap';
import axios from 'axios';
function Home({mauSang}) {
  
  const [hopBanDau, suaHopBanDau] = useState([]);

  const [thongBaoCuaSo, suaThongBaoCuaSo] = useState('');

  const xoaTatCa = () => {
    axios.delete('http://localhost:5500/xoaTatCa/')
    .then(res => {
      // alert(res.data)
      hienDanhSachNguoi()
      suaCuaSoHienRa(true)
      suaThongBaoCuaSo(res.data)
    })
  }

  const suaTheoId = (suaId) => {
    axios.put('http://localhost:5500/suaTheoId?ID='+suaId)
    .then(res => {
      // alert(res.data)
      hienDanhSachNguoi()
      suaCuaSoHienRa(true)
      suaThongBaoCuaSo(res.data)
    })
  }

  const xoaTheoId = (xoaId) => {
    axios.delete('http://localhost:5500/xoaTheoId?ID='+xoaId)
    .then(res => {
      // alert(res.data)
      hienDanhSachNguoi()
      suaCuaSoHienRa(true)
      suaThongBaoCuaSo(res.data)
    })
  }

  const hienDanhSachNguoi = () => {
    axios.get('http://localhost:5500/Vidu/')
    .then(res => {
      suaHopBanDau(res.data);
    })
  }

  
  const themNguoi = (chuGioiTinh) => {
    axios.post('http://localhost:5500/them?GioiTinh='+chuGioiTinh)
    .then(res => {
      // Cách 1 - Nếu Server làm 2 việc, tự động hỏi Datapas danh sách mới và gửi về
      // suaHopBanDau(res.data);

      // Cách 2 - Nếu Server làm 1 việc
      // alert(res.data)
      hienDanhSachNguoi()
      suaCuaSoHienRa(true)
      suaThongBaoCuaSo('Đã thêm người')
    })
  }



  const [cuaSoHienRa, suaCuaSoHienRa] = useState(false);
  // const toggleShowA = () => suaCuaSoHienRa(!cuaSoHienRa);


  return (
    <div>
      
      {mauSang ?'Female' :'Male'}
      <br/><br/>
      <p>{hopBanDau.map((moiNguoi, index)=>
      <div>
        {moiNguoi.ten + ' ('+moiNguoi.GioiTinh+')'}
        
      <Button style={{background: mauSang ?'red' :'blue'}} onClick={() => xoaTheoId(moiNguoi.id)}>X</Button>
      <Button style={{background: mauSang ?'green' :'black'}} onClick={() => suaTheoId(moiNguoi.id)}>O</Button>
      </div>
      
      )}</p>

      <ToastContainer position={'middle-center'}>
        <Toast onClick={() => suaCuaSoHienRa(false)} show={cuaSoHienRa}>
          <Toast.Header><b>
            {thongBaoCuaSo}
            
            </b></Toast.Header>
        </Toast>
      </ToastContainer>
      
      <Button style={{background: mauSang ?'red' :'blue'}} onClick={() => hienDanhSachNguoi()}>Hiện bảng danh sách</Button>
      <Button style={{background: mauSang ?'red' :'blue'}} onClick={() => themNguoi(mauSang ?'Female' :'Male')}>Thêm thông tin trong bảng danh sách</Button>
      <Button style={{background: mauSang ?'red' :'blue'}} onClick={() => xoaTatCa()}>X</Button>
      {/* <Button style={{background: mauSang ?'red' :'blue'}} onClick={toggleShowA}>Click C</Button> */}
      {/* <Button style={{background: mauSang ?'red' :'blue'}} onClick={() => alert('A')}>X</Button> */}



    </div>
  );
}

export default Home;