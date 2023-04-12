import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Offcanvas, Accordion } from 'react-bootstrap';

function TietHoc({mauSang}) {
  const [hopLoi, suaHopLoi] = useState(null);
  const [coKetQuaChua, suaCoKetQuaChua] = useState(false);
  const [items, setItems] = useState([]);

  const [cauTraLoiServer, suaCauTraLoiServer] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5500/TietHoc/')
    .then(res => {
      // alert(res.data)
      suaCauTraLoiServer(res.data.danhSachTH);
    })
    .then(
      (result) => {
        suaCoKetQuaChua(true);
        setItems(result);
      },
      (error) => {
        suaCoKetQuaChua(true);
        suaHopLoi(error);
      }
    )
  },[]);

  // const [show123, suaShow] = useState(false);
  const [timTen, suaTimTen] = useState('');
  const timHS = (tenMoiHS) => {
    // suaShow(true);
    alert(tenMoiHS)
    suaTimTen(tenMoiHS)
  };
  // const handleClose = () => {
  //   suaShow(false);
  // }

  return (
    <div>
      {/* <Offcanvas show={show123} 
      onHide={handleClose}
      >
        <Offcanvas.Header closeButton={handleClose}>
          <Offcanvas.Title>{timTen}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {timTen}
        </Offcanvas.Body>
      </Offcanvas> */}
      {hopLoi
        ?<div>Error: Không kết nối với Server ({hopLoi.message})</div>
        :<Table style={{color: mauSang ?'white' :'black'}} striped={mauSang ?false :true} bordered>
          <thead>
            <tr>
              <th>Tiết học</th>
              <th>Giáo viên</th>
              <th>Số học sinh</th>
            </tr>
          </thead>
          <tbody>
            {cauTraLoiServer.map((moiNguoi, index)=>
              <tr>
                <td>{moiNguoi.tenTietHoc}</td>
                <td>{moiNguoi.tengiaovien}</td>
                <td 
                // onClick={() => timHS(moiNguoi.tongSoHS)}
                >
                  <Accordion>
                    <Accordion.Item eventKey={index}>
                      <Accordion.Header>{moiNguoi.tongSoHS}</Accordion.Header>
                      <Accordion.Body>
                        {moiNguoi.tenTatCaHS}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      }
      {!coKetQuaChua
          ?<div>Loading...</div>
          :null
      }  
    </div>
  );

  // if (hopLoi) {
  //   return <div>Error: Không kết nối với Server ({hopLoi.message})</div>;
  // } else if (!coKetQuaChua) {
  //   return <div>Loading...</div>;
  // } else {
  //   return (
  //     <div>
  //       {cauTraLoiServer}
  //       {/* Đây là bài học */}
  //     </div>
  //   );
  // }
}

export default TietHoc;