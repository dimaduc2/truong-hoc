import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer, Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
function Home({mauSang}) {
  
  const [cauTraLoiMySQL, suaCauTraLoiMySQL] = useState([]);

  const [thongBaoCuaSo, suaThongBaoCuaSo] = useState('');

  const [cauTraLoiMongo, suaCauTraLoiMongo] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:5500/hien2Vidu/ketNoiLaiDB')
  // }, [])

  const suaHaiDanhSachTheoId = (suaIdMongo, suaIdMySQL, suaGioiTinh, DB) => {
    // suaMongoTheoId(suaIdMongo, suaGioiTinh)
    // suaMySQLTheoId(suaIdMySQL, suaGioiTinh)
    axios.put('http://localhost:5500/hien2Vidu/suaTheoId?suaIdMongo='+suaIdMongo+'&suaIdMySQL='+suaIdMySQL+'&suaGioiTinh='+suaGioiTinh)
    .catch(error => {
      suaCuaSoHienRa(true)
      if (error.response) {
        console.log(error.response.status + ' ' + error.response.data);
        suaThongBaoCuaSo(error.response.status + ' ' + error.response.data)
      } else if (error.request) {
        console.log('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi ' + error.request);
        suaThongBaoCuaSo('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi')
      } else {
        console.log('Lỗi', error.message);
      }
    })
    .then(res => {
      suaCauTraLoiMongo(res.data.DBMongo)
      suaCauTraLoiMySQL(res.data.DBMySQL)
    })
  }
  const suaMongoTheoId = (suaId, suaGioiTinh) => {
    axios.put('http://localhost:5500/Vidu12/suaTheoId/'+suaId+'?suaGioiTinh='+suaGioiTinh)
    .catch(error => {
      suaCuaSoHienRa(true)
      if (error.response) {
        console.log(error.response.status + ' ' + error.response.data);
        suaThongBaoCuaSo(error.response.status + ' ' + error.response.data)
      } else if (error.request) {
        console.log('Không sửa được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi ' + error.request);
        suaThongBaoCuaSo('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi')
      } else {
        // Điều gì đó đã xảy ra trong bước thiết lập request rồi gây nên lỗi
        console.log('Lỗi', error.message);
      }
    })
    .then(res => {
      suaCuaSoHienRa(true)
      suaThongBaoCuaSo('Đã sửa')
      suaCauTraLoiMongo(res.data)
    })
  }
  const suaMySQLTheoId = (suaId, suaGioiTinh) => {
    axios.put('http://localhost:5500/suaTheoId/'+suaId+'?suaGioiTinh='+suaGioiTinh)
    .catch(error => {
      suaCuaSoHienRa(true)
      if (error.response) {
        console.log(error.response.status + ' ' + error.response.data);
        suaThongBaoCuaSo(error.response.status + ' ' + error.response.data)
      } else if (error.request) {
        console.log('Không sửa được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi ' + error.request);
        suaThongBaoCuaSo('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi')
      } else {
        // Điều gì đó đã xảy ra trong bước thiết lập request rồi gây nên lỗi
        console.log('Lỗi', error.message);
      }
    })
    .then(res => {
      // alert(res.data)
      hienDanhSachNguoiMySQL()
      suaCuaSoHienRa(true)
      suaThongBaoCuaSo(res.data)
    })
  }

  const xoaHaiDanhSachTheoId = (xoaIdMongo, xoaIdMySQL) => {
    // xoaMongoTheoId(xoaIdMongo)
    // xoaMySQLTheoId(xoaIdMySQL)
    axios.delete('http://localhost:5500/hien2Vidu/xoaTheoId?xoaIdMongo='+xoaIdMongo+'&xoaIdMySQL='+xoaIdMySQL)
    .catch(error => {
      suaCuaSoHienRa(true)
      if (error.response) {
        console.log(error.response.status + ' ' + error.response.data);
        suaThongBaoCuaSo(error.response.status + ' ' + error.response.data)
      } else if (error.request) {
        console.log('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi ' + error.request);
        suaThongBaoCuaSo('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi')
      } else {
        console.log('Lỗi', error.message);
      }
    })
    .then(res => {
      suaCauTraLoiMongo(res.data.DBMongo)
      suaCauTraLoiMySQL(res.data.DBMySQL)
    })
  }
  const xoaMongoTheoId = (xoaId) => {
    axios.delete('http://localhost:5500/Vidu12/xoaTheoId/'+xoaId)
    .catch(error => {
      suaCuaSoHienRa(true)
      if (error.response) {
        console.log(error.response.status + ' ' + error.response.data);
        suaThongBaoCuaSo(error.response.status + ' ' + error.response.data)
      } else if (error.request) {
        console.log('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi ' + error.request);
        suaThongBaoCuaSo('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi')
      } else {
        console.log('Lỗi', error.message);
      }
    })
    .then(res => {
      suaCuaSoHienRa(true)
      suaThongBaoCuaSo('Đã xóa theo Id')
      suaCauTraLoiMongo(res.data)
    })
  }
  const xoaMySQLTheoId = (xoaId) => {
    axios.delete('http://localhost:5500/xoaTheoId?ID='+xoaId)
    .catch(error => {
      suaCuaSoHienRa(true)
      if (error.response) {
        console.log(error.response.status + ' ' + error.response.data);
        suaThongBaoCuaSo(error.response.status + ' ' + error.response.data)
      } else if (error.request) {
        console.log('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi ' + error.request);
        suaThongBaoCuaSo('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi')
      } else {
        // Điều gì đó đã xảy ra trong bước thiết lập request rồi gây nên lỗi
        console.log('Lỗi', error.message);
      }
    })
    .then(res => {
      // alert(res.data)
      hienDanhSachNguoiMySQL()
      suaCuaSoHienRa(true)
      suaThongBaoCuaSo(res.data)
    })
  }


  const xoaTatCaHaiDanhSach = (xoaGioiTinh) => {
    // xoaTatCaMongo(xoaGioiTinh)
    // xoaTatCaMySQL(xoaGioiTinh)
    axios.delete('http://localhost:5500/hien2Vidu/xoaTatCa?xoaGioiTinh='+xoaGioiTinh)
    .catch(error => {
      suaCuaSoHienRa(true)
      if (error.response) {
        console.log(error.response.status + ' ' + error.response.data);
        suaThongBaoCuaSo(error.response.status + ' ' + error.response.data)
      } else if (error.request) {
        console.log('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi ' + error.request);
        suaThongBaoCuaSo('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi')
      } else {
        console.log('Lỗi', error.message);
      }
    })
    .then(res => {
      suaCauTraLoiMongo(res.data.DBMongo)
      suaCauTraLoiMySQL(res.data.DBMySQL)
    })
  }
  const xoaTatCaMongo = (xoaGioiTinh) => {
    axios.delete('http://localhost:5500/Vidu12/xoaTatCa?xoaGioiTinh='+xoaGioiTinh)
    .catch(error => {
      suaCuaSoHienRa(true)
      if (error.response) {
        console.log(error.response.status + ' ' + error.response.data);
        suaThongBaoCuaSo(error.response.status + ' ' + error.response.data)
      } else if (error.request) {
        console.log('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi ' + error.request);
        suaThongBaoCuaSo('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi')
      } else {
        console.log('Lỗi', error.message);
      }
    })
    .then(res => {
      suaCuaSoHienRa(true)
      suaThongBaoCuaSo('Đã xóa tất cả '+xoaGioiTinh)
      suaCauTraLoiMongo(res.data)
    })
  }
  const xoaTatCaMySQL = (xoaGioiTinh) => {
    axios.delete('http://localhost:5500/xoaTatCa?xoaGioiTinh='+xoaGioiTinh)
    .catch(error => {
      suaCuaSoHienRa(true)
      if (error.response) {
        console.log(error.response.status + ' ' + error.response.data);
        suaThongBaoCuaSo(error.response.status + ' ' + error.response.data)
      } else if (error.request) {
        console.log('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi ' + error.request);
        suaThongBaoCuaSo('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi')
      } else {
        // Điều gì đó đã xảy ra trong bước thiết lập request rồi gây nên lỗi
        console.log('Lỗi', error.message);
      }
    })
    .then(res => {
      // alert(res.data)
      hienDanhSachNguoiMySQL()
      suaCuaSoHienRa(true)
      suaThongBaoCuaSo(res.data)
    })
  }

  const hienHaiDanhSach = () => {
    //hienDanhSachNguoiMongo()
    // hienDanhSachNguoiMySQL()
    axios.get('http://localhost:5500/hien2Vidu')
    .catch(error => {
      suaCuaSoHienRa(true)
      if (error.response) {
        console.log(error.response.status + ' ' + error.response.data);
        suaThongBaoCuaSo(error.response.status + ' ' + error.response.data)
      } else if (error.request) {
        console.log('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi ' + error.request);
        suaThongBaoCuaSo('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi')
      } else {
        console.log('Lỗi', error.message);
      }
    })
    .then(res => {
      if(res.data.DBMongo.length===0){
        alert('Không nhận được câu trả là từ Server do Mongo tắt')
      }else{
        suaCauTraLoiMongo(res.data.DBMongo)
      }
      if(res.data.DBMySQL.length===0){
        alert('Không nhận được câu trả là từ Server do MySQL tắt')
      }else{
        suaCauTraLoiMySQL(res.data.DBMySQL)
      }
    })
  }
  const hienDanhSachNguoiMongo = () => {
    axios.get('http://localhost:5500/Vidu12/')
    .catch(error => {
      suaCuaSoHienRa(true)
      if (error.response) {
        console.log(error.response.status + ' ' + error.response.data);
        suaThongBaoCuaSo(error.response.status + ' ' + error.response.data)
      } else if (error.request) {
        console.log('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi ' + error.request);
        suaThongBaoCuaSo('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi')
      } else {
        console.log('Lỗi', error.message);
      }
    })
    .then(res => {
      // alert(res.data)
      suaCauTraLoiMongo(res.data)
    })
  }
  const hienDanhSachNguoiMySQL = () => {
    axios.get('http://localhost:5500/Vidu/')
    .catch(error => {
      suaCuaSoHienRa(true)
      if (error.response) {
        // Request đã được tạo ra và server đã hồi đáp với một mã trạng thái
        // nằm ra ngoài tầm 2xx
        console.log(error.response.status + ' ' + error.response.data);
        suaThongBaoCuaSo(error.response.status + ' ' + error.response.data)
      } else if (error.request) {
        // Request đã được tạo ra nhưng không nhận được hồi đáp nào
        // Trong trình duyệt, `error.request` là instance của XMLHttpRequest
        // còn trong node.js thì nó là instance của http.ClientRequest
        console.log('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi ' + error.request);
        suaThongBaoCuaSo('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi')
      } else {
        // Điều gì đó đã xảy ra trong bước thiết lập request rồi gây nên lỗi
        console.log('Lỗi', error.message);
      }
    })
    .then(res => {
      suaCauTraLoiMySQL(res.data);
    })
  }

  const themHaiDanhSach = (chuGioiTinh) => {
    // themNguoiMongo(chuGioiTinh)
    // themNguoiMySQL(chuGioiTinh)
    axios.post('http://localhost:5500/hien2Vidu/them?GioiTinh='+chuGioiTinh)
    .catch(error => {
      suaCuaSoHienRa(true)
      if (error.response) {
        console.log(error.response.status + ' ' + error.response.data);
        suaThongBaoCuaSo(error.response.status + ' ' + error.response.data)
      } else if (error.request) {
        console.log('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi ' + error.request);
        suaThongBaoCuaSo('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi')
      } else {
        console.log('Lỗi', error.message);
      }
    })
    .then(res => {
      console.log(res.data);
      suaCauTraLoiMongo(res.data.DBMongo)
      suaCauTraLoiMySQL(res.data.DBMySQL)
    })
  }
  const themNguoiMongo = (chuGioiTinh) => {
    axios.post('http://localhost:5500/Vidu12/them?GioiTinh='+chuGioiTinh)
    .catch(error => {
      suaCuaSoHienRa(true)
      if (error.response) {
        console.log(error.response.status + ' ' + error.response.data);
        suaThongBaoCuaSo(error.response.status + ' ' + error.response.data)
      } else if (error.request) {
        console.log('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi ' + error.request);
        suaThongBaoCuaSo('Không nhận được câu trả là từ Server do Server bị tắt hoặc sai địa chỉ hoặc sai câu hỏi')
      } else {
        console.log('Lỗi', error.message);
      }
    })
    .then(res => {
      suaCuaSoHienRa(true)
      suaThongBaoCuaSo('Đã thêm người')
      suaCauTraLoiMongo(res.data)
    })
  }  
  const themNguoiMySQL = (chuGioiTinh) => {
    axios.post('http://localhost:5500/them?GioiTinh='+chuGioiTinh)
    .then(res => {
      // Cách 1 - Nếu Server làm 2 việc, tự động hỏi Datapas danh sách mới và gửi về
      // suaCauTraLoiMySQL(res.data);

      // Cách 2 - Nếu Server làm 1 việc
      // alert(res.data)
      hienDanhSachNguoiMySQL()
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
      
      <ToastContainer position={'middle-center'}>
        <Toast onClose={() => suaCuaSoHienRa(false)} show={cuaSoHienRa} delay={2000} autohide>
          <Toast.Header><b>
            {thongBaoCuaSo}
          </b></Toast.Header>
        </Toast>
      </ToastContainer>

      <Container>
        <Row>
          <Col>
            <p>{cauTraLoiMySQL.map((moiNguoi, index)=>
            <div>
              {'Tên: '+moiNguoi.ten+ ' (Giới Tính: '+moiNguoi.GioiTinh+')'}
              <Button style={{background: mauSang ?'red' :'blue'}} 
              onClick={() => xoaHaiDanhSachTheoId(cauTraLoiMongo[index]._id, moiNguoi.id)}>X</Button>
              <Button style={{background: mauSang ?'green' :'black'}} 
              onClick={() => suaHaiDanhSachTheoId(cauTraLoiMongo[index]._id, moiNguoi.id, mauSang ?'Female' :'Male', 'mysql')}>O</Button>
            </div>
            )}</p>
          </Col>
          <Col>
          <p>{cauTraLoiMongo.map((moiNguoi, index)=>
          <div>
            {'Tên: '+moiNguoi.ten+' (Giới Tính: '+moiNguoi.GioiTinh+')'}
            <Button style={{background: mauSang ?'red' :'blue'}} 
            onClick={() => xoaHaiDanhSachTheoId(moiNguoi._id, cauTraLoiMySQL[index].id)}>X</Button>
            <Button style={{background: mauSang ?'green' :'black'}} 
            onClick={() => suaHaiDanhSachTheoId(moiNguoi._id, cauTraLoiMySQL[index].id, mauSang ?'Female' :'Male', 'mongo')}>O</Button>
          </div>
          )}</p>
          </Col>
        </Row>
      </Container>
      



      <Button style={{background: mauSang ?'red' :'blue'}} onClick={() => hienHaiDanhSach()}>Hiện bảng danh sách</Button>
      <Button style={{background: mauSang ?'red' :'blue'}} onClick={() => themHaiDanhSach(mauSang ?'Female' :'Male')}>Thêm thông tin trong bảng danh sách</Button>
      <Button style={{background: mauSang ?'red' :'blue'}} onClick={() => xoaTatCaHaiDanhSach(mauSang ?'Female' :'Male')}>X</Button>

      <br/><br/><br/><br/>

      

      {/* <Button style={{background: mauSang ?'red' :'blue'}} onClick={() => alert('A')}>X</Button> */}



    </div>
  );
}

export default Home;