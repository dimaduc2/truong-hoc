import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Toast, ToastContainer, Button, Navbar, Container, Nav, Form,} from 'react-bootstrap';
import { BsFillMoonFill, BsFillSunFill} from 'react-icons/bs';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import axios from 'axios';
import Home from './Home.js'
import HocSinh from './HocSinh.js'
import GiaoVien from './GiaoVien.js'
import BaiHoc from './BaiHoc.js'


function Menu() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/HocSinh">HocSinh</Link>
          </li>
          <li>
            <Link to="/GiaoVien">GiaoVien</Link>
          </li>
          <li>
            <Link to="/BaiHoc">BaiHoc</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

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
    <div className="App" style={{height:'100vh', background: mauSang ?'black' :'white', color: mauSang ?'white' :'black'}}>
      {/* Cách 1 */}
      <Navbar variant={mauSang ?'light' :'dark'} bg={mauSang ?'light' :'dark'} style={{color: mauSang ?'blue' :'yellow'}} expand="lg" sticky="top">
      {/* <Navbar variant="dark" bg={mauSang ?'dark' :'light'} style={{color: mauSang ?'yellow' :'blue'}} expand="lg" fixed="top"> */}
      {/* Cách 2 */}
      {/* <Navbar variant="dark" bg={mauSang} expand="lg"> */}
        <Container fluid>
          <Navbar.Brand as={Link} 
          // style={{color: mauSang ?'yellow' :'blue'}} 
          onClick={() => suaChuMenuDuocChon('Home')} to="/">React-Bootstrap</Navbar.Brand>
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

              <Nav.Link as={Link} style={{color: chuMenuDuocChon==='BaiHoc' ?'Red' :'Gray'}} onClick={() => suaChuMenuDuocChon('BaiHoc')} to="/BaiHoc">Lớp học</Nav.Link>
              {/* <Nav.Link href="BaiHoc" onClick={() => suaHienTheoMenu('BaiHoc')}>Lớp học</Nav.Link> */}

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
          <Route path="GiaoVien" element={<GiaoVien />} />
          <Route path="BaiHoc" element={<BaiHoc />} />
          <Route path="About" element={<About />} />
          <Route path="*" element={<KhongTimThay />} />
        </Route>
      </Routes>
      
      
    </div>
  );
}


export default App;