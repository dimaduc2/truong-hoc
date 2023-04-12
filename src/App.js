import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Navbar, Container, Nav, Form } from 'react-bootstrap';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import axios from 'axios';
import Home from './Home.js'
import HocSinh from './HocSinh.js'
import GiaoVien from './GiaoVien.js'
import Lop from './Lop.js'
import TietHoc from './TietHoc.js'
import QuanLy from './QuanLy.js'
import PhuHuynh from './PhuHuynh.js'


function About() {
  // axios.get('http://localhost:5500/About/')
  // .then(res => {
  //   // alert(res.data)
  // })
  alert('ABCDEF')
  return (
    <div>
      <h2>Đây là Webside thường học</h2>
    </div>
  );
}

function KhongTimThay() {
  axios.get('http://localhost:5500/KhongTimThay/')
  .then(res => {
    // alert(res.data)
  })
  return (
    <div>
      <h2>Không tìm thấy địa chỉ này!</h2>
      <p>
        <Link to="/">Quay lại từ đầu</Link>
      </p>
    </div>
  );
}


function App() {

  const [mauSang, thayDoiMauSang] = useState(true);
  // Cách 1
  const doiMau = () => thayDoiMauSang(!mauSang);
  // Cách 2
  // const [mauSang, thayDoiMauSang] = useState('danger');
  // const doiMau = () => {
  //   if(mauSang==='danger'){
  //     thayDoiMauSang('success')
  //   }else{
  //     thayDoiMauSang('danger')
  //   }
  // }
  
  const [chuMenuDuocChon, suaChuMenuDuocChon] = useState();

  return (
    <div className="App" style={{height:'300vh', background: mauSang ?'black' :'white', color: mauSang ?'white' :'black'}}>
      {/* Cách 1 */}
      <Navbar variant={mauSang ?'light' :'dark'} bg={mauSang ?'light' :'dark'} style={{color: mauSang ?'blue' :'yellow'}} expand="lg" sticky="top">
      {/* <Navbar variant="dark" bg={mauSang ?'dark' :'light'} style={{color: mauSang ?'yellow' :'blue'}} expand="lg" fixed="top"> */}
      {/* Cách 2 */}
      {/* <Navbar variant="dark" bg={mauSang} expand="lg"> */}
        <Container fluid>
          <Navbar.Brand as={Link} 
          // style={{color: mauSang ?'yellow' :'blue'}} 
          // onClick={() => suaChuMenuDuocChon('Home')} to="/">React-Bootstrap</Navbar.Brand>
          onClick={() => suaChuMenuDuocChon('Home')} to="/">Home</Navbar.Brand>
          {/* <Navbar.Brand href="#home" style={{color: mauSang ?'yellow' :'blue'}} onClick={() => suaHienTheoMenu('Home')}>React-Bootstrap</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav>
              {/* Nếu khi bấm nút hocSinh thì chữ học sinh đổi màu đỏ */}
              {/* chữ học sinh đổi màu đỏ khi hộc doiMauCHuMenu đúng chữ */}
              <Nav.Link as={Link} style={{color: chuMenuDuocChon==='HocSinh' ?'Red' :'Gray'}} onClick={() => suaChuMenuDuocChon('HocSinh')} to="/HocSinh">Học sinh</Nav.Link>
              {/* <Nav.Link href="HocSinh" onClick={() => suaHienTheoMenu('HocSinh')}>Học sinh</Nav.Link> */}

              <Nav.Link as={Link} style={{color: chuMenuDuocChon==='GiaoVien' ?'Red' :'Gray'}} onClick={() => suaChuMenuDuocChon('GiaoVien')} to="/GiaoVien">Giáo viên</Nav.Link>
              {/* <Nav.Link href="GiaoVien" onClick={() => suaHienTheoMenu('GiaoVien')}>Giáo viên</Nav.Link> */}

              <Nav.Link as={Link} style={{color: chuMenuDuocChon==='Lop' ?'Red' :'Gray'}} onClick={() => suaChuMenuDuocChon('Lop')} to="/Lop">Lớp học</Nav.Link>
              {/* <Nav.Link href="Lop" onClick={() => suaHienTheoMenu('Lop')}>Lớp học</Nav.Link> */}

              <Nav.Link as={Link} style={{color: chuMenuDuocChon==='TietHoc' ?'Red' :'Gray'}} onClick={() => suaChuMenuDuocChon('TietHoc')} to="/TietHoc">Tiết học</Nav.Link>
              {/* <Nav.Link href="TietHoc" onClick={() => suaHienTheoMenu('TietHoc')}>Lớp học</Nav.Link> */}
              
              <Nav.Link as={Link} style={{color: chuMenuDuocChon==='QuanLy' ?'Red' :'Gray'}} onClick={() => suaChuMenuDuocChon('QuanLy')} to="/QuanLy">Quản lý</Nav.Link>
              {/* <Nav.Link href="QuanLy" onClick={() => suaHienTheoMenu('QuanLy')}>Lớp học</Nav.Link> */}
              

              <Nav.Link as={Link} style={{color: chuMenuDuocChon==='PhuHuynh' ?'Red' :'Gray'}} onClick={() => suaChuMenuDuocChon('PhuHuynh')} to="/PhuHuynh">Phụ Huynh</Nav.Link>
              {/* <Nav.Link href="PhuHuynh" onClick={() => suaHienTheoMenu('PhuHuynh')}>Lớp học</Nav.Link> */}

              <Nav.Link as={Link} style={{color: chuMenuDuocChon==='About' ?'Red' :'Gray'}} onClick={() => suaChuMenuDuocChon('About')} to="/About">About</Nav.Link>
              {/* <Nav.Link href="About" onClick={() => suaHienTheoMenu('About')}>About</Nav.Link> */}
              
            </Nav>
          </Navbar.Collapse>
          <Form>
            <Form.Check 
              type="switch"
              label={mauSang ?<BsFillMoonFill /> :<BsFillSunFill />}
              // onChange={() => thayDoiMauSang('Tối')}
              onChange={doiMau}
            />
          </Form>
        </Container>
      </Navbar>


      {/* {doiMauCHuMenu==='Home'
        ?<Home></Home>
        :null
      } */}
      {/* <Menu></Menu> */}
      <Routes>
        <Route path="/" >
          <Route index element={<Home mauSang={mauSang} />} />
          <Route path="HocSinh" element={<HocSinh mauSang={mauSang} />} />
          <Route path="GiaoVien" element={<GiaoVien mauSang={mauSang} />} />
          <Route path="Lop" element={<Lop mauSang={mauSang} />} />
          <Route path="TietHoc" element={<TietHoc mauSang={mauSang} />} />
          <Route path="QuanLy" element={<QuanLy mauSang={mauSang} />} />
          <Route path="PhuHuynh" element={<PhuHuynh />} />
          <Route path="About" element={<About />} />
          <Route path="*" element={<KhongTimThay />} />
        </Route>
      </Routes>
      
      
    </div>
  );
}


export default App;