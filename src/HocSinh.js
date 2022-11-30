import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HocSinh({mauSang}) {
  const [hopLoi, suaHopLoi] = useState(null);
  const [coKetQuaChua, suaCoKetQuaChua] = useState(false);
  const [items, setItems] = useState([]);

  const [cauTraLoiServer, suaCauTraLoiServer] = useState('');
  useEffect(() => {
    axios.get('http://localhost:5500/HocSinh/')
    .then(res => {
      // alert(res.data)
      suaCauTraLoiServer(res.data);
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
  return (
    <div>
      {hopLoi
        ?<div>Error: Không kết nối với Server ({hopLoi.message})</div>
        :<div>{cauTraLoiServer}</div>
      }
      {!coKetQuaChua
          ?<div>Loading...</div>
          :null
      }
      {mauSang ?'A':'B'}      
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
  //       {mauSang ?'A':'B'}
  //       {/* Đây là học sinh */}
  //     </div>
  //   );
  // }
}

export default HocSinh;