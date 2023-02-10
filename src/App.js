import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import stations from "./db";
import "./App.css";
import Box from '@mui/material/Box';
import useFetch from "./useFetch";
import eczanedb from "./denemedb";
import { Typography } from "@mui/material";


export default function App() {
  const{data,loading,error}=useFetch("http://v2.jokeapi.dev/joke/Any");
  if(loading)return <h1>Yükleniyor</h1>
  if(error) console.log(error);

  return (
    <Box>

      <Typography>{data?.setup}:{data?.delivery}</Typography>

      {//Eğer mapin üzerine bir şey eklemek isterseniz buraya ekleyin alttaki kutu bir örnektir uncomment edip bakabilirsiniz
      }

     { /*<Box>
        Bu bir örnek
    </Box>*/
    
    
    }
    
      
    <MapContainer
      className="hazir-map"    //class adı kendinize göre ayarlayabilirsiniz isterseniz
      center={[37.683664, 38.322966]}    //CENTER BILGINIZ NEREDE İSE ORAYA KOYUNUZ
      zoom={7}                 //ZOOM NE KADAR YAKINDA OLMASINI 
      maxZoom={17}         
          //maxZoomu kendinize göre ayarlayın
    >
      <TileLayer    //Bu kısımda değişikliğe gerek yok
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

        
      />
      

      <MarkerClusterGroup>
        {eczanedb
                  //Bu kısmı değiştirin kendi datanıza göre stations.map kısmını kendi datanıza göre mydata.map gibi
          .map((station) => {
            return (
        <Marker
        key={station.id} //key kısmını da kendi datanıza göre ayarlayın mydaya.id gibi
        position={[station.latitude, station.longitude]}//Kendi pozisyonunuzu ekleyin buraya stationı değiştirin mydata.adress.latitude mydata.adress.longitude gibi
                >

            <Popup>
                    {station.name}
                    <br></br>
                    {station.adress}  
                    <br></br>
                    {station.adressDetails}
                    <br></br>
                    {station.phone}
                    {// BU KISIMA DA POPUP YANI Tıkladıgınızda çıkan kısmı ayarlayabilirsiniz aldığınız idye göre isim soyisim veya adress gösterebilirsiniz size kalmış 
                    }

                    
              </Popup>



        </Marker>
              
            );
          })}
      </MarkerClusterGroup>
    </MapContainer>

    </Box>
  );

 
}
